'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeatherPage() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number; name: string } | null>(null);

  // Fetch user location and weather data on component mount
  useEffect(() => {
    const fetchWeatherData = async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        if (!apiKey) {
          throw new Error('Weather API key is missing');
        }

        // Fetch city name using reverse geocoding
        const geocodingResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
        );
        if (!geocodingResponse.ok) {
          throw new Error('Failed to fetch location name');
        }
        const geocodingData = await geocodingResponse.json();
        const cityName = geocodingData[0]?.name || 'Unknown Location';

        // Fetch current weather
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (!currentWeatherResponse.ok) {
          throw new Error('Failed to fetch current weather');
        }
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch 7-day forecast (using 5-day forecast and aggregating)
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch weather forecast');
        }
        const forecastData = await forecastResponse.json();

        // Map current weather data
        setCurrentWeather({
          temperature: Math.round(currentWeatherData.main.temp),
          humidity: currentWeatherData.main.humidity,
          windSpeed: Math.round(currentWeatherData.wind.speed * 3.6), // Convert m/s to km/h
          rainfall: currentWeatherData.rain?.['1h'] || 0, // Rainfall in last hour (mm)
          conditions: currentWeatherData.weather[0].main,
          soilMoisture: estimateSoilMoisture(currentWeatherData.main.humidity, currentWeatherData.rain?.['1h'] || 0),
        });

        // Aggregate 5-day forecast into daily data (OpenWeatherMap free tier provides 3-hourly data)
        const dailyForecast = aggregateDailyForecast(forecastData.list);
        const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const forecastList = dailyForecast.slice(0, 7).map((item: any, index: number) => ({
          day: days[index],
          temp: Math.round(item.temp),
          condition: item.condition,
          rain: Math.round(item.pop * 100),
          humidity: Math.round(item.humidity),
        }));
        setForecast(forecastList);

        // Set location
        setLocation({ lat, lon, name: cityName });
      } catch (err: any) {
        setError(err.message || 'Failed to load weather data. Please try again later.');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Aggregate 3-hourly forecast data into daily data
    const aggregateDailyForecast = (list: any[]) => {
      const dailyData: { [key: string]: any } = {};
      list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            temp: item.main.temp,
            humidity: item.main.humidity,
            pop: item.pop,
            condition: item.weather[0].main,
            count: 1,
          };
        } else {
          dailyData[date].temp += item.main.temp;
          dailyData[date].humidity += item.main.humidity;
          dailyData[date].pop = Math.max(dailyData[date].pop, item.pop);
          dailyData[date].count += 1;
        }
      });

      return Object.values(dailyData).map((day: any) => ({
        temp: day.temp / day.count,
        humidity: day.humidity / day.count,
        pop: day.pop,
        condition: day.condition,
      }));
    };

    // Get user location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (err) => {
            console.warn('Geolocation error:', err.message);
            setError('Location access denied. Using default location (Bungoma, Kenya).');
            // Fallback to Bungoma, Kenya
            fetchWeatherData(0.5636, 34.5606);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser. Using default location (Bungoma, Kenya).');
        fetchWeatherData(0.5636, 34.5606);
      }
    };

    getUserLocation();
  }, []);

  // Estimate soil moisture (simplified)
  const estimateSoilMoisture = (humidity: number, rainfall: number) => {
    const baseMoisture = Math.min(humidity * 0.8 + rainfall * 5, 100);
    return Math.round(baseMoisture);
  };

  // Generate AI recommendations
  const getRecommendations = () => {
    if (!currentWeather || !forecast) return [];

    const recommendations = [];
    const tomorrow = forecast[1];

    if (currentWeather.soilMoisture > 70) {
      recommendations.push({
        type: 'Irrigation Alert',
        message: 'Soil moisture is adequate. Skip irrigation for 2 days to save water.',
        color: 'green',
      });
    } else if (currentWeather.soilMoisture < 50) {
      recommendations.push({
        type: 'Irrigation Alert',
        message: 'Soil moisture is low. Consider irrigating crops today.',
        color: 'yellow',
      });
    }

    if (tomorrow && tomorrow.rain > 70) {
      recommendations.push({
        type: 'Rain Expected',
        message: `Heavy rain expected ${tomorrow.day.toLowerCase()}. Consider harvesting ready crops early.`,
        color: 'orange',
      });
    }

    const lowWindDay = forecast.find((day) => day.day === 'Wed' && currentWeather.windSpeed < 15);
    if (lowWindDay) {
      recommendations.push({
        type: 'Optimal Spraying',
        message: 'Low wind conditions on Wednesday. Ideal for pesticide application.',
        color: 'blue',
      });
    }

    return recommendations;
  };

  // Generate weather alerts
  const getWeatherAlerts = () => {
    const alerts = [];
    const thunderstormDay = forecast.find((day) => day.condition === 'Thunderstorm');
    if (thunderstormDay) {
      alerts.push({
        type: 'Thunderstorm Warning',
        message: `Severe thunderstorms expected ${thunderstormDay.day.toLowerCase()} evening. Secure loose equipment.`,
        icon: 'ri-thunderstorms-line',
      });
    }

    const hotDay = forecast.find((day) => day.temp > 30);
    if (hotDay) {
      alerts.push({
        type: 'Heat Advisory',
        message: `High temperatures expected ${hotDay.day.toLowerCase()}. Monitor livestock water supply.`,
        icon: 'ri-temp-hot-line',
      });
    }

    return alerts;
  };

  // Map weather conditions to icons
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Clear':
        return 'ri-sun-line';
      case 'Clouds':
        return condition.includes('few') || condition.includes('scattered') ? 'ri-sun-cloudy-line' : 'ri-cloudy-line';
      case 'Rain':
        return 'ri-drizzle-line';
      case 'Thunderstorm':
        return 'ri-thunderstorms-line';
      case 'Snow':
        return 'ri-snowy-line';
      default:
        return 'ri-sun-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-['Pacifico'] text-2xl text-green-600">Mazao+</div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Home
              </Link>
              <Link href="/ai-diagnosis" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                AI Diagnosis
              </Link>
              <Link href="/weather" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Weather Insights
              </Link>
              <Link href="/crop-planning" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Crop Planning
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Community
              </Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                Marketplace
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather Intelligence</h1>
            <p className="text-xl text-gray-600">AI-powered weather insights for optimal farming decisions</p>
            <p className="text-gray-500 mt-2">📍 Current Location: {location ? location.name : 'Detecting...'}</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-loader-4-line animate-spin text-2xl text-blue-600"></i>
              </div>
              <p className="text-gray-600 text-lg">Loading weather data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 p-6 rounded-lg mb-8">
              <p className="text-red-800 text-lg">
                <i className="ri-error-warning-line mr-2"></i>
                {error}
              </p>
            </div>
          )}

          {/* Current Weather */}
          {!loading && !error && currentWeather && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Current Conditions</h2>
                  <p className="text-blue-100" suppressHydrationWarning={true}>
                    Last updated: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold">{currentWeather.temperature}°C</div>
                  <div className="text-xl">{currentWeather.conditions}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <i className="ri-drop-line text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
                  <div className="text-blue-100">Humidity</div>
                </div>
                <div className="text-center">
                  <i className="ri-windy-line text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{currentWeather.windSpeed} km/h</div>
                  <div className="text-blue-100">Wind Speed</div>
                </div>
                <div className="text-center">
                  <i className="ri-rainy-line text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{currentWeather.rainfall} mm</div>
                  <div className="text-blue-100">Rainfall Today</div>
                </div>
                <div className="text-center">
                  <i className="ri-plant-line text-2xl mb-2"></i>
                  <div className="text-2xl font-bold">{currentWeather.soilMoisture}%</div>
                  <div className="text-blue-100">Soil Moisture</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 7-Day Forecast */}
            {!loading && !error && forecast.length > 0 && (
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">7-Day Forecast</h2>
                  <div className="space-y-4">
                    {forecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className={`${getWeatherIcon(day.condition)} text-xl text-blue-600`}></i>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{day.day}</div>
                            <div className="text-sm text-gray-600">{day.condition}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-gray-800">{day.temp}°C</div>
                            <div className="text-gray-500">Temp</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600">{day.rain}%</div>
                            <div className="text-gray-500">Rain</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600">{day.humidity}%</div>
                            <div className="text-gray-500">Humidity</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Recommendations and Alerts */}
            {!loading && !error && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i className="ri-lightbulb-line text-yellow-500 mr-2"></i>
                    AI Recommendations
                  </h3>
                  <div className="space-y-4">
                    {getRecommendations().map((rec, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 border-${rec.color}-500 bg-${rec.color}-50`}
                      >
                        <h4 className={`font-semibold text-${rec.color}-800`}>{rec.type}</h4>
                        <p className={`text-${rec.color}-700 text-sm mt-1`}>{rec.message}</p>
                      </div>
                    ))}
                    {getRecommendations().length === 0 && (
                      <p className="text-gray-600 text-sm">No specific recommendations at this time.</p>
                    )}
                  </div>
                </div>

                {/* Farming Calendar (Static) */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i className="ri-calendar-line text-purple-500 mr-2"></i>
                    This Week's Tasks
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Corn Field Inspection</div>
                        <div className="text-sm text-gray-600">Check for pest damage</div>
                      </div>
                      <span className="text-purple-600 text-sm font-semibold">Today</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Fertilizer Application</div>
                        <div className="text-sm text-gray-600">Nitrogen for wheat</div>
                      </div>
                      <span className="text-yellow-600 text-sm font-semibold">Wed</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">Harvest Monitoring</div>
                        <div className="text-sm text-gray-600">Check soybean maturity</div>
                      </div>
                      <span className="text-green-600 text-sm font-semibold">Fri</span>
                    </div>
                  </div>
                </div>

                {/* Weather Alerts */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i className="ri-error-warning-line text-red-500 mr-2"></i>
                    Weather Alerts
                  </h3>
                  <div className="space-y-3">
                    {getWeatherAlerts().map((alert, index) => (
                      <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex items-center">
                          <i className={`${alert.icon} text-red-500 mr-2`}></i>
                          <span className="font-semibold text-red-800">{alert.type}</span>
                        </div>
                        <p className="text-red-700 text-sm mt-1">{alert.message}</p>
                      </div>
                    ))}
                    {getWeatherAlerts().length === 0 && (
                      <p className="text-gray-600 text-sm">No weather alerts at this time.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Historical Data (Static) */}
          {!loading && !error && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Weather Trends</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <i className="ri-rainy-line text-3xl text-blue-600 mb-2"></i>
                  <div className="text-2xl font-bold text-blue-600">45 mm</div>
                  <div className="text-gray-600">Total Rainfall</div>
                  <div className="text-sm text-gray-500 mt-1">This month</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <i className="ri-temp-hot-line text-3xl text-green-600 mb-2"></i>
                  <div className="text-2xl font-bold text-green-600">25°C</div>
                  <div className="text-gray-600">Avg Temperature</div>
                  <div className="text-sm text-gray-500 mt-1">This month</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <i className="ri-sun-line text-3xl text-yellow-600 mb-2"></i>
                  <div className="text-2xl font-bold text-yellow-600">185 hrs</div>
                  <div className="text-gray-600">Sunshine Hours</div>
                  <div className="text-sm text-gray-500 mt-1">This month</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <i className="ri-drop-line text-3xl text-purple-600 mb-2"></i>
                  <div className="text-2xl font-bold text-purple-600">68%</div>
                  <div className="text-gray-600">Avg Humidity</div>
                  <div className="text-sm text-gray-500 mt-1">This month</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-['Pacifico'] text-2xl text-green-400 mb-4">Mazao+</div>
              <p className="text-gray-400">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/ai-diagnosis" className="hover:text-white cursor-pointer">
                    AI Diagnosis
                  </Link>
                </li>
                <li>
                  <Link href="/weather" className="hover:text-white cursor-pointer">
                    Weather Insights
                  </Link>
                </li>
                <li>
                  <Link href="/crop-planning" className="hover:text-white cursor-pointer">
                    Crop Planning
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white cursor-pointer">
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/community" className="hover:text-white cursor-pointer">
                    Farmer Forum
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Expert Advice
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Knowledge Base
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>judekotiano@gmail.com</li>
                <li>+254 790 594 967</li>
                <li>24/7 Support Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mazao+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
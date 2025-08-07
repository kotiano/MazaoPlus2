'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeatherPage() {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.3,
    conditions: 'Partly Cloudy',
    soilMoisture: 78
  });

  const [forecast, setForecast] = useState([
    { day: 'Today', temp: 24, condition: 'Partly Cloudy', rain: 10, humidity: 65 },
    { day: 'Tomorrow', temp: 22, condition: 'Light Rain', rain: 80, humidity: 72 },
    { day: 'Wed', temp: 26, condition: 'Sunny', rain: 5, humidity: 58 },
    { day: 'Thu', temp: 25, condition: 'Cloudy', rain: 15, humidity: 62 },
    { day: 'Fri', temp: 23, condition: 'Thunderstorm', rain: 90, humidity: 75 },
    { day: 'Sat', temp: 27, condition: 'Sunny', rain: 0, humidity: 55 },
    { day: 'Sun', temp: 28, condition: 'Hot', rain: 0, humidity: 52 }
  ]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
      case 'Hot':
        return 'ri-sun-line';
      case 'Partly Cloudy':
        return 'ri-sun-cloudy-line';
      case 'Cloudy':
        return 'ri-cloudy-line';
      case 'Light Rain':
        return 'ri-drizzle-line';
      case 'Thunderstorm':
        return 'ri-thunderstorms-line';
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
            <div className="font-[\'Pacifico\'] text-2xl text-green-600">Mazao+</div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Home</Link>
              <Link href="/ai-diagnosis" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">AI Diagnosis</Link>
              <Link href="/weather" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Weather Insights</Link>
              <Link href="/crop-planning" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Crop Planning</Link>
              <Link href="/community" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Community</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Marketplace</Link>
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
            <p className="text-gray-500 mt-2">📍 Current Location: Bungoma, Kenya</p>
          </div>

          {/* Current Weather */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Current Conditions</h2>
                <p className="text-blue-100" suppressHydrationWarning={true}>Last updated: {new Date().toLocaleTimeString()}</p>
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 7-Day Forecast */}
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

            {/* AI Recommendations */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <i className="ri-lightbulb-line text-yellow-500 mr-2"></i>
                  AI Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800">Irrigation Alert</h4>
                    <p className="text-green-700 text-sm mt-1">Soil moisture is adequate. Skip irrigation for 2 days to save water.</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800">Rain Expected</h4>
                    <p className="text-orange-700 text-sm mt-1">Heavy rain tomorrow. Consider harvesting ready crops before 2 PM.</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800">Optimal Spraying</h4>
                    <p className="text-blue-700 text-sm mt-1">Low wind conditions on Wednesday. Perfect for pesticide application.</p>
                  </div>
                </div>
              </div>

              {/* Farming Calendar */}
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
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center">
                      <i className="ri-thunderstorms-line text-red-500 mr-2"></i>
                      <span className="font-semibold text-red-800">Thunderstorm Warning</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">Severe thunderstorms expected Friday evening. Secure loose equipment.</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <i className="ri-temp-hot-line text-yellow-500 mr-2"></i>
                      <span className="font-semibold text-yellow-800">Heat Advisory</span>
                    </div>
                    <p className="text-yellow-700 text-sm mt-1">Weekend temperatures may exceed 30°C. Monitor livestock water supply.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Data */}
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
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-[\'Pacifico\'] text-2xl text-green-400 mb-4">Mazao+</div>
              <p className="text-gray-400">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ai-diagnosis" className="hover:text-white cursor-pointer">AI Diagnosis</Link></li>
                <li><Link href="/weather" className="hover:text-white cursor-pointer">Weather Insights</Link></li>
                <li><Link href="/crop-planning" className="hover:text-white cursor-pointer">Crop Planning</Link></li>
                <li><Link href="/marketplace" className="hover:text-white cursor-pointer">Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/community" className="hover:text-white cursor-pointer">Farmer Forum</Link></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Expert Advice</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Success Stories</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">Knowledge Base</a></li>
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
            <p>&copy; 2024 Mazao+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
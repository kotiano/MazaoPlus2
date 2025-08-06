'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CropPlanningPage() {
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [soilType, setSoilType] = useState('loamy');
  const [farmSize, setFarmSize] = useState('50');

  const cropRecommendations = {
    spring: [
      { name: 'Corn', profit: '$850/acre', days: '110-120', risk: 'Low', suitability: 95 },
      { name: 'Soybeans', profit: '$720/acre', days: '95-105', risk: 'Low', suitability: 92 },
      { name: 'Wheat', profit: '$680/acre', days: '90-100', risk: 'Medium', suitability: 88 },
      { name: 'Tomatoes', profit: '$1200/acre', days: '75-85', risk: 'High', suitability: 78 }
    ],
    summer: [
      { name: 'Sweet Corn', profit: '$950/acre', days: '70-80', risk: 'Medium', suitability: 90 },
      { name: 'Beans', profit: '$600/acre', days: '60-70', risk: 'Low', suitability: 85 },
      { name: 'Squash', profit: '$800/acre', days: '50-60', risk: 'Medium', suitability: 82 },
      { name: 'Peppers', profit: '$1100/acre', days: '80-90', risk: 'High', suitability: 75 }
    ],
    fall: [
      { name: 'Winter Wheat', profit: '$620/acre', days: '200-240', risk: 'Low', suitability: 93 },
      { name: 'Cover Crops', profit: '$200/acre', days: '60-90', risk: 'Very Low', suitability: 98 },
      { name: 'Radishes', profit: '$400/acre', days: '30-40', risk: 'Low', suitability: 88 },
      { name: 'Lettuce', profit: '$750/acre', days: '45-55', risk: 'Medium', suitability: 80 }
    ]
  };

  const rotationPlans = [
    {
      name: 'Corn-Soybean Rotation',
      description: 'Classic 2-year rotation maximizing nitrogen fixation',
      years: ['Year 1: Corn', 'Year 2: Soybeans'],
      benefits: ['Improved soil health', 'Natural nitrogen fixation', 'Pest break cycle'],
      profitability: 'High'
    },
    {
      name: 'Corn-Soybean-Wheat',
      description: '3-year rotation with winter wheat cover',
      years: ['Year 1: Corn', 'Year 2: Soybeans', 'Year 3: Winter Wheat'],
      benefits: ['Extended growing season', 'Soil protection', 'Diversified income'],
      profitability: 'Medium-High'
    },
    {
      name: 'Vegetable Intensive',
      description: 'High-value crop rotation for smaller farms',
      years: ['Spring: Tomatoes', 'Summer: Peppers', 'Fall: Lettuce'],
      benefits: ['High profit margins', 'Multiple harvests', 'Fresh market access'],
      profitability: 'Very High'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-2xl text-green-600 cursor-pointer">FarmAI</Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Home</Link>
              <Link href="/ai-diagnosis" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">AI Diagnosis</Link>
              <Link href="/weather" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Weather Insights</Link>
              <Link href="/crop-planning" className="text-green-600 font-semibold cursor-pointer">Crop Planning</Link>
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Crop Planning</h1>
            <p className="text-xl text-gray-600">AI-powered recommendations for optimal crop selection and rotation</p>
          </div>

          {/* Planning Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Farm Parameters</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Planting Season</label>
                <div className="space-y-2">
                  {['spring', 'summer', 'fall'].map((season) => (
                    <label key={season} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="season"
                        value={season}
                        checked={selectedSeason === season}
                        onChange={(e) => setSelectedSeason(e.target.value)}
                        className="mr-3"
                      />
                      <span className="capitalize">{season}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                >
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silty">Silty</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Farm Size (acres)</label>
                <input
                  type="number"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter farm size"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Crop Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="ri-plant-line text-green-600 mr-3"></i>
                Recommended Crops for {selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)}
              </h2>
              
              <div className="space-y-4">
                {cropRecommendations[selectedSeason as keyof typeof cropRecommendations].map((crop, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${crop.suitability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{crop.suitability}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Expected Profit</div>
                        <div className="font-semibold text-green-600">{crop.profit}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Growing Days</div>
                        <div className="font-semibold text-gray-800">{crop.days}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Risk Level</div>
                        <div className={`font-semibold ${
                          crop.risk === 'Low' ? 'text-green-600' :
                          crop.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {crop.risk}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rotation Plans */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="ri-refresh-line text-blue-600 mr-3"></i>
                Crop Rotation Plans
              </h2>
              
              <div className="space-y-6">
                {rotationPlans.map((plan, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        plan.profitability === 'Very High' ? 'bg-green-100 text-green-800' :
                        plan.profitability === 'High' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {plan.profitability}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{plan.description}</p>
                    
                    <div className="mb-3">
                      <div className="font-semibold text-gray-700 mb-1">Rotation Schedule:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.years.map((year, yearIndex) => (
                          <li key={yearIndex}>• {year}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Benefits:</div>
                      <div className="flex flex-wrap gap-2">
                        {plan.benefits.map((benefit, benefitIndex) => (
                          <span key={benefitIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Planting Calendar</h2>
            
            <div className="grid grid-cols-12 gap-4">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <div key={month} className="text-center">
                  <div className="font-semibold text-gray-700 mb-2">{month}</div>
                  <div className="space-y-1">
                    {index >= 2 && index <= 5 && (
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">Corn</div>
                    )}
                    {index >= 3 && index <= 6 && (
                      <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">Soy</div>
                    )}
                    {index >= 8 && index <= 10 && (
                      <div className="bg-yellow-100 text-yellow-800 text-xs p-1 rounded">Wheat</div>
                    )}
                    {(index === 5 || index === 6) && (
                      <div className="bg-red-100 text-red-800 text-xs p-1 rounded">Tomato</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <i className="ri-brain-line mr-3"></i>
              AI Farming Insights
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold mb-2">📈 Yield Optimization</h3>
                <p className="text-purple-100 text-sm">
                  Based on your soil type and climate data, switching to the corn-soybean rotation could increase yields by 15-20%.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold mb-2">💰 Market Trends</h3>
                <p className="text-purple-100 text-sm">
                  Corn prices are projected to rise 8% next season. Consider allocating 60% of acreage to corn for maximum profit.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold mb-2">🌱 Sustainability</h3>
                <p className="text-purple-100 text-sm">
                  Adding cover crops to your rotation will improve soil health and qualify for $25/acre in conservation incentives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
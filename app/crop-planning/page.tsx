'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Sample data with soil type adjustments
const cropRecommendations = {
  spring: [
    {
      name: 'Corn',
      baseProfit: 18500,
      baseDays: '110-120',
      baseRisk: 'Low',
      baseSuitability: 95,
      soilAdjustments: {
        loamy: { suitability: 95, profit: 850 },
        clay: { suitability: 85, profit: 800 },
        sandy: { suitability: 80, profit: 780 },
        silty: { suitability: 90, profit: 820 },
      },
    },
    {
      name: 'Soybeans',
      baseProfit: 17200,
      baseDays: '95-105',
      baseRisk: 'Low',
      baseSuitability: 92,
      soilAdjustments: {
        loamy: { suitability: 92, profit: 720 },
        clay: { suitability: 88, profit: 700 },
        sandy: { suitability: 75, profit: 680 },
        silty: { suitability: 90, profit: 710 },
      },
    },
    {
      name: 'Wheat',
      baseProfit: 16800,
      baseDays: '90-100',
      baseRisk: 'Medium',
      baseSuitability: 88,
      soilAdjustments: {
        loamy: { suitability: 88, profit: 680 },
        clay: { suitability: 90, profit: 690 },
        sandy: { suitability: 70, profit: 650 },
        silty: { suitability: 85, profit: 670 },
      },
    },
    {
      name: 'Tomatoes',
      baseProfit: 12000,
      baseDays: '75-85',
      baseRisk: 'High',
      baseSuitability: 78,
      soilAdjustments: {
        loamy: { suitability: 78, profit: 1200 },
        clay: { suitability: 70, profit: 1100 },
        sandy: { suitability: 65, profit: 1000 },
        silty: { suitability: 75, profit: 1150 },
      },
    },
  ],
  summer: [
    {
      name: 'Sweet Corn',
      baseProfit: 9500,
      baseDays: '70-80',
      baseRisk: 'Medium',
      baseSuitability: 90,
      soilAdjustments: {
        loamy: { suitability: 90, profit: 950 },
        clay: { suitability: 80, profit: 900 },
        sandy: { suitability: 85, profit: 920 },
        silty: { suitability: 88, profit: 930 },
      },
    },
    {
      name: 'Beans',
      baseProfit: 16000,
      baseDays: '60-70',
      baseRisk: 'Low',
      baseSuitability: 85,
      soilAdjustments: {
        loamy: { suitability: 85, profit: 600 },
        clay: { suitability: 82, profit: 580 },
        sandy: { suitability: 78, profit: 570 },
        silty: { suitability: 83, profit: 590 },
      },
    },
    {
      name: 'Squash',
      baseProfit: 8000,
      baseDays: '50-60',
      baseRisk: 'Medium',
      baseSuitability: 82,
      soilAdjustments: {
        loamy: { suitability: 82, profit: 800 },
        clay: { suitability: 75, profit: 760 },
        sandy: { suitability: 80, profit: 780 },
        silty: { suitability: 80, profit: 790 },
      },
    },
    {
      name: 'Peppers',
      baseProfit: 11000,
      baseDays: '80-90',
      baseRisk: 'High',
      baseSuitability: 75,
      soilAdjustments: {
        loamy: { suitability: 75, profit: 1100 },
        clay: { suitability: 70, profit: 1050 },
        sandy: { suitability: 68, profit: 1000 },
        silty: { suitability: 72, profit: 1080 },
      },
    },
  ],
  fall: [
    {
      name: 'Winter Wheat',
      baseProfit: 6200,
      baseDays: '200-240',
      baseRisk: 'Low',
      baseSuitability: 93,
      soilAdjustments: {
        loamy: { suitability: 93, profit: 620 },
        clay: { suitability: 90, profit: 610 },
        sandy: { suitability: 85, profit: 600 },
        silty: { suitability: 92, profit: 615 },
      },
    },
    {
      name: 'Cover Crops',
      baseProfit: 2000,
      baseDays: '60-90',
      baseRisk: 'Very Low',
      baseSuitability: 98,
      soilAdjustments: {
        loamy: { suitability: 98, profit: 200 },
        clay: { suitability: 95, profit: 190 },
        sandy: { suitability: 90, profit: 180 },
        silty: { suitability: 96, profit: 195 },
      },
    },
    {
      name: 'Radishes',
      baseProfit: 4000,
      baseDays: '30-40',
      baseRisk: 'Low',
      baseSuitability: 88,
      soilAdjustments: {
        loamy: { suitability: 88, profit: 400 },
        clay: { suitability: 85, profit: 390 },
        sandy: { suitability: 80, profit: 380 },
        silty: { suitability: 87, profit: 395 },
      },
    },
    {
      name: 'Lettuce',
      baseProfit: 7500,
      baseDays: '45-55',
      baseRisk: 'Medium',
      baseSuitability: 80,
      soilAdjustments: {
        loamy: { suitability: 80, profit: 750 },
        clay: { suitability: 75, profit: 720 },
        sandy: { suitability: 70, profit: 700 },
        silty: { suitability: 78, profit: 740 },
      },
    },
  ],
};

const rotationPlans = [
  {
    name: 'Corn-Soybean Rotation',
    description: 'Classic 2-year rotation maximizing nitrogen fixation',
    years: ['Year 1: Corn', 'Year 2: Soybeans'],
    benefits: ['Improved soil health', 'Natural nitrogen fixation', 'Pest break cycle'],
    profitability: 'High',
  },
  {
    name: 'Corn-Soybean-Wheat',
    description: '3-year rotation with winter wheat cover',
    years: ['Year 1: Corn', 'Year 2: Soybeans', 'Year 3: Winter Wheat'],
    benefits: ['Extended growing season', 'Soil protection', 'Diversified income'],
    profitability: 'Medium-High',
  },
  {
    name: 'Vegetable Intensive',
    description: 'High-value crop rotation for smaller farms',
    years: ['Spring: Tomatoes', 'Summer: Peppers', 'Fall: Lettuce'],
    benefits: ['High profit margins', 'Multiple harvests', 'Fresh market access'],
    profitability: 'Very High',
  },
];

export default function CropPlanningPage() {
  const [selectedSeason, setSelectedSeason] = useState('spring');
  const [soilType, setSoilType] = useState('loamy');
  const [farmSize, setFarmSize] = useState('');
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [customCrop, setCustomCrop] = useState({ name: '', season: 'spring', month: 'Jan' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [calendar, setCalendar] = useState({
    Jan: [], Feb: [], Mar: [], Apr: [], May: [], Jun: [],
    Jul: [], Aug: [], Sep: [], Oct: [], Nov: [], Dec: [],
  });

  // Memoized filtered crops
  const filteredCrops = useMemo(() => {
    return cropRecommendations[selectedSeason].filter((crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedSeason, searchQuery]);

  // Calculate adjusted crop data based on soil type and farm size
  const adjustedCrops = useMemo(() => {
    const size = parseFloat(farmSize) || 0;
    return filteredCrops.map((crop) => {
      const adjustments = crop.soilAdjustments[soilType];
      const totalProfit = size > 0 ? (adjustments.profit * size).toFixed(2) : adjustments.profit;
      return {
        ...crop,
        suitability: adjustments.suitability,
        profit: `ksh ${totalProfit}${size > 0 ? ` (${size} acres)` : '/acre'}`,
      };
    });
  }, [filteredCrops, soilType, farmSize]);

  // Handle form input changes for custom crop
  const handleCustomCropChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomCrop((prev) => ({ ...prev, [name]: value }));
  };

  // Validate farm size
  const validateFarmSize = (value: string) => {
    const num = parseFloat(value);
    if (value && (isNaN(num) || num <= 0)) {
      setFormError('Farm size must be a positive number.');
      return false;
    }
    setFormError('');
    return true;
  };

  // Handle farm size change
  const handleFarmSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFarmSize(value);
    validateFarmSize(value);
  };

  // Handle crop selection
  const handleSelectCrop = (crop: any) => {
    setSelectedCrops((prev) =>
      prev.includes(crop.name)
        ? prev.filter((name) => name !== crop.name)
        : [...prev, crop.name]
    );
  };

  // Handle adding custom crop to calendar
  const handleAddCustomCrop = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!customCrop.name || !customCrop.season || !customCrop.month) {
      setFormError('Please fill in all fields (Crop Name, Season, Month).');
      return;
    }

    setCalendar((prev) => ({
      ...prev,
      [customCrop.month]: [...prev[customCrop.month], customCrop.name],
    }));
    setFormSuccess('Crop added to calendar!');
    setCustomCrop({ name: '', season: 'spring', month: 'Jan' });
    setTimeout(() => {
      setShowAddCropModal(false);
      setFormSuccess('');
    }, 1500);
  };

  // Handle removing crop from calendar
  const handleRemoveCrop = (month: string, crop: string) => {
    setCalendar((prev) => ({
      ...prev,
      [month]: prev[month].filter((c: string) => c !== crop),
    }));
  };

  // Export plan as JSON
  const handleExportPlan = () => {
    const plan = {
      season: selectedSeason,
      soilType,
      farmSize,
      selectedCrops,
      calendar,
    };
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crop-plan.json';
    a.click();
    URL.revokeObjectURL(url);
    setFormSuccess('Crop plan exported successfully!');
    setTimeout(() => setFormSuccess(''), 1500);
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Crop Planning</h1>
            <p className="text-xl text-gray-600">AI-powered recommendations for optimal crop selection and rotation</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Search crops..."
              />
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
            </div>
          </div>

          {/* Planning Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Farm Parameters</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
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
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="silty">Silty</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Farm Size (acres)</label>
                <input
                  type="number"
                  value={farmSize}
                  onChange={handleFarmSizeChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter farm size"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            <button
              onClick={() => setShowAddCropModal(true)}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Add Custom Crop
            </button>
          </div>

          {/* Add Custom Crop Modal */}
          {showAddCropModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Custom Crop</h2>
                {formError && <p className="text-red-500 mb-4">{formError}</p>}
                {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
                <form onSubmit={handleAddCustomCrop} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Crop Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={customCrop.name}
                      onChange={handleCustomCropChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Potatoes"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Season *</label>
                    <select
                      name="season"
                      value={customCrop.season}
                      onChange={handleCustomCropChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="spring">Spring</option>
                      <option value="summer">Summer</option>
                      <option value="fall">Fall</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Planting Month *</label>
                    <select
                      name="month"
                      value={customCrop.month}
                      onChange={handleCustomCropChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                        (month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Crop
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCropModal(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Crop Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="ri-plant-line text-green-600 mr-3"></i>
                Recommended Crops for {selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)}
              </h2>
              {adjustedCrops.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                  <p>No crops found for this search query.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {adjustedCrops.map((crop, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCrops.includes(crop.name)}
                            onChange={() => handleSelectCrop(crop)}
                            className="mr-3"
                          />
                          <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                        </div>
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
                          <div className="font-semibold text-gray-800">{crop.baseDays}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Risk Level</div>
                          <div
                            className={`font-semibold ${
                              crop.baseRisk === 'Low' || crop.baseRisk === 'Very Low'
                                ? 'text-green-600'
                                : crop.baseRisk === 'Medium'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {crop.baseRisk}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          plan.profitability === 'Very High'
                            ? 'bg-green-100 text-green-800'
                            : plan.profitability === 'High'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
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

          {/* Planting Calendar */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Planting Calendar</h2>
              <button
                onClick={handleExportPlan}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Export Plan
              </button>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                (month) => (
                  <div key={month} className="text-center">
                    <div className="font-semibold text-gray-700 mb-2">{month}</div>
                    <div className="space-y-1">
                      {calendar[month].map((crop, index) => (
                        <div
                          key={index}
                          className="bg-green-100 text-green-800 text-xs p-1 rounded flex justify-between items-center"
                        >
                          <span>{crop}</span>
                          <button
                            onClick={() => handleRemoveCrop(month, crop)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
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
                  Based on your {soilType} soil and {farmSize || 'unspecified'} acres, switching to a{' '}
                  {selectedCrops.length > 0
                    ? `${selectedCrops.join(' and ')} rotation`
                    : 'corn-soybean rotation'}{' '}
                  could increase yields by 15-20%.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold mb-2">💰 Market Trends</h3>
                <p className="text-purple-100 text-sm">
                  {selectedCrops.length > 0
                    ? `${selectedCrops[0]} prices`
                    : 'Corn prices'}{' '}
                  are projected to rise 8% next season. Consider allocating{' '}
                  {farmSize ? `${(parseFloat(farmSize) * 0.6).toFixed(1)} acres` : '60% of acreage'} to{' '}
                  {selectedCrops.length > 0 ? selectedCrops[0] : 'corn'} for maximum profit.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold mb-2">🌱 Sustainability</h3>
                <p className="text-purple-100 text-sm">
                  Adding cover crops to your rotation will improve {soilType} soil health and qualify for $25/acre in
                  conservation incentives.
                </p>
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
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Initial listings data
const initialListings = {
  equipment: [
    {
      id: 1,
      title: 'Jembe',
      price: 200,
      location: 'Bungoma, Kenya',
      seller: 'Donalson Lusiki',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=john%20deere%20green%20lawn%20tractor%20mower%20in%20farm%20setting%2C%20agricultural%20equipment%2C%20outdoor%20machinery%2C%20professional%20product%20photography%2C%20rural%20background&width=300&height=200&seq=tractor-1&orientation=landscape',
      condition: 'New',
      description: 'Good Quality Jembe. Perfect for small to medium farms.',
      createdAt: new Date('2025-08-01'),
    },
    {
      id: 2,
      title: 'KnapSackSpayer',
      price: 1200,
      location: 'Bungoma, Kenya',
      seller: 'Donaldson Lusiki',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=red%20case%20ih%20combine%20harvester%20in%20wheat%20field%2C%20large%20agricultural%20machinery%2C%20harvest%20season%2C%20professional%20farm%20equipment%20photography&width=300&height=200&seq=combine-1&orientation=landscape',
      condition: 'New',
      description: 'Low hours, excellent condition. Includes latest precision agriculture technology package.',
      createdAt: new Date('2025-07-20'),
    },
  ],
  seeds: [
    {
      id: 3,
      title: 'Maize Seeds - 2kg Pack',
      price: 450,
      location: 'Bungoma, Kenya',
      seller: 'Donaldson Lusiki',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=organic%20corn%20seeds%20in%20burlap%20sack%2C%20golden%20yellow%20kernels%2C%20agricultural%20seed%20bag%2C%20farm%20supply%20photography%2C%20natural%20background&width=300&height=200&seq=corn-seeds&orientation=landscape',
      condition: 'New',
      description: 'High-yield maize variety. Non-GMO, drought resistant, excellent germination rate.',
      createdAt: new Date('2025-08-05'),
    },
    {
      id: 4,
      title: 'Tomato Seedlings',
      price: 5,
      location: 'Bungoma, Kenya',
      seller: 'Donaldson Lusiki',
      rating: 4.9,
      image: 'https://readdy.ai/api/search-image?query=healthy%20green%20tomato%20seedlings%20in%20nursery%20trays%2C%20young%20tomato%20plants%2C%20greenhouse%2C%20agricultural%20plant%20nursery%20photography&width=300&height=200&seq=tomato-seedlings&orientation=landscape',
      condition: 'New',
      description: '24 premium tomato seedlings. Disease resistant varieties, ready for transplanting.',
      createdAt: new Date('2025-07-25'),
    },
  ],
  fertilizers: [],
  tools: [],
  livestock: [],
  produce: [],
};

// Categories
const initialCategories = [
  { id: 'equipment', name: 'Farm Equipment', icon: 'ri-truck-line', count: initialListings.equipment.length },
  { id: 'seeds', name: 'Seeds & Plants', icon: 'ri-seedling-line', count: initialListings.seeds.length },
  { id: 'fertilizers', name: 'Fertilizers', icon: 'ri-flask-line', count: initialListings.fertilizers.length },
  { id: 'tools', name: 'Hand Tools', icon: 'ri-hammer-line', count: initialListings.tools.length },
  { id: 'livestock', name: 'Livestock', icon: 'ri-horse-line', count: initialListings.livestock.length },
  { id: 'produce', name: 'Fresh Produce', icon: 'ri-apple-line', count: initialListings.produce.length },
];

const featuredDeals = [
  {
    title: '10% Off All Fertilizers',
    description: 'Limited time offer on organic and synthetic fertilizers',
    discount: '10% OFF',
    endDate: 'Dec 31, 2025',
  },
  {
    title: 'Free Delivery on Orders Over ksh 1,000',
    description: 'Get free delivery for qualifying equipment purchases',
    discount: 'FREE SHIPPING',
    endDate: 'Jan 15, 2026',
  },
];

export default function MarketplacePage() {
  const [listings, setListings] = useState(initialListings);
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState('equipment');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [visibleItems, setVisibleItems] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'equipment',
    description: '',
    location: '',
    condition: 'New',
    image: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Memoized filtered and sorted listings
  const filteredListings = useMemo(() => {
    let items = activeCategory === 'all'
      ? Object.values(listings).flat()
      : listings[activeCategory as keyof typeof listings] || [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      );
    }

    items.sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return items.slice(0, visibleItems);
  }, [activeCategory, searchQuery, sortOption, visibleItems, listings]);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Basic validation
    if (!formData.title || !formData.price || !formData.location || !formData.description) {
      setFormError('Please fill in all required fields (Title, Price, Location, Description).');
      return;
    }
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setFormError('Price must be a valid number greater than 0.');
      return;
    }

    // Create new item
    const newItem = {
      id: Date.now(),
      title: formData.title,
      price: Number(formData.price),
      location: formData.location,
      seller: 'Current User',
      rating: 4.5,
      image: formData.image || 'https://via.placeholder.com/300x200',
      condition: formData.condition,
      description: formData.description,
      createdAt: new Date(),
    };

    // Update listings
    setListings((prev) => ({
      ...prev,
      [formData.category]: [...(prev[formData.category as keyof typeof prev] || []), newItem],
    }));

    // Update category counts
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === formData.category
          ? { ...cat, count: cat.count + 1 }
          : cat
      )
    );

    // Reset form and show success
    setFormData({
      title: '',
      price: '',
      category: 'equipment',
      description: '',
      location: '',
      condition: 'New',
      image: '',
    });
    setFormSuccess('Item listed successfully!');
    setTimeout(() => setShowSellForm(false), 1500);
  };

  // Handle Load More
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => prev + 4);
      setIsLoading(false);
    }, 500);
  };

  // Handle Sell Item
  const handleSellItem = () => {
    setShowSellForm(true);
    setFormError('');
    setFormSuccess('');
  };

  // Handle My Listings
  const handleMyListings = () => {
    alert('Redirecting to my listings... (Implement navigation here)');
  };

  // Handle Contact Seller
  const handleContactSeller = (seller: string) => {
    alert(`Contacting ${seller}... (Implement messaging system here)`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-['Pacifico'] text-2xl text-green-600">Mazao+</div>
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
          {/* Title & Search */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Agricultural Marketplace</h1>
            <p className="text-xl text-gray-600 mb-6">Buy and sell farm equipment, seeds, and supplies</p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  placeholder="Search for equipment, seeds, tools..."
                />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Featured Deals */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Deals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredDeals.map((deal, index) => (
                <div key={index} className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-white text-green-600 px-3 py-1 rounded-full font-bold text-lg">
                      {deal.discount}
                    </span>
                    <span className="text-green-100">Ends {deal.endDate}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-green-100">{deal.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sell Item Modal */}
          {showSellForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">List a New Item</h2>
                {formError && <p className="text-red-500 mb-4">{formError}</p>}
                {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Tractor Model X"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Price (KSH) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Describe your item..."
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Bungoma, Kenya"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Condition *</label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Refurbished">Refurbished</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Image URL (Optional)</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      List Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSellForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                      activeCategory === 'all'
                        ? 'bg-green-100 text-green-700 font-semibold'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className="ri-store-line text-xl mr-3"></i>
                      <span>All Categories</span>
                    </div>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {Object.values(listings).flat().length}
                    </span>
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                        activeCategory === category.id
                          ? 'bg-green-100 text-green-700 font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <i className={`${category.icon} text-xl mr-3`}></i>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                  <h4 className="font-bold text-gray-800 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button
                      onClick={handleSellItem}
                      className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
                    >
                      Sell Item
                    </button>
                    <button
                      onClick={handleMyListings}
                      className="w-full border border-green-600 text-green-600 p-3 rounded-lg hover:bg-green-50 transition-colors font-semibold whitespace-nowrap"
                    >
                      My Listings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Listings */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {activeCategory === 'all' ? 'All Categories' : activeCategory.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    {filteredListings.length} items found
                  </span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                  >
                    <option value="newest">Sort by: Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {filteredListings.length === 0 ? (
                <div className="text-center text-gray-600 py-12">
                  <p>No items found for this category or search query.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredListings.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover object-top"
                      />
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{item.title}</h3>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium whitespace-nowrap ml-2">
                            {item.condition}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-green-600">ksh {item.price.toLocaleString()}</div>
                          <div className="text-gray-500 text-sm">{item.location}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                            <div>
                              <div className="font-medium text-gray-800">{item.seller}</div>
                              <div className="flex items-center text-sm text-gray-500">
                                <i className="ri-star-fill text-yellow-500 mr-1"></i>
                                <span>{item.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                              <i className="ri-heart-line text-xl"></i>
                            </button>
                            <button
                              onClick={() => handleContactSeller(item.seller)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
                            >
                              Contact Seller
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              {filteredListings.length < (activeCategory === 'all' ? Object.values(listings).flat().length : listings[activeCategory as keyof typeof listings]?.length) && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className={`bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold whitespace-nowrap ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Loading...' : 'Load More Items'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-green-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Have Something to Sell?</h2>
            <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
              List your farm equipment, tools, or supplies on our marketplace and reach thousands of farmers in your area.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={handleSellItem}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                List Your Item
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-all whitespace-nowrap">
                Learn More
              </button>
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
            <p>&copy; 2025 Mazao+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [newPost, setNewPost] = useState('');

  const discussions = [
    {
      id: 1,
      title: "Dealing with corn borer infestation - need urgent advice",
      author: "Mike Thompson",
      location: "Nebraska",
      time: "2 hours ago",
      replies: 12,
      category: "Pest Control",
      content: "I've noticed significant corn borer damage in my 40-acre field. The AI diagnosis confirmed it, but I need practical advice on treatment options. Has anyone dealt with this successfully?",
      likes: 8
    },
    {
      id: 2,
      title: "Soil pH levels dropping - organic solutions?",
      author: "Sarah Chen",
      location: "California",
      time: "4 hours ago",
      replies: 7,
      category: "Soil Health",
      content: "My soil test shows pH dropping from 6.8 to 6.2 over the past year. Looking for organic methods to raise it back up. Lime applications haven't been as effective as expected.",
      likes: 15
    },
    {
      id: 3,
      title: "Weather forecast accuracy - which service do you trust?",
      author: "Robert Johnson",
      location: "Iowa",
      time: "6 hours ago",
      replies: 23,
      category: "Weather",
      content: "Been comparing different weather services for farming decisions. FarmAI's predictions have been 85% accurate for me. What's your experience with weather forecasting reliability?",
      likes: 31
    }
  ];

  const experts = [
    {
      name: "Dr. Emily Watson",
      title: "Plant Pathologist",
      specialization: "Crop Diseases",
      location: "University of Iowa",
      rating: 4.9,
      responses: 156,
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20female%20agricultural%20scientist%20with%20short%20brown%20hair%2C%20lab%20coat%2C%20friendly%20smile%2C%20academic%20setting%2C%20professional%20portrait%20photography&width=100&height=100&seq=expert-1&orientation=squarish"
    },
    {
      name: "Prof. David Miller",
      title: "Soil Scientist",
      specialization: "Soil Health & Nutrition",
      location: "Iowa State University",
      rating: 4.8,
      responses: 203,
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20male%20soil%20scientist%20with%20gray%20beard%2C%20outdoor%20field%20background%2C%20khaki%20shirt%2C%20confident%20expression%2C%20academic%20portrait&width=100&height=100&seq=expert-2&orientation=squarish"
    },
    {
      name: "Lisa Rodriguez",
      title: "Extension Agent",
      specialization: "Integrated Pest Management",
      location: "Nebraska Extension",
      rating: 4.9,
      responses: 178,
      avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20hispanic%20female%20extension%20agent%20with%20long%20dark%20hair%2C%20field%20jacket%2C%20warm%20smile%2C%20agricultural%20background%2C%20expert%20portrait&width=100&height=100&seq=expert-3&orientation=squarish"
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
              <Link href="/crop-planning" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Crop Planning</Link>
              <Link href="/community" className="text-green-600 font-semibold cursor-pointer">Community</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Marketplace</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Farming Community</h1>
            <p className="text-xl text-gray-600">Connect with fellow farmers, share knowledge, and get expert advice</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">12.5K</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">3.2K</div>
              <div className="text-gray-600">Discussions</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">856</div>
              <div className="text-gray-600">Expert Answers</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-2">94%</div>
              <div className="text-gray-600">Helpful Responses</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('discussions')}
                className={`px-8 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'discussions'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Recent Discussions
              </button>
              <button
                onClick={() => setActiveTab('experts')}
                className={`px-8 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'experts'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Expert Network
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-8 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'create'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Start Discussion
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'discussions' && (
                <div className="space-y-6">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="ri-user-line text-green-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                              {discussion.category}
                            </span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-500 text-sm">{discussion.time}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-green-600 cursor-pointer">
                            {discussion.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{discussion.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="font-medium text-gray-700">
                                {discussion.author} • {discussion.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="flex items-center text-gray-500">
                                <i className="ri-heart-line mr-1"></i>
                                {discussion.likes}
                              </span>
                              <span className="flex items-center text-gray-500">
                                <i className="ri-chat-3-line mr-1"></i>
                                {discussion.replies} replies
                              </span>
                              <button className="text-green-600 hover:text-green-700 font-medium whitespace-nowrap">
                                Join Discussion
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap">
                      Load More Discussions
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'experts' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experts.map((expert, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{expert.name}</h3>
                      <p className="text-green-600 font-semibold mb-2">{expert.title}</p>
                      <p className="text-gray-600 text-sm mb-3">{expert.specialization}</p>
                      <p className="text-gray-500 text-sm mb-4">{expert.location}</p>
                      
                      <div className="flex items-center justify-center space-x-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-500 mr-1"></i>
                          <span className="font-semibold">{expert.rating}</span>
                        </div>
                        <div className="text-gray-500">•</div>
                        <div>{expert.responses} responses</div>
                      </div>
                      
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap">
                        Ask Expert
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'create' && (
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Discussion Title</label>
                      <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="What would you like to discuss?"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Category</label>
                      <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8">
                        <option>Select a category</option>
                        <option>Crop Diseases</option>
                        <option>Pest Control</option>
                        <option>Soil Health</option>
                        <option>Weather</option>
                        <option>Equipment</option>
                        <option>Market Prices</option>
                        <option>General Discussion</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Your Question or Topic</label>
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows={8}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Describe your farming challenge, share your experience, or ask for advice from the community..."
                        maxLength={500}
                      />
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {newPost.length}/500 characters
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex-1 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap">
                        Post to Community
                      </button>
                      <button className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                        Save Draft
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Featured Topics */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending Topics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-fire-line text-red-500 mr-3"></i>
                    <span className="font-medium">Drought Management Strategies</span>
                  </div>
                  <span className="text-green-600 font-bold">156 posts</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-trending-up-line text-blue-500 mr-3"></i>
                    <span className="font-medium">Corn Price Predictions 2024</span>
                  </div>
                  <span className="text-blue-600 font-bold">89 posts</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-plant-line text-yellow-500 mr-3"></i>
                    <span className="font-medium">Cover Crop Success Stories</span>
                  </div>
                  <span className="text-yellow-600 font-bold">73 posts</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-bug-line text-purple-500 mr-3"></i>
                    <span className="font-medium">Integrated Pest Management</span>
                  </div>
                  <span className="text-purple-600 font-bold">64 posts</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Guidelines</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Be Respectful</div>
                    <div className="text-sm">Treat all community members with respect and kindness</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Share Knowledge</div>
                    <div className="text-sm">Help others by sharing your farming experiences and insights</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Stay On Topic</div>
                    <div className="text-sm">Keep discussions relevant to farming and agriculture</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-3 mt-1"></i>
                  <div>
                    <div className="font-semibold text-gray-800">Verify Information</div>
                    <div className="text-sm">Double-check facts before sharing advice or recommendations</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <i className="ri-information-line mr-1"></i>
                  <strong>Remember:</strong> Community advice supplements but doesn't replace professional agricultural consultation for serious issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
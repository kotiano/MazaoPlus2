'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Sample data
const initialDiscussions = [
  {
    id: 1,
    title: 'Dealing with stalk borer infestation - need urgent advice',
    author: 'Henry Sitati',
    location: 'Bungoma',
    time: '9 days ago',
    replies: [],
    category: 'Pest Control',
    content: "I've noticed significant stalk borer damage in my 1-acre field. The AI diagnosis confirmed it, but I need practical advice on treatment options. Has anyone dealt with this successfully?",
    likes: 2,
    createdAt: new Date('2025-08-01T10:00:00Z'),
  },
  {
    id: 2,
    title: 'Soil pH levels dropping - organic solutions?',
    author: 'Donaldson Lusiki',
    location: 'Busia',
    time: '4 days ago',
    replies: [],
    category: 'Soil Health',
    content: "My soil test shows pH dropping from 6.8 to 6.2 over the past year. Looking for organic methods to raise it back up. Lime applications haven't been as effective as expected.",
    likes: 1,
    createdAt: new Date('2025-08-06T14:00:00Z'),
  },
  {
    id: 3,
    title: 'Weather forecast accuracy - which service do you trust?',
    author: 'Ernest Otieno',
    location: 'Maseno',
    time: '6 days ago',
    replies: [],
    category: 'Weather',
    content: "Been comparing different weather services for farming decisions. Mazao+'s predictions have been 85% accurate for me. What's your experience with weather forecasting reliability?",
    likes: 1,
    createdAt: new Date('2025-08-04T09:00:00Z'),
  },
];

const experts = [
  {
    name: 'Kotiano Jude',
    title: 'Data Scientist',
    specialization: 'Crop Diseases and Pests',
    location: 'Nairobi, Kenya',
    rating: 4.9,
    responses: 15,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20female%20agricultural%20scientist%20with%20short%20brown%20hair%2C%20lab%20coat%2C%20friendly%20smile%2C%20academic%20setting%2C%20professional%20portrait%20photography&width=100&height=100&seq=expert-1&orientation=squarish',
  },
  {
    name: 'Urbanus Juma',
    title: 'Soil Scientist',
    specialization: 'Soil Health & Nutrition',
    location: 'Nairobi, Kenya',
    rating: 4.8,
    responses: 20,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20male%20soil%20scientist%20with%20gray%20beard%2C%20outdoor%20field%20background%2C%20khaki%20shirt%2C%20confident%20expression%2C%20academic%20portrait&width=100&height=100&seq=expert-2&orientation=squarish',
  },
  {
    name: 'Festus Mutuku',
    title: 'Extension Agent',
    specialization: 'Integrated Pest Management',
    location: 'Kitui, Kenya',
    rating: 4.9,
    responses: 8,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20hispanic%20female%20extension%20agent%20with%20long%20dark%20hair%2C%20field%20jacket%2C%20warm%20smile%2C%20agricultural%20background%2C%20expert%20portrait&width=100&height=100&seq=expert-3&orientation=squarish',
  },
];

const categories = [
  'Crop Diseases',
  'Pest Control',
  'Soil Health',
  'Weather',
  'Equipment',
  'Market Prices',
  'General Discussion',
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Crop Diseases',
    content: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [visibleDiscussions, setVisibleDiscussions] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertMessage, setExpertMessage] = useState('');

  // Memoized filtered discussions
  const filteredDiscussions = useMemo(() => {
    return discussions
      .filter(
        (discussion) =>
          discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discussion.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, visibleDiscussions);
  }, [discussions, searchQuery, visibleDiscussions]);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle discussion submission
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    // Validation
    if (!formData.title || !formData.content || !formData.category) {
      setFormError('Please fill in all required fields (Title, Category, Content).');
      return;
    }
    if (formData.content.length > 500) {
      setFormError('Content must be 500 characters or less.');
      return;
    }

    // Create new discussion
    const newDiscussion = {
      id: Date.now(),
      title: formData.title,
      author: 'Current User', // Replace with actual user data in a real app
      location: 'Unknown', // Replace with user location
      time: 'Just now',
      replies: [],
      category: formData.category,
      content: formData.content,
      likes: 0,
      createdAt: new Date(),
    };

    setDiscussions([newDiscussion, ...discussions]);
    setFormData({ title: '', category: 'Crop Diseases', content: '' });
    setFormSuccess('Discussion posted successfully!');
    setTimeout(() => {
      setFormSuccess('');
      setActiveTab('discussions');
    }, 1500);
  };

  // Handle liking a discussion
  const handleLike = (id: number) => {
    setDiscussions((prev) =>
      prev.map((discussion) =>
        discussion.id === id ? { ...discussion, likes: discussion.likes + 1 } : discussion
      )
    );
  };

  // Handle adding a reply
  const handleReply = (discussionId: number, replyContent: string) => {
    if (!replyContent.trim()) return;
    setDiscussions((prev) =>
      prev.map((discussion) =>
        discussion.id === discussionId
          ? {
              ...discussion,
              replies: [
                ...discussion.replies,
                {
                  id: Date.now(),
                  author: 'Current User', // Replace with actual user
                  content: replyContent,
                  time: 'Just now',
                },
              ],
            }
          : discussion
      )
    );
  };

  // Handle loading more discussions
  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleDiscussions((prev) => prev + 3);
      setIsLoading(false);
    }, 500);
  };

  // Handle contacting an expert
  const handleContactExpert = (expert: any) => {
    setSelectedExpert(expert);
    setShowExpertModal(true);
    setExpertMessage('');
    setFormError('');
    setFormSuccess('');
  };

  // Handle expert message submission
  const handleExpertMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertMessage.trim()) {
      setFormError('Please enter a message.');
      return;
    }
    // Simulate sending message (replace with actual API call)
    console.log(`Message to ${selectedExpert.name}: ${expertMessage}`);
    setFormSuccess(`Message sent to ${selectedExpert.name}!`);
    setExpertMessage('');
    setTimeout(() => {
      setShowExpertModal(false);
      setFormSuccess('');
    }, 1500);
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
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Farming Community</h1>
            <p className="text-xl text-gray-600">Connect with fellow farmers, share knowledge, and get expert advice</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">90</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{discussions.length}</div>
              <div className="text-gray-600">Discussions</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
              <div className="text-gray-600">Expert Answers</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-2">94%</div>
              <div className="text-gray-600">Helpful Responses</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="Search discussions..."
              />
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
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
                  {filteredDiscussions.length === 0 ? (
                    <div className="text-center text-gray-600 py-12">
                      <p>No discussions found for this search query.</p>
                    </div>
                  ) : (
                    filteredDiscussions.map((discussion) => (
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
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="font-medium text-gray-700">
                                  {discussion.author} • {discussion.location}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  onClick={() => handleLike(discussion.id)}
                                  className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
                                >
                                  <i className="ri-heart-line mr-1"></i>
                                  {discussion.likes}
                                </button>
                                <span className="flex items-center text-gray-500">
                                  <i className="ri-chat-3-line mr-1"></i>
                                  {discussion.replies.length} replies
                                </span>
                                <button
                                  className="text-green-600 hover:text-green-700 font-medium whitespace-nowrap"
                                  onClick={() => document.getElementById(`replies-${discussion.id}`).scrollIntoView({ behavior: 'smooth' })}
                                >
                                  Join Discussion
                                </button>
                              </div>
                            </div>
                            {/* Replies Section */}
                            {discussion.replies.length > 0 && (
                              <div id={`replies-${discussion.id}`} className="mt-4 space-y-4">
                                {discussion.replies.map((reply) => (
                                  <div key={reply.id} className="ml-8 border-l-2 border-gray-200 pl-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <span className="font-medium text-gray-700">{reply.author}</span>
                                      <span className="text-gray-500 text-sm">•</span>
                                      <span className="text-gray-500 text-sm">{reply.time}</span>
                                    </div>
                                    <p className="text-gray-600">{reply.content}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* Reply Input */}
                            <div className="mt-4">
                              <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                                placeholder="Add your reply..."
                                rows={3}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleReply(discussion.id, e.target.value);
                                    e.target.value = '';
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {filteredDiscussions.length < discussions.length && (
                    <div className="text-center mt-8">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap ${
                          isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? 'Loading...' : 'Load More Discussions'}
                      </button>
                    </div>
                  )}
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
                      <button
                        onClick={() => handleContactExpert(expert)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
                      >
                        Ask Expert
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'create' && (
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6">
                    {formError && <p className="text-red-500 mb-4">{formError}</p>}
                    {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
                    <form onSubmit={handleSubmitPost} className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Discussion Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleFormChange}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="What would you like to discuss?"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Category *</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleFormChange}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Your Question or Topic *</label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleFormChange}
                          rows={8}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          placeholder="Describe your farming challenge, share your experience, or ask for advice from the community..."
                          maxLength={500}
                        />
                        <div className="text-right text-sm text-gray-500 mt-1">
                          {formData.content.length}/500 characters
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          type="submit"
                          className="flex-1 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap"
                        >
                          Post to Community
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ title: '', category: 'Crop Diseases', content: '' })}
                          className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                        >
                          Clear
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expert Contact Modal */}
          {showExpertModal && selectedExpert && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact {selectedExpert.name}</h2>
                {formError && <p className="text-red-500 mb-4">{formError}</p>}
                {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
                <form onSubmit={handleExpertMessageSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Your Message *</label>
                    <textarea
                      value={expertMessage}
                      onChange={(e) => setExpertMessage(e.target.value)}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder={`Ask ${selectedExpert.name} about ${selectedExpert.specialization}...`}
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {expertMessage.length}/500 characters
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowExpertModal(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Featured Topics */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending Topics</h2>
              <div className="space-y-4">
                {[
                  { topic: 'Drought Management Strategies', posts: 2, color: 'red', icon: 'ri-fire-line' },
                  { topic: 'Corn Price Predictions 2024', posts: 3, color: 'blue', icon: 'ri-trending-up-line' },
                  { topic: 'Cover Crop Success Stories', posts: 2, color: 'yellow', icon: 'ri-plant-line' },
                  { topic: 'Integrated Pest Management', posts: 5, color: 'purple', icon: 'ri-bug-line' },
                ].map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-${item.color}-50 rounded-lg`}>
                    <div className="flex items-center">
                      <i className={`${item.icon} text-${item.color}-500 mr-3`}></i>
                      <span className="font-medium">{item.topic}</span>
                    </div>
                    <span className={`text-${item.color}-600 font-bold`}>{item.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Guidelines</h2>
              <div className="space-y-4 text-gray-600">
                {[
                  { title: 'Be Respectful', description: 'Treat all community members with respect and kindness' },
                  { title: 'Share Knowledge', description: 'Help others by sharing your farming experiences and insights' },
                  { title: 'Stay On Topic', description: 'Keep discussions relevant to farming and agriculture' },
                  { title: 'Verify Information', description: 'Double-check facts before sharing advice or recommendations' },
                ].map((guideline, index) => (
                  <div key={index} className="flex items-start">
                    <i className="ri-check-line text-green-500 mr-3 mt-1"></i>
                    <div>
                      <div className="font-semibold text-gray-800">{guideline.title}</div>
                      <div className="text-sm">{guideline.description}</div>
                    </div>
                  </div>
                ))}
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
                <Link href="/ai-diagnosis" className="hover:text-white cursor-pointer">
                  AI Diagnosis
                </Link>
                <Link href="/weather" className="hover:text-white cursor-pointer">
                  Weather Insights
                </Link>
                <Link href="/crop-planning" className="hover:text-white cursor-pointer">
                  Crop Planning
                </Link>
                <Link href="/marketplace" className="hover:text-white cursor-pointer">
                  Marketplace
                </Link>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <Link href="/community" className="hover:text-white cursor-pointer">
                  Farmer Forum
                </Link>
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
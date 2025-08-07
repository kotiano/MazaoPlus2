'use client';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect } from 'react';

// Static data for slides (can be moved to a separate file or API)
const slides = [
  {
    image: 'https://readdy.ai/api/search-image?query=vast%20green%20agricultural%20farmland%20with%20golden%20wheat%20fields%20stretching%20to%20horizon%2C%20modern%20farming%20equipment%20in%20distance%2C%20clear%20blue%20sky%20with%20soft%20clouds%2C%20drone%20view%20perspective%2C%20vibrant%20colors%2C%20peaceful%20rural%20landscape%2C%20sustainable%20agriculture%2C%20rich%20soil%2C%20abundant%20harvest%20season&width=1920&height=1080&seq=hero-farm-1&orientation=landscape',
    fallbackImage: '/images/fallback-farm.jpg', // Add a local fallback image in /public
    title: 'Smart Farming with AI',
    subtitle: 'Transform your farming operations with cutting-edge artificial intelligence. Get instant crop diagnosis, weather predictions, and personalized farming recommendations.',
  },
  {
    image: 'https://readdy.ai/api/search-image?query=lush%20green%20corn%20field%20with%20healthy%20crops%20growing%20in%20perfect%20rows%2C%20morning%20sunlight%20streaming%20through%20leaves%2C%20farmer%20inspecting%20plants%2C%20agricultural%20success%2C%20sustainable%20farming%20practices%2C%20fertile%20soil%2C%20abundant%20growth&width=1920&height=1080&seq=hero-farm-2&orientation=landscape',
    fallbackImage: '/images/fallback-farm.jpg',
    title: 'Precision Agriculture Solutions',
    subtitle: 'Monitor crop health, detect diseases early, and optimize yields with our advanced AI-powered farming tools and pest detection technology.',
  },
  {
    image: 'https://readdy.ai/api/search-image?query=modern%20greenhouse%20with%20tomato%20plants%20growing%20in%20controlled%20environment%2C%20advanced%20irrigation%20systems%2C%20agricultural%20technology%2C%20sustainable%20farming%2C%20healthy%20crops%2C%20precision%20agriculture%2C%20innovation%20in%20farming&width=1920&height=1080&seq=hero-farm-3&orientation=landscape',
    fallbackImage: '/images/fallback-farm.jpg',
    title: 'Future of Farming is Here',
    subtitle: 'Join thousands of farmers using AI to increase productivity, reduce losses, and build sustainable agricultural operations for the future.',
  },
];

// Contact info (can be moved to a config file or env variables)
const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'judekotiano@gmail.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+254 790 594 967',
};

function NavLinks({ onClick }) {
  const linkClass = 'text-gray-700 hover:text-green-600 transition-colors cursor-pointer';
  return (
    <>
      <Link href="/" className={linkClass} onClick={onClick}>
        Home
      </Link>
      <Link href="/ai-diagnosis" className={linkClass} onClick={onClick}>
        AI Diagnosis
      </Link>
      <Link href="/weather" className={linkClass} onClick={onClick}>
        Weather Insights
      </Link>
      <Link href="/crop-planning" className={linkClass} onClick={onClick}>
        Crop Planning
      </Link>
      <Link href="/community" className={linkClass} onClick={onClick}>
        Community
      </Link>
      <Link href="/marketplace" className={linkClass} onClick={onClick}>
        Marketplace
      </Link>
    </>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Slideshow interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Increased to 7 seconds
    return () => clearInterval(timer);
  }, [isPaused]);

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Metadata */}
      <Head>
        <title>Mazao+ | AI-Powered Farming Solutions</title>
        <meta
          name="description"
          content="Transform your farming with Mazao+. Use AI for crop diagnosis, weather insights, and smart crop planning to boost yields and sustainability."
        />
        <meta name="keywords" content="farming, agriculture, AI, crop diagnosis, weather insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href={slides[0].image} as="image" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="font-['Pacifico'] text-2xl text-green-600">Mazao+</div>

            {/* Hamburger Icon (Mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <NavLinks />
            </nav>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <nav className="mt-4 flex flex-col space-y-4 lg:hidden">
              <NavLinks onClick={() => setMobileMenuOpen(false)} />
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section - Slideshow */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label={slide.title}
          >
            <div className="relative h-full flex items-center justify-center">
              <Image
                src={slide.image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                quality={75}
                priority={index === 0}
                onError={(e) => {
                  e.target.src = slide.fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 text-center text-white px-6 w-full max-w-4xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{slide.subtitle}</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link
                    href="/ai-diagnosis"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Start AI Diagnosis
                  </Link>
                  <Link
                    href="/weather"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
                  >
                    Check Weather
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-8 right-6 text-white z-20"
          aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40">
            <i className={isPaused ? 'ri-play-line text-xl' : 'ri-pause-line text-xl'}></i>
          </div>
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-green-400 transition-colors z-20 cursor-pointer"
          aria-label="Previous slide"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40">
            <i className="ri-arrow-left-line text-2xl"></i>
          </div>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-green-400 transition-colors z-20 cursor-pointer"
          aria-label="Next slide"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-full hover:bg-black/40">
            <i className="ri-arrow-right-line text-2xl"></i>
          </div>
        </button>
      </section>

      {/* Quick Upload Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick Pest Detection</h2>
              <p className="text-xl text-gray-600">
                Upload your crop photos instantly for AI-powered pest and disease analysis
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Pest Analysis</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-3"></i>
                      AI identifies 200+ pest species
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-3"></i>
                      Get treatment recommendations instantly
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-3"></i>
                      Track pest patterns over time
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line text-green-600 mr-3"></i>
                      Prevention tips and best practices
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    {selectedFile ? (
                      <Image
                        src={selectedFile}
                        alt="Uploaded pest image"
                        width={300}
                        height={160}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-bug-line text-2xl text-green-600"></i>
                      </div>
                    )}
                    <p className="text-gray-600 mb-4">Drop pest photos here or click to upload</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-700 transition-colors inline-block"
                    >
                      Start Pest Detection
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">AI-Powered Farming Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to optimize your farming operations and maximize yields
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-eye-line text-2xl text-green-600"></i>
    </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Crop Disease Detection</h3>
              <p className="text-gray-600 mb-6">
                Upload photos of your crops and get instant AI-powered diagnosis of diseases, pests, and nutrient deficiencies with treatment recommendations.
              </p>
              <Link href="/ai-diagnosis" className="text-green-600 font-semibold hover:text-green-700 cursor-pointer">
                Try Now →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-cloud-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Weather Intelligence</h3>
              <p className="text-gray-600 mb-6">
                Get hyper-local weather forecasts, irrigation recommendations, and climate-based farming insights powered by advanced meteorological AI.
              </p>
              <Link href="/weather" className="text-green-600 font-semibold hover:text-green-700 cursor-pointer">
                View Weather →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-plant-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Crop Planning</h3>
              <p className="text-gray-600 mb-6">
                AI-driven crop rotation suggestions, planting schedules, and yield optimization strategies based on your soil and climate data.
              </p>
              <Link href="/crop-planning" className="text-green-600 font-semibold hover:text-green-700 cursor-pointer">
                Plan Crops →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">1K+</div>
              <div className="text-green-100">Farmers Helped</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Accuracy Rate</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Crops Analyzed</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-green-100">Yield Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How Mazao+ Works</h2>
            <p className="text-xl text-gray-600">Simple steps to revolutionize your farming</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Upload & Analyze</h3>
              <p className="text-gray-600">
                Take photos of your crops, soil, or upload field data. Our AI instantly analyzes the images and data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Get Insights</h3>
              <p className="text-gray-600">
                Receive detailed diagnosis, treatment recommendations, and personalized farming advice within seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Take Action</h3>
              <p className="text-gray-600">
                Implement AI-powered recommendations to improve crop health, optimize yields, and increase profits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Farmers Say</h2>
            <p className="text-xl text-gray-600">Real stories from our farming community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Image
                  src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20middle-aged%20male

%20farmer%20wearing%20plaid%20shirt%2C%20friendly%20smile%2C%20outdoor%20farming%20background%2C%20natural%20lighting%2C%20realistic%20portrait%20photography%2C%20confident%20expression%2C%20weathered%20hands%2C%20agricultural%20setting&width=80&height=80&seq=farmer-1&orientation=squarish"
                  alt="Donaldson Lusiki"
                  width={64}
                  height={64}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Donaldson Lusiki</h4>
                  <p className="text-gray-600">Busia, Kenya</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Mazao+ helped me identify maize stalk borer infestation early. The AI diagnosis was spot-on and saved my entire crop. My yield increased by 10% this season!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Image
                  src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20female%20farmer%20in%20her%2040s%20wearing%20straw%20hat%2C%20warm%20smile%2C%20greenhouse%20background%2C%20natural%20lighting%2C%20realistic%20portrait%20photography%2C%20confident%20expression%2C%20holding%20plant%2C%20agricultural%20expertise&width=80&height=80&seq=farmer-2&orientation=squarish"
                  alt="Henry Simiyu"
                  width={64}
                  height={64}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Henry Simiyu</h4>
                  <p className="text-gray-600">Bungoma, Kenya</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The weather insights feature is incredible. I now know exactly when to irrigate and when to harvest. It's like having a meteorologist on my farm!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Image
                  src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20elderly%20male%20farmer%20wearing%20denim%20overalls%2C%20wise%20expression%2C%20barn%20background%2C%20natural%20lighting%2C%20realistic%20portrait%20photography%2C%20experienced%20look%2C%20gray%20beard%2C%20traditional%20farming&width=80&height=80&seq=farmer-3&orientation=squarish"
                  alt="Aggrey Wafula"
                  width={64}
                  height={64}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Aggrey Wafula</h4>
                  <p className="text-gray-600">Bungoma, Kenya</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Been farming for 10 years, and this AI technology amazes me. The crop planning suggestions helped me diversify and increase profits by 15%."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AI to optimize their operations and increase yields.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/ai-diagnosis"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Start Free Diagnosis
            </Link>
            <Link
              href="/community"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

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
                  <Link href="/ai

-diagnosis" className="hover:text-white cursor-pointer">
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
                <li>{contact.email}</li>
                <li>{contact.phone}</li>
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
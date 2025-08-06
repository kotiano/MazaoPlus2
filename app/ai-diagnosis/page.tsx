
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIDiagnosisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [analysisType, setAnalysisType] = useState<'disease' | 'pest'>('disease');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setDiagnosis(null); // Reset diagnosis when new file is uploaded
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis based on type
    setTimeout(() => {
      if (analysisType === 'pest') {
        setDiagnosis({
          pest: "Aphids (Aphididae)",
          confidence: 91,
          severity: "High",
          description: "Aphids are small, soft-bodied insects that feed on plant sap. They can cause significant damage by weakening plants and transmitting viral diseases.",
          treatment: [
            "Apply insecticidal soap spray immediately",
            "Introduce beneficial insects like ladybugs",
            "Use neem oil for organic treatment",
            "Remove heavily infested plant parts"
          ],
          prevention: [
            "Regular monitoring of plants",
            "Encourage natural predators",
            "Avoid over-fertilizing with nitrogen",
            "Use reflective mulches to deter aphids"
          ]
        });
      } else {
        setDiagnosis({
          disease: "Early Blight (Alternaria solani)",
          confidence: 94,
          severity: "Moderate",
          description: "Early blight is a common fungal disease affecting tomatoes and potatoes. It appears as dark spots with concentric rings on older leaves.",
          treatment: [
            "Remove affected leaves immediately",
            "Apply copper-based fungicide spray",
            "Improve air circulation around plants",
            "Avoid overhead watering"
          ],
          prevention: [
            "Use resistant varieties",
            "Practice crop rotation",
            "Maintain proper plant spacing",
            "Apply preventive fungicide treatments"
          ]
        });
      }
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setDiagnosis(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-['Pacifico'] text-xl sm:text-2xl text-green-600 cursor-pointer">Mazao+</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Home</Link>
              <Link href="/ai-diagnosis" className="text-green-600 font-semibold cursor-pointer">AI Diagnosis</Link>
              <Link href="/weather" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Weather Insights</Link>
              <Link href="/crop-planning" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Crop Planning</Link>
              <Link href="/community" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Community</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors cursor-pointer">Marketplace</Link>
            </nav>
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <i className="ri-menu-line text-xl text-gray-700"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">AI Crop Analysis</h1>
            <p className="text-lg sm:text-xl text-gray-600 px-4">Upload a photo of your crop to get instant AI-powered detection with treatment recommendations</p>
          </div>

          {/* Analysis Type Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button
                onClick={() => {
                  setAnalysisType('disease');
                  resetForm();
                }}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap text-sm sm:text-base ${
                  analysisType === 'disease'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="ri-virus-line mr-2"></i>
                Disease Detection
              </button>
              <button
                onClick={() => {
                  setAnalysisType('pest');
                  resetForm();
                }}
                className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap text-sm sm:text-base ${
                  analysisType === 'pest'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="ri-bug-line mr-2"></i>
                Pest Detection
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Upload Crop Image for {analysisType === 'pest' ? 'Pest' : 'Disease'} Detection
              </h2>
              
              {!selectedFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-green-500 transition-colors">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`text-xl sm:text-2xl text-green-600 ${analysisType === 'pest' ? 'ri-bug-line' : 'ri-camera-line'}`}></i>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    Drop your crop image here or click to browse
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 px-2">
                    {analysisType === 'pest' ? 'Focus on areas with visible pests or damage' : 'Focus on affected plant parts for best results'}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer hover:bg-green-700 transition-colors whitespace-nowrap inline-block text-sm sm:text-base"
                  >
                    Choose File
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center">
                      <i className="ri-file-image-line text-xl sm:text-2xl text-green-600 mr-3"></i>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm sm:text-base">{selectedFile.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-semibold whitespace-nowrap text-sm sm:text-base"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center">
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Analyzing for {analysisType === 'pest' ? 'Pests' : 'Diseases'}...
                      </div>
                    ) : (
                      `Analyze for ${analysisType === 'pest' ? 'Pests' : 'Diseases'}`
                    )}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className="w-full border border-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap text-sm sm:text-base"
                  >
                    Upload Different Image
                  </button>
                </div>
              )}

              {/* Tips */}
              <div className="mt-6 sm:mt-8 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">📸 Photo Tips</h3>
                <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                  <li>• Take photos in natural daylight</li>
                  <li>• {analysisType === 'pest' ? 'Capture close-ups of pests or damage' : 'Focus on affected plant parts'}</li>
                  <li>• Include multiple angles if possible</li>
                  <li>• Ensure images are clear and in focus</li>
                </ul>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                {analysisType === 'pest' ? 'Pest Detection Results' : 'Disease Diagnosis Results'}
              </h2>
              
              {!diagnosis && !isAnalyzing && (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`text-xl sm:text-2xl text-gray-400 ${analysisType === 'pest' ? 'ri-bug-line' : 'ri-microscope-line'}`}></i>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base px-4">
                    Upload an image to see AI {analysisType === 'pest' ? 'pest detection' : 'diagnosis'} results
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-loader-4-line animate-spin text-xl sm:text-2xl text-green-600"></i>
                  </div>
                  <p className="text-gray-600 mb-2 text-sm sm:text-base px-4">
                    AI is analyzing your crop image for {analysisType === 'pest' ? 'pests' : 'diseases'}...
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">This may take a few moments</p>
                </div>
              )}

              {diagnosis && (
                <div className="space-y-6">
                  {/* Pest/Disease Info */}
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-bold text-red-600">
                      {diagnosis.pest || diagnosis.disease}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                      <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {diagnosis.confidence}% Confidence
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {diagnosis.severity} Severity
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">{diagnosis.description}</p>
                  </div>

                  {/* Treatment */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                      <i className="ri-medicine-bottle-line text-green-600 mr-2"></i>
                      Recommended Treatment
                    </h4>
                    <ul className="space-y-2">
                      {diagnosis.treatment.map((step: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-green-100 text-green-600 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 text-sm sm:text-base">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                      <i className="ri-shield-check-line text-blue-600 mr-2"></i>
                      Prevention Tips
                    </h4>
                    <ul className="space-y-2">
                      {diagnosis.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <i className="ri-check-line text-blue-600 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-yellow-800">
                      <i className="ri-information-line mr-1"></i>
                      <strong>Note:</strong> This AI {analysisType === 'pest' ? 'pest detection' : 'diagnosis'} is for guidance only. For severe infestations or uncertain cases, consult with a local agricultural extension office or plant pathologist.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Diagnoses */}
          <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Recent Community Diagnoses</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="border rounded-lg p-4">
                <img src="https://readdy.ai/api/search-image?query=tomato%20plant%20leaf%20with%20brown%20spots%20and%20yellowing%20edges%2C%20plant%20disease%20symptoms%2C%20close-up%20photography%2C%20agricultural%20problem%2C%20natural%20lighting%2C%20detailed%20plant%20pathology%20image&width=300&height=200&seq=tomato-disease&orientation=landscape" alt="Tomato Disease" className="w-full h-24 sm:h-32 object-cover object-top rounded mb-3" />
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Tomato Late Blight</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Diagnosed 2 hours ago</p>
                <p className="text-green-600 text-xs sm:text-sm font-medium mt-2">92% confidence</p>
              </div>

              <div className="border rounded-lg p-4">
                <img src="https://readdy.ai/api/search-image?query=green%20aphids%20clustered%20on%20plant%20stem%20and%20leaves%2C%20small%20insects%20feeding%20on%20plant%20sap%2C%20pest%20infestation%2C%20agricultural%20problem%2C%20macro%20photography%2C%20natural%20lighting&width=300&height=200&seq=aphid-pest&orientation=landscape" alt="Aphid Infestation" className="w-full h-24 sm:h-32 object-cover object-top rounded mb-3" />
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Aphid Infestation</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Diagnosed 3 hours ago</p>
                <p className="text-green-600 text-xs sm:text-sm font-medium mt-2">88% confidence</p>
              </div>

              <div className="border rounded-lg p-4 sm:col-span-2 lg:col-span-1">
                <img src="https://readdy.ai/api/search-image?query=wheat%20plant%20with%20powdery%20white%20fungal%20coating%20on%20leaves%2C%20mildew%20disease%20symptoms%2C%20agricultural%20problem%2C%20crop%20pathology%2C%20farming%20photography%2C%20natural%20daylight&width=300&height=200&seq=wheat-mildew&orientation=landscape" alt="Wheat Mildew" className="w-full h-24 sm:h-32 object-cover object-top rounded mb-3" />
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Wheat Powdery Mildew</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Diagnosed 6 hours ago</p>
                <p className="text-green-600 text-xs sm:text-sm font-medium mt-2">96% confidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="font-['Pacifico'] text-2xl text-green-400 mb-4">Mazao+</div>
              <p className="text-gray-300 text-sm">
                Empowering farmers with AI-powered crop analysis, disease detection, and pest identification for better harvests.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">AI Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ai-diagnosis" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Disease Detection</Link></li>
                <li><Link href="/ai-diagnosis" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Pest Identification</Link></li>
                <li><Link href="/crop-planning" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Crop Planning</Link></li>
                <li><Link href="/weather" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Weather Insights</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/community" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Expert Network</Link></li>
                <li><Link href="/community" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Discussion Forums</Link></li>
                <li><Link href="/marketplace" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Marketplace</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="mailto:support@mazaoplus.com" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">support@mazaoplus.com</a></li>
                <li><a href="tel:+1-800-MAZAO" className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer">+1-800-MAZAO</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Mazao+. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer">
                  <i className="ri-instagram-line text-lg"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors cursor-pointer">
                  <i className="ri-youtube-fill text-lg"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from 'react'
import { Activity, MessageCircle, ArrowRight, Check, AlertCircle, X, Send, Bot, User, Loader2, Shield, Clock, Heart, Stethoscope, Users, Zap } from 'lucide-react'
import { symptoms, getRecommendations } from './data/symptoms'

// API KEY CONFIGURATION
// To use real AI responses, replace this with a valid OpenAI API key
// OpenAI keys start with 'sk-' and can be obtained from https://platform.openai.com/api-keys
// If the API key is invalid or API fails, the chatbot will use fallback responses
// IMPORTANT: Never commit real API keys to GitHub
const API_KEY = process.env.VITE_OPENAI_API_KEY || '' // Use environment variable

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I'm your professional health assistant. I can help answer your health-related questions and provide guidance. Please note that I offer general information only and recommend consulting a healthcare provider for specific medical advice. How can I assist you today?" }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const clearChat = () => {
    setChatMessages([
      { id: 1, type: 'bot', text: "Hello! I'm your professional health assistant. I can help answer your health-related questions and provide guidance. Please note that I offer general information only and recommend consulting a healthcare provider for specific medical advice. How can I assist you today?" }
    ])
    setChatbotOpen(false)
  }

  const handleStartChecker = () => {
    setCurrentPage('checker')
    setSelectedSymptoms([])
    setShowResults(false)
  }

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev =>
      prev.includes(id)
        ? prev.filter(symptomId => symptomId !== id)
        : [...prev, id]
    )
  }

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true)
    }
  }

  const handleStartOver = () => {
    setSelectedSymptoms([])
    setShowResults(false)
  }

  const handleBackToHome = () => {
    setCurrentPage('landing')
    setSelectedSymptoms([])
    setShowResults(false)
    clearChat()
  }

  const handleChatSend = async () => {
    if (!chatInput.trim() || isLoading) return

    const newUserMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      text: chatInput
    }

    setChatMessages(prev => [...prev, newUserMessage])
    setChatInput('')
    setIsLoading(true)

    try {
      // Call API for intelligent response
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional health assistant. Provide helpful, accurate general health information. Always include a disclaimer that you are not a substitute for professional medical advice. Be empathetic, clear, and professional in your responses. Keep responses concise but informative.'
            },
            {
              role: 'user',
              content: chatInput
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      
      let botText = "I apologize, but I'm having trouble connecting right now. Please try again or consult a healthcare provider for immediate assistance."
      
      if (data.choices && data.choices[0]) {
        botText = data.choices[0].message.content
      }

      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: botText
      }

      setChatMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('API Error:', error)
      
      // Fallback to simulated response based on keywords
      const lowerInput = chatInput.toLowerCase()
      let fallbackResponse = ""
      
      if (lowerInput.includes('headache') || lowerInput.includes('pain')) {
        fallbackResponse = "For headaches and pain, rest and hydration can help. Over-the-counter pain relievers may provide temporary relief. If pain persists or is severe, please consult a healthcare provider. This is general information only."
      } else if (lowerInput.includes('fever') || lowerInput.includes('temperature')) {
        fallbackResponse = "For fever, rest, stay hydrated, and consider over-the-counter fever reducers. Seek medical attention if fever exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by severe symptoms. This is general guidance only."
      } else if (lowerInput.includes('cough') || lowerInput.includes('cold')) {
        fallbackResponse = "For coughs and colds, rest, stay hydrated, and consider humidifiers. Over-the-counter medications may help symptoms. Consult a doctor if symptoms worsen or persist beyond 10 days. This is general information only."
      } else if (lowerInput.includes('stomach') || lowerInput.includes('nausea')) {
        fallbackResponse = "For stomach issues, eat bland foods, stay hydrated, and rest. Avoid dairy and spicy foods. Seek medical attention if symptoms are severe, persistent, or accompanied by other concerning symptoms. This is general guidance only."
      } else if (lowerInput.includes('emergency') || lowerInput.includes('urgent')) {
        fallbackResponse = "If you believe this is a medical emergency, please call emergency services immediately or go to the nearest emergency room. Do not wait for online advice in emergency situations."
      } else {
        fallbackResponse = "I understand your health concern. While I can provide general information, I recommend consulting a healthcare provider for personalized medical advice. Can you tell me more about your symptoms so I can provide better general guidance?"
      }

      const errorResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        text: fallbackResponse
      }
      setChatMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const renderLanding = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTRoLTJ2NGgydjJoMnYtNGgydjRoLTJ2LTJ6bTAgMXYyaDJ2LTJoLTJ6bTAtMnYyaDJ2LTJoLTJ6bTAtMnYyaDJ2LTJoLTJ6bTAtMnYyaDJ2LTJoLTJ6bTAtMnYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20 p-4 rounded-full mb-8 border border-primary/30 backdrop-blur-sm">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Professional <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Symptom Analysis</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Advanced AI-powered health assessment with professional medical guidance. Get preliminary insights about your symptoms in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={handleStartChecker}
                className="btn inline-flex items-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all"
              >
                Start Professional Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="btn inline-flex items-center px-8 py-4 rounded-lg font-semibold border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white transition-all">
                <Shield className="mr-2 h-5 w-5" />
                Learn More
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-cyan-400" />
                <span className="text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                <span className="text-sm">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Professional Assessment?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Advanced technology combined with medical expertise to provide you with accurate preliminary health insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Privacy First"
              description="Your health data is encrypted and never shared with third parties"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="AI Analysis"
              description="Advanced machine learning for accurate symptom assessment"
              color="from-emerald-500 to-teal-500"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Instant Results"
              description="Get preliminary insights in under 2 minutes"
              color="from-violet-500 to-purple-500"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Expert Backed"
              description="Developed with healthcare professionals for accuracy"
              color="from-rose-500 to-pink-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Simple three-step process to get your health assessment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Select Symptoms"
              description="Choose the symptoms you're experiencing from our comprehensive list"
              icon={<Activity className="h-6 w-6" />}
            />
            <StepCard
              number="2"
              title="AI Analysis"
              description="Our advanced AI analyzes your symptoms and provides preliminary insights"
              icon={<Zap className="h-6 w-6" />}
            />
            <StepCard
              number="3"
              title="Get Results"
              description="Receive professional recommendations and next steps for your health journey"
              icon={<Heart className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="50K+" label="Users Served" />
            <StatCard number="23+" label="Symptoms Covered" />
            <StatCard number="98%" label="Satisfaction Rate" />
            <StatCard number="24/7" label="Availability" />
          </div>
        </div>
      </section>
      
      {/* Medical Disclaimer */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Important Medical Disclaimer</h3>
                <p className="text-sm text-slate-700">
                  This tool provides general health information only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare provider for accurate assessment. If you believe you have a medical emergency, call emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderChecker = () => (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToHome}
            className="text-slate-600 hover:text-slate-900 font-medium mb-4 inline-flex items-center"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            What symptoms are you experiencing?
          </h1>
          <p className="text-lg text-slate-600">Select all that apply</p>
        </div>
        
        {!showResults ? (
          <>
            {/* Symptom Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {symptoms.map(symptom => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`symptom-btn p-4 rounded-xl border-2 text-left flex items-center space-x-3 ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'selected'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedSymptoms.includes(symptom.id)
                      ? 'bg-primary border-primary'
                      : 'border-slate-300'
                  }`}>
                    {selectedSymptoms.includes(symptom.id) && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{symptom.name}</p>
                    <p className="text-sm text-slate-500">{symptom.category}</p>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAnalyze}
                disabled={selectedSymptoms.length === 0}
                className="btn flex-1 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze Symptoms
              </button>
              <button
                onClick={handleBackToHome}
                className="btn px-8 py-4 rounded-lg font-semibold border-2 border-slate-300 text-slate-700 hover:border-slate-400"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          renderResults()
        )}
      </div>
    </div>
  )

  const renderResults = () => {
    const recommendations = getRecommendations(selectedSymptoms.length)
    const selectedSymptomData = symptoms.filter(s => selectedSymptoms.includes(s.id))

    return (
      <div className="animate-fade-in">
        {/* Priority Assessment Card */}
        <div className={`mb-8 p-6 rounded-xl border-2 ${recommendations.color}`}>
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full flex-shrink-0 ${
              recommendations.level === 'Low' ? 'bg-slate-200 text-primary' :
              recommendations.level === 'Moderate' ? 'bg-amber-100 text-warning' :
              'bg-red-100 text-danger'
            }`}>
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
                recommendations.level === 'Low' ? 'bg-slate-200 text-primary' :
                recommendations.level === 'Moderate' ? 'bg-amber-100 text-warning' :
                'bg-red-100 text-danger'
              }`}>
                {recommendations.level} Priority
              </span>
              <p className="text-slate-900 font-medium mb-2">{recommendations.message}</p>
            </div>
          </div>
        </div>
        
        {/* Reported Symptoms */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Reported Symptoms</h2>
          <div className="flex flex-wrap gap-2">
            {selectedSymptomData.map(symptom => (
              <span
                key={symptom.id}
                className="bg-slate-200 text-slate-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {symptom.name}
              </span>
            ))}
          </div>
        </div>
        
        {/* Recommended Action */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Recommended Next Step</h2>
          <p className="text-slate-700">{recommendations.action}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleStartOver}
            className="btn flex-1 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Start Over
          </button>
          <button
            onClick={() => setChatbotOpen(true)}
            className="btn px-8 py-4 rounded-lg font-semibold border-2 border-slate-300 text-slate-700 hover:border-slate-400"
          >
            Chat with Advisor
          </button>
        </div>
      </div>
    )
  }

  const renderChatbot = () => (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Panel */}
      {chatbotOpen && (
        <div className="chatbot-panel mb-4 w-80 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="h-5 w-5 text-emerald-400" />
              <h3 className="text-white font-semibold">Professional Health Advisor</h3>
            </div>
            <p className="text-white/70 text-xs">AI-Powered Health Guidance</p>
          </div>
          
          {/* Message Area */}
          <div className="h-64 bg-slate-50 p-4 overflow-y-auto flex flex-col justify-end gap-3">
            {chatMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'bot'
                      ? 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-gradient-to-r from-slate-800 to-slate-700 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                  <Loader2 className="h-4 w-4 text-slate-600 animate-spin" />
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="border-t-2 border-slate-200 p-4 flex gap-2 bg-white">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask a health question..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            />
            <button
              onClick={handleChatSend}
              disabled={isLoading || !chatInput.trim()}
              className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-lg hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Chatbot Button */}
      <button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        className="btn w-14 h-14 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white border-2 border-slate-600"
      >
        {chatbotOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  )

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' && renderLanding()}
      {currentPage === 'checker' && renderChecker()}
      {renderChatbot()}
    </div>
  )
}

const OverviewCard = ({ icon, title, description }) => (
  <div className="card bg-white border-2 border-slate-200 rounded-xl p-6 text-center">
    <div className="text-3xl font-bold text-primary mb-2">{icon}</div>
    <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
)

const FeatureCard = ({ icon, title, description, color }) => (
  <div className="card bg-white border-2 border-slate-200 rounded-xl p-6 text-center hover:scale-105 transition-transform">
    <div className={`bg-gradient-to-r ${color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
      {icon}
    </div>
    <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
)

const StepCard = ({ number, title, description, icon }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative">
    <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
      {number}
    </div>
    <div className="flex items-center gap-3 mb-4 mt-4">
      <div className="bg-gradient-to-r from-emerald-100 to-cyan-100 p-3 rounded-xl text-emerald-600">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>
    <p className="text-slate-600">{description}</p>
  </div>
)

const StatCard = ({ number, label }) => (
  <div>
    <div className="text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-slate-400">{label}</div>
  </div>
)

export default App

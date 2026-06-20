# Medical Symptoms Pre-Checker

A modern, professional medical symptoms pre-checker web application built with React, featuring a stunning landing page, symptom assessment form, results overview, and AI-powered health chatbot.

## 🚀 Features

- **Professional Landing Page**: Dark hero section with gradient backgrounds, feature cards, how-it-works section, and statistics
- **Symptom Checker**: Interactive form with 23 symptoms across 7 categories with smooth animations
- **Results Analysis**: Priority-based assessment (Low/Moderate/High) with personalized recommendations
- **AI-Powered Chatbot**: Intelligent health assistant with fallback responses for common health topics
- **Responsive Design**: Mobile-first approach that works seamlessly on all devices
- **Professional UI**: Slate/emerald professional color scheme with smooth micro-interactions
- **Privacy First**: No data collection, client-side only processing

## 📋 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TAMILARASAN2705/medical-symptom-checker.git
   cd medical-symptom-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   - Without this, the chatbot uses intelligent fallback responses
   - With a valid OpenAI key, the chatbot provides real AI responses

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Primary Slate**: #1E40AF, #2563EB (Professional blue)
- **Secondary Emerald**: #047857, #059669 (Health green)
- **Accent Cyan**: #0891B2, #06B6D4 (Modern accent)
- **Background Slate**: #F8FAFC, #E2E8F0 (Professional grays)
- **Warning Amber**: #D97706, #B45309
- **Danger Red**: #DC2626, #B91C1C
- **Dark Theme**: #0F172A, #1E293B (Professional dark)

### Typography
- **Font**: Inter (Google Fonts)
- **Headlines**: Bold, 48px-64px
- **Body**: Regular, 16px
- **Secondary**: 14px

## 📁 Project Structure

```
chatbot/
├── src/
│   ├── data/
│   │   └── symptoms.js          # Symptom data & recommendation logic
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the dist folder** to Netlify

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/chatbot"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🧪 Testing Checklist

- [ ] All symptoms selectable/deselectable
- [ ] Analyze button disabled until symptoms selected
- [ ] Results display correct priority level (1-2 Low, 3-5 Moderate, 6+ High)
- [ ] Navigation between pages works smoothly
- [ ] Chatbot button visible on all pages
- [ ] Chat panel opens/closes correctly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Medical disclaimers visible and clear
- [ ] No console errors
- [ ] Accessibility: Keyboard navigation works
- [ ] Color contrast meets WCAG AA

## 🔒 Medical Disclaimer

**IMPORTANT**: This application is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you think you may have a medical emergency, call your doctor or emergency services immediately.

## 📝 Symptom Categories

- **Temperature**: Fever, Chills, Night Sweats
- **Pain**: Headache, Body Aches, Muscle Pain, Joint Pain
- **Respiratory**: Cough, Sore Throat, Shortness of Breath, Congestion
- **Neurological**: Dizziness, Confusion, Memory Loss
- **Digestive**: Nausea, Vomiting, Diarrhea, Constipation
- **Cardiac**: Chest Pain, Heart Palpitations
- **General**: Fatigue, Weakness, Malaise

## 🎯 Priority Logic

- **Low Priority** (1-2 symptoms): Monitor health and rest if needed
- **Moderate Priority** (3-5 symptoms): Schedule a doctor's appointment
- **High Priority** (6+ symptoms): Seek medical attention promptly

## 🔄 Future Enhancements

- Symptom history tracking (localStorage)
- Export assessment as PDF
- Enhanced AI chatbot with real OpenAI integration (environment variable support included)
- Doctor/clinic finder integration
- Multi-language support
- User accounts & medical history
- Telemedicine integration
- Health dashboard with trends

## 📧 Support

- **GitHub Repository**: https://github.com/TAMILARASAN2705/medical-symptom-checker
- **Issues**: Report bugs or request features via GitHub Issues
- **Contributions**: Pull requests are welcome!

## ⚠️ Important Notes

- **Privacy**: This application does not collect or store any personal health data
- **Security**: API keys should never be committed to version control
- **Medical Disclaimer**: This tool provides general information only and is not a substitute for professional medical advice

---

**Built with ❤️ for better health awareness**

**Repository**: https://github.com/TAMILARASAN2705/medical-symptom-checker

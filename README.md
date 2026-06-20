# Medical Symptoms Pre-Checker

A modern, interactive medical symptoms pre-checker web application built with React, featuring a landing page, symptom assessment form, results overview, and integrated AI chatbot.

## 🚀 Features

- **Landing Page**: Professional hero section, overview cards, and medical disclaimers
- **Symptom Checker**: Interactive form with 23 symptoms across 7 categories
- **Results Analysis**: Priority-based assessment (Low/Moderate/High) with recommendations
- **Floating Chatbot**: Always-available health assistant with smooth animations
- **Responsive Design**: Mobile-first approach that works on all devices
- **Modern UI**: Blue/teal gradient design with smooth micro-interactions

## 📋 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563EB, #3B82F6
- **Secondary Teal**: #0D9488, #14B8A6
- **Success Green**: #10B981, #059669
- **Warning Amber**: #D97706, #B45309
- **Danger Red**: #DC2626, #B91C1C
- **Neutral Grays**: #F9FAFB to #111827

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
- Real AI chatbot integration (OpenAI/Claude API)
- Doctor/clinic finder integration
- Multi-language support
- Dark mode toggle
- User accounts & medical history

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Built with ❤️ for better health awareness**

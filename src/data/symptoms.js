export const symptoms = [
  { id: 1, name: 'Fever', category: 'Temperature' },
  { id: 2, name: 'Chills', category: 'Temperature' },
  { id: 3, name: 'Night Sweats', category: 'Temperature' },
  { id: 4, name: 'Headache', category: 'Pain' },
  { id: 5, name: 'Body Aches', category: 'Pain' },
  { id: 6, name: 'Muscle Pain', category: 'Pain' },
  { id: 7, name: 'Joint Pain', category: 'Pain' },
  { id: 8, name: 'Cough', category: 'Respiratory' },
  { id: 9, name: 'Sore Throat', category: 'Respiratory' },
  { id: 10, name: 'Shortness of Breath', category: 'Respiratory' },
  { id: 11, name: 'Congestion', category: 'Respiratory' },
  { id: 12, name: 'Dizziness', category: 'Neurological' },
  { id: 13, name: 'Confusion', category: 'Neurological' },
  { id: 14, name: 'Memory Loss', category: 'Neurological' },
  { id: 15, name: 'Nausea', category: 'Digestive' },
  { id: 16, name: 'Vomiting', category: 'Digestive' },
  { id: 17, name: 'Diarrhea', category: 'Digestive' },
  { id: 18, name: 'Constipation', category: 'Digestive' },
  { id: 19, name: 'Chest Pain', category: 'Cardiac' },
  { id: 20, name: 'Heart Palpitations', category: 'Cardiac' },
  { id: 21, name: 'Fatigue', category: 'General' },
  { id: 22, name: 'Weakness', category: 'General' },
  { id: 23, name: 'Malaise', category: 'General' },
]

export const getRecommendations = (symptomCount) => {
  if (symptomCount <= 2) {
    return {
      level: 'Low',
      color: 'priority-low',
      message: 'Minor symptoms detected. Monitor your health and rest if needed.',
      action: 'Continue monitoring. Consult a doctor if symptoms persist.'
    }
  } else if (symptomCount <= 5) {
    return {
      level: 'Moderate',
      color: 'priority-moderate',
      message: 'Moderate symptoms detected. Consider scheduling a doctor\'s appointment.',
      action: 'Book a consultation with a healthcare provider soon.'
    }
  } else {
    return {
      level: 'High',
      color: 'priority-high',
      message: 'Multiple symptoms detected. Seek medical attention promptly.',
      action: 'Contact a healthcare provider or visit an urgent care center.'
    }
  }
}

/** Central exam configuration. Update this file when RSSB publishes/updates official details. */
export const examConfig = {
  id: 'CET_12TH',
  title: 'Rajasthan CET 2026',
  level: '12th Level',
  authority: 'Rajasthan Staff Selection Board (RSSB)',
  officialSource: 'https://rssb.rajasthan.gov.in/',
  status: 'official-details-to-be-verified',
  pattern: {
    source: 'RSSB official notification/syllabus',
    questions: null,
    marks: null,
    durationMinutes: null,
    negativeMarking: null
  },
  subjects: [
    { id: 'rajasthan-gk', name: 'Rajasthan GK' },
    { id: 'india-gk', name: 'India & General Knowledge' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'english', name: 'English' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'computer', name: 'Computer' }
  ],
  testModes: ['mock', 'pyq', 'random', 'topic']
};
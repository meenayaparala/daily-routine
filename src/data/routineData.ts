import { RoutineSectionType } from '../types/routine';

export const routineData: RoutineSectionType[] = [
  {
    id: 'morning',
    title: 'Morning (Start Fresh)',
    emoji: '🌞',
    color: 'blue',
    items: [
      {
        id: 'morning-1',
        time: '5:30 AM',
        activity: '🌅 Wake up, fresh, drink water',
        purpose: 'Start day gently, rehydrate',
        type: 'kick start of day'
      },
      {
        id: 'morning-2',
        time: '6:00 AM to 8:00 AM',
        activity: ' Ground + Morning routine',
        purpose: 'Refresh body and mind',
        type: 'wellness'
      },
      {
        id: 'morning-3',
        time: '8:00 AM to 9:00 AM',
        activity: '🍽️ breakfast , Bath',
        purpose: 'Boost energy levels',
        type: 'meal'
      },
      {
        id: 'morning-4',
        time: '9:00 AM to 9:30 AM',
        activity: '🧘 daily task scheduling and checking mails',
        purpose: 'Calm focus & goal clarity',
        type: 'wellness'
      },
      {
        id: 'morning-5',
        time: '9:30 AM to 12.30 PM',
        activity: '💻 Cybersecurity study block 1',
        purpose: 'Deep focus learning',
        type: 'focus'
      }
    ]
  },
  {
    id: 'midday',
    title: 'Midday (Peak Energy Zone)',
    emoji: '☀️',
    color: 'amber',
    items: [
      {
        id: 'midday-1',
        time: '12:30 PM to 2.00 PM',
        activity: '🍽️Light break + walk/stretch',
        purpose: 'Avoid eye strain / neck tension',
        type: 'break'
      },
      {
        id: 'midday-2',
        time: '2:00 PM to 4:30 PM',
        activity: '💻 Study block 2 (labs, practicals, practice)',
        purpose: 'Build skill with application',
        type: 'focus'
      },
      {
        id: 'midday-3',
        time: '4:30 PM to 6:00 PM',
        activity: '☕ small break + relax+ householdworks',
        purpose: 'Recharge physically & mentally',
        type: 'break'
      }
    ]
  },
  {
    id: 'afternoon',
    title: 'Afternoon (Balanced Energy)',
    emoji: '🌤️',
    color: 'green',
    items: [
      {
        id: 'afternoon-1',
        time: '6:00 PM to 6:30 PM',
        activity: 'pooja and meditation',
        purpose: 'Mental reset, spiritual connection',
        type: 'wellness'
      },
      {
        id: 'afternoon-2',
        time: '6:30 PM to 8.00 PM',
        activity: '💻 Cybersecurity study block 3 (review, practice)',
        purpose: 'study session',
        type: 'focus'
      },
      {
        id: 'afternoon-3',
        time: '8:00 PM to 9.00 PM',
        activity: '🍽️ Dinner',
        purpose: 'Light, nutritious meal',
        type: 'meal'
      }
    ]
  },
  {
    id: 'evening',
    title: 'Evening (Wind Down Start)',
    emoji: '🌇',
    color: 'purple',
    items: [
      {
        id: 'evening-1',
        time: '9:00 PM to 10.00 PM',
        activity: '📘 study block 4',
        purpose: 'Light, mindful learning',
        type: 'focus'
      },
      {
        id: 'evening-2',
        time: '10:00 PM',
        activity: 'Enable blue light filter',
        purpose: 'Protect melatonin',
        type: 'wellness'
      },
      {
        id: 'evening-3',
        time: '10:15 PM',
        activity: 'Light stretching / breathing',
        purpose: 'Release tension',
        type: 'wellness'
      },
      {
        id: 'evening-4',
        time: '10:30 PM',
        activity: 'In bed, phone silent',
        purpose: 'Prepare body for rest',
        type: 'rest'
      },
      {
        id: 'evening-5',
        time: '10:45 PM',
        activity: 'Sleep',
        purpose: 'Complete full cycle of recovery',
        type: 'rest'
      }
    ]
  }
];
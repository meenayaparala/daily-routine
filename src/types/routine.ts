export type ActivityType = 'focus' | 'wellness' | 'meal' | 'rest' | 'break' | 'other';

export interface RoutineItemType {
  time: string;
  activity: string;
  purpose: string;
  type: ActivityType;
  completed?: boolean;
}

export interface RoutineSectionType {
  id: string;
  title: string;
  emoji: string;
  color: string;
  items: RoutineItemType[];
}
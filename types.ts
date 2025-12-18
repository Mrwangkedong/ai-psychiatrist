
export enum AgeGroup {
  YOUTH = 'YOUTH',         // 6-18岁
  YOUNG_ADULT = 'YOUNG',   // 19-35岁
  MIDDLE_AGED = 'MIDDLE',  // 36-59岁
  ELDERLY = 'ELDERLY'      // 60岁+
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Assessment {
  id: string;
  name: string;
  description: string;
  questions: string[];
  ageGroup: AgeGroup;
}

export interface UserState {
  ageGroup: AgeGroup | null;
  name?: string;
}

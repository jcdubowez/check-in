
export type SatisfactionLevel = 1 | 2 | 3 | 4 | 5;

export interface MonthlyReview {
  id: string;
  developerEmail: string;
  completionPercentage: number;
  bugCount: number;
  satisfaction: SatisfactionLevel;
  comments?: string;
  timestamp: string;
  monthId: string; // Formato "YYYY-MM" para validación única
  monthName: string;
}

export interface SatisfactionEmoji {
  level: SatisfactionLevel;
  emoji: string;
  label: string;
  color: string;
}

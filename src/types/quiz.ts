export type QuizOption = {
  id: string;
  label: string;
  icon?: string;
  subtext?: string;
};

export type QuizStep = {
  id: number;
  question: string;
  subtext?: string;
  options?: QuizOption[];
  type: 'single' | 'multi' | 'input' | 'mixed';
  questions?: {
    id: string;
    question: string;
    options: QuizOption[];
  }[];
  inputs?: {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    min?: number;
    max?: number;
  }[];
};

export type QuizData = {
  age?: string;
  objective?: string;
  feelings?: string;
  tried?: string[];
  time?: string;
  activityLevel?: string;
  weight?: string;
  height?: string;
  name?: string;
};

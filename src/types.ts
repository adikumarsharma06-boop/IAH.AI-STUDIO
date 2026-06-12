export type ExpertMode =
  | "Education"
  | "Marketing"
  | "Content Creation"
  | "Data Analysis"
  | "Research"
  | "Productivity"
  | "Startup Advisor"
  | "AI Business Consultant"
  | "AI Career Coach"
  | "AI Coding Assistant"
  | "AI Designer";

export type InteractiveType =
  | "quiz"
  | "flashcards"
  | "personas"
  | "checklist"
  | "comparison"
  | "data_table"
  | "business_canvas"
  | "design_color_palette"
  | "wireframe_builder"
  | "code_sandbox"
  | "career_timeline";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Flashcard {
  question: string;
  answer: string;
  category: string;
}

export interface MarketingPersona {
  name: string;
  role: string;
  demography: string;
  painPoints: string[];
  values: string[];
}

export interface ProductivityTask {
  task: string;
  durationEstimate: string;
  priority: string;
  description: string;
  completed?: boolean;
}

export interface CompetitorItem {
  item: string;
  pros: string[];
  cons: string[];
  rating: number;
}

export interface AnalyticsItem {
  label: string;
  category: string;
  value: number;
  change: string;
}

export interface BusinessCanvasData {
  valueProposition: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
  channels: string[];
}

export interface ColorToken {
  name: string;
  hex: string;
  role: string;
}

export interface WireframeElement {
  element: "header" | "hero" | "features" | "cta" | "footer" | string;
  title: string;
  description: string;
  keyFeatures: string[];
}

export interface CodeSnippetData {
  language: string;
  code: string;
  explanation: string;
  filesToCreate: string[];
}

export interface CareerTimelineStep {
  stepName: string;
  duration: string;
  focusSkills: string[];
  description: string;
}

export interface InteractivePayload {
  quizQuestions?: QuizQuestion[];
  flashcardsList?: Flashcard[];
  marketingPersonas?: MarketingPersona[];
  productivityTasks?: ProductivityTask[];
  competitorComparison?: CompetitorItem[];
  analyticsData?: AnalyticsItem[];
  businessCanvas?: BusinessCanvasData;
  colorPalette?: ColorToken[];
  wireframeElements?: WireframeElement[];
  codeSnippet?: CodeSnippetData;
  careerTimeline?: CareerTimelineStep[];
}

export interface AgenticResponse {
  detectedMode: ExpertMode;
  reasoning: string;
  goal: string;
  analysis: string;
  solution: string;
  actionPlan: string[];
  recommendedTools: string[];
  nextSteps: string[];
  interactiveType: InteractiveType;
  interactivePayload: InteractivePayload;
  actualModelUsed?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
  responsePayload?: AgenticResponse;
  isError?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  mode: ExpertMode | "auto";
  messages: ChatMessage[];
  createdAt: string;
  pinned?: boolean;
}

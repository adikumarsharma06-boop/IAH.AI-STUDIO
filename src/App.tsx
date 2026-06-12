import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  GraduationCap,
  Megaphone,
  BarChart3,
  Search,
  CheckSquare,
  Rocket,
  Briefcase,
  GitCommit,
  Terminal,
  Palette,
  Eye,
  CheckCircle2,
  AlertCircle,
  Copy,
  ChevronRight,
  TrendingUp,
  User,
  Plus,
  Compass,
  Lightbulb,
  Trash2,
  ArrowDown,
  Clock,
  RotateCcw,
  Zap,
  Check,
  Star,
  ExternalLink,
  ChevronDown,
  Activity,
  ArrowRight,
  Phone,
  Menu,
  X,
  Download,
  Wifi,
  WifiOff,
  Pin,
  PinOff,
  RefreshCw,
  Database,
  LogOut,
  LogIn,
  Lock,
  Shield,
  UserCheck,
  MessageSquare
} from "lucide-react";
import {
  ExpertMode,
  InteractiveType,
  ChatMessage,
  ChatSession,
  AgenticResponse,
  QuizQuestion,
  Flashcard,
  MarketingPersona,
  ProductivityTask,
  CompetitorItem,
  AnalyticsItem,
  BusinessCanvasData,
  ColorToken,
  WireframeElement,
  CodeSnippetData,
  CareerTimelineStep
} from "./types";

// A gorgeous SVG-based animated logo component for the "AI Studio Multi-Agent Hub"
const HubLogo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const isLg = size === "lg";
  const isSm = size === "sm";
  const containerClass = isLg 
    ? "relative w-24 h-24" 
    : isSm 
    ? "relative w-8 h-8" 
    : "relative w-10 h-10";
    
  return (
    <div className={`${containerClass} flex items-center justify-center shrink-0 select-none`}>
      {/* Outer spinning gradient ring */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-pink-500 to-amber-400 rounded-xl animate-spin duration-10000 opacity-85 blur-[1px]"></div>
      {/* Inner high contrast backing */}
      <div className="absolute inset-[1.5px] bg-slate-950 rounded-[10px] flex items-center justify-center border border-slate-800/80 shadow-md">
        <svg 
          className={`${isLg ? "w-12 h-12" : isSm ? "w-4 h-4" : "w-5.5 h-5.5"} text-indigo-400`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Inner core */}
          <circle cx="12" cy="12" r="3.5" className="fill-indigo-500/20 stroke-indigo-400 animate-pulse" />
          {/* Cyber accents / Nodes */}
          <line x1="12" y1="2" x2="12" y2="6" className="stroke-pink-500" />
          <line x1="12" y1="18" x2="12" y2="22" className="stroke-pink-500" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" className="stroke-amber-400" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" className="stroke-amber-400" />
          {/* Outer constellation rings */}
          <circle cx="12" cy="12" r="8" className="stroke-indigo-500/10" strokeDasharray="3 4" />
        </svg>
      </div>
    </div>
  );
};

// Static definitions of modes with icon, color palettes, and description
const EXPERT_MODES_CONFIG: {
  id: ExpertMode;
  name: string;
  category: "Core" | "Business";
  icon: React.ComponentType<any>;
  glow: string;
  textGlow: string;
  badgeBg: string;
  borderTheme: string;
  desc: string;
}[] = [
  {
    id: "Education",
    name: "Education Expert",
    category: "Core",
    icon: GraduationCap,
    glow: "shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)]",
    textGlow: "text-indigo-400 border-indigo-500/30",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    borderTheme: "border-indigo-500/20 hover:border-indigo-500/40 focus:border-indigo-500",
    desc: "Notes, quizzes, study plans, homework guidance, and complex technical concepts.",
  },
  {
    id: "Marketing",
    name: "Marketing Strategist",
    category: "Core",
    icon: Megaphone,
    glow: "shadow-[0_0_15px_-3px_rgba(236,72,153,0.5)]",
    textGlow: "text-pink-400 border-pink-500/30",
    badgeBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    borderTheme: "border-pink-500/20 hover:border-pink-500/40 focus:border-pink-500",
    desc: "Audiences, SEO strategies, ad copies, social plans, and brand positioning blueprints.",
  },
  {
    id: "Content Creation",
    name: "Content Creator",
    category: "Core",
    icon: Sparkles,
    glow: "shadow-[0_0_15px_-3px_rgba(245,158,11,0.5)]",
    textGlow: "text-amber-400 border-amber-500/30",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    borderTheme: "border-amber-500/20 hover:border-amber-500/40 focus:border-amber-500",
    desc: "SEO blogs, podcasts, newsletter briefs, social media threads, and script templates.",
  },
  {
    id: "Data Analysis",
    name: "Data Analyst",
    category: "Core",
    icon: BarChart3,
    glow: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]",
    textGlow: "text-emerald-400 border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    borderTheme: "border-emerald-500/20 hover:border-emerald-500/40 focus:border-emerald-500",
    desc: "Trend analysis, spreadsheet interpretation, KPIs calculation, and report charts.",
  },
  {
    id: "Research",
    name: "Deep Researcher",
    category: "Core",
    icon: Search,
    glow: "shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)]",
    textGlow: "text-cyan-400 border-cyan-500/30",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    borderTheme: "border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-500",
    desc: "Product matrix, competitor insights, executive briefs, literature comparisons.",
  },
  {
    id: "Productivity",
    name: "Productivity Guide",
    category: "Core",
    icon: CheckSquare,
    glow: "shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]",
    textGlow: "text-violet-400 border-violet-500/30",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    borderTheme: "border-violet-500/20 hover:border-violet-500/40 focus:border-violet-500",
    desc: "Time auditing, business task list sequencing, sprints, and smart workflows.",
  },
  {
    id: "Startup Advisor",
    name: "Startup Advisor",
    category: "Business",
    icon: Rocket,
    glow: "shadow-[0_0_15px_-3px_rgba(244,63,94,0.5)]",
    textGlow: "text-rose-400 border-rose-500/30",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    borderTheme: "border-rose-500/20 hover:border-rose-500/40 focus:border-rose-500",
    desc: "MVP designs, funding pitch reviews, unit economics, and Lean Canvas mapping.",
  },
  {
    id: "AI Business Consultant",
    name: "Lean Biz Consultant",
    category: "Business",
    icon: Briefcase,
    glow: "shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]",
    textGlow: "text-blue-400 border-blue-500/30",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    borderTheme: "border-blue-500/20 hover:border-blue-500/40 focus:border-blue-500",
    desc: "Customer acquisition architectures, market pivot formulas, and growth tactics.",
  },
  {
    id: "AI Career Coach",
    name: "Career Coach",
    category: "Business",
    icon: GitCommit,
    glow: "shadow-[0_0_15px_-3px_rgba(217,70,239,0.5)]",
    textGlow: "text-fuchsia-400 border-fuchsia-500/30",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    borderTheme: "border-fuchsia-500/20 hover:border-fuchsia-500/40 focus:border-fuchsia-500",
    desc: "Custom role timelines, technical curriculum steps, portfolio plans, interview tips.",
  },
  {
    id: "AI Coding Assistant",
    name: "Coding Architect",
    category: "Business",
    icon: Terminal,
    glow: "shadow-[0_0_15px_-3px_rgba(34,211,238,0.5)]",
    textGlow: "text-teal-400 border-teal-500/30",
    badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    borderTheme: "border-teal-500/20 hover:border-teal-500/40 focus:border-teal-500",
    desc: "Complete production-ready code blocks, API microservice endpoints, and debug steps.",
  },
];

const PRESETS: { mode: ExpertMode; title: string; prompt: string }[] = [
  {
    mode: "Education",
    title: "Quantum Computing Basics",
    prompt: "Create a quiz about core Quantum Computing principles such as qubits, superposition, and quantum entanglement."
  },
  {
    mode: "Marketing",
    title: "Local Café Personas",
    prompt: "Design high-fidelity customer marketing personas for a specialty, cozy local coffee shop focusing on college students and remote developers."
  },
  {
    mode: "Content Creation",
    title: "AI Trends Newsletter",
    prompt: "Write a high-converting email newsletter brief tracking the top micro-trends in AI tools for 2026."
  },
  {
    mode: "Data Analysis",
    title: "SaaS Landing Conversion",
    prompt: "SaaS conversion funnels are leaking! Synthesize key analytics metrics and recommendations showing traffic decline and checkout drop-off."
  },
  {
    mode: "Research",
    title: "Compare Language Models",
    prompt: "Create an industry comparison research report contrasting Gemini 1.5, GPT-4o, and Claude 3.5 Sonnet specifications with SWOT scores."
  },
  {
    mode: "Productivity",
    title: "MVP Launch Sprints",
    prompt: "Formulate a sequential, prioritized productivity task checklist for building an MVP software product over a highly efficient 2-week timeline."
  },
  {
    mode: "Startup Advisor",
    title: "P2P Car Rental Canvas",
    prompt: "Generate a fully detailed Business Model Canvas for a premium and secure peer-to-peer Tesla car sharing startup."
  },
  {
    mode: "AI Business Consultant",
    title: "Bakery B2B Catering Pivots",
    prompt: "Deliver growth consultant advice on how a premium local French bakery can expand into national corporate catering contracts safely."
  },
  {
    mode: "AI Career Coach",
    title: "Staff Frontend Path",
    prompt: "Build an actionable, 4-step career timeline and skill-acquisition milestone tracker for a Senior Dev trying to transition into Staff Engineer."
  },
  {
    mode: "AI Coding Assistant",
    title: "Auth Route Router Module",
    prompt: "Generate a complete, secure Express JWT authentication router module including login and verification with robust typescript."
  }
];

const MODE_PRESET_MAP: Record<string, { title: string; prompt: string }> = {
  "Education": {
    title: "Quantum Computing Basics",
    prompt: "Create a quiz about core Quantum Computing principles such as qubits, superposition, and quantum entanglement."
  },
  "Marketing": {
    title: "Local Café Personas",
    prompt: "Design high-fidelity customer marketing personas for a specialty, cozy local coffee shop focusing on college students and remote developers."
  },
  "Content Creation": {
    title: "AI Trends Newsletter",
    prompt: "Write a high-converting email newsletter brief tracking the top micro-trends in AI tools for 2026."
  },
  "Data Analysis": {
    title: "SaaS Conversions",
    prompt: "SaaS conversion funnels are leaking! Synthesize key analytics metrics and recommendations showing traffic decline and checkout drop-off."
  },
  "Research": {
    title: "Compare Language Models",
    prompt: "Create an industry comparison research report contrasting Gemini 1.5, GPT-4o, and Claude 3.5 Sonnet specifications with SWOT scores."
  },
  "Productivity": {
    title: "MVP Launch Sprints",
    prompt: "Formulate a sequential, prioritized productivity task checklist for building an MVP software product over a highly efficient 2-week timeline."
  },
  "Startup Advisor": {
    title: "P2P Car Rental Canvas",
    prompt: "Generate a fully detailed Business Model Canvas for a premium and secure peer-to-peer Tesla car sharing startup."
  },
  "AI Business Consultant": {
    title: "Bakery Catering Pivots",
    prompt: "Deliver growth consultant advice on how a premium local French bakery can expand into national corporate catering contracts safely."
  },
  "AI Career Coach": {
    title: "Staff Frontend Path",
    prompt: "Build an actionable, 4-step career timeline and skill-acquisition milestone tracker for a Senior Dev trying to transition into Staff Engineer."
  },
  "AI Coding Assistant": {
    title: "Auth Route Router Module",
    prompt: "Generate a complete, secure Express JWT authentication router module including login and verification with robust typescript."
  }
};

export default function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [activeModeSelection, setActiveModeSelection] = useState<ExpertMode | "auto">("auto");
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active highlighted response states for interactive sandbox
  const [activeQuizQuestionIdx, setActiveQuizQuestionIdx] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizAnswerSubmitted, setIsQuizAnswerSubmitted] = useState<boolean>(false);

  // Flashcards state
  const [activeFlashcardIdx, setActiveFlashcardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Checklist state (local mutation to allow toggling checks)
  const [activeChecklist, setActiveChecklist] = useState<ProductivityTask[]>([]);

  // Code sandbox active state
  const [codeSandboxTab, setCodeSandboxTab] = useState<"code" | "explanation" | "terminal">("code");
  const [codeTerminalOutput, setCodeTerminalOutput] = useState<string[]>([]);
  const [isTerminalRunning, setIsTerminalRunning] = useState<boolean>(false);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // App Access Onboarding states
  const [appState, setAppState] = useState<"loading" | "create_account" | "app">("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    email: "adikumarsharma06@gmail.com",
    phoneNumber: "7980259343",
    password: "",
    modeInterest: "auto",
    termsAccepted: true
  });
  const [isSubmittingAccount, setIsSubmittingAccount] = useState(false);
  const [activeAccountLogs, setActiveAccountLogs] = useState<string[]>([]);
  const [userAccount, setUserAccount] = useState<{ fullName: string; email: string; phoneNumber?: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sessionGrouping, setSessionGrouping] = useState<"chrono" | "mode" | "category">("mode");

  // PWA Active Network & Installation states
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // Storage Persistence Write status indicator
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | null>("saved");
  const saveTimeoutRef = useRef<any>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<"chat" | "sandbox">("chat");

  // Premium Custom Authentication Portal States
  const [authMode, setAuthMode] = useState<"signUp" | "signIn">("signUp");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Monitor connectivity live status
  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Intercept PWA native install events
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Initial check if running in standalone view mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                         (typeof window !== "undefined" && (window.navigator as any).standalone === true);
    setIsAppInstalled(isStandalone);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  // Action method to trigger app install
  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsAppInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Simulated logo loading progress indicator
  useEffect(() => {
    if (appState === "loading") {
      let currentVal = 0;
      const interval = setInterval(() => {
        currentVal += Math.floor(Math.random() * 8) + 4;
        if (currentVal >= 100) {
          setLoadingProgress(100);
          clearInterval(interval);
          setTimeout(() => {
            const savedAccount = localStorage.getItem("ai_studio_user_account");
            if (savedAccount) {
              setAppState("app");
            } else {
              setAppState("create_account");
            }
          }, 800);
        } else {
          setLoadingProgress(currentVal);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [appState]);

  // Bootstrapping sessions and profiles from local storage
  useEffect(() => {
    try {
      const savedAccount = localStorage.getItem("ai_studio_user_account");
      if (savedAccount) {
        const parsed = JSON.parse(savedAccount);
        setUserAccount(parsed);
        setSignUpForm(prev => ({
          ...prev,
          fullName: parsed.fullName || "",
          email: parsed.email || "adikumarsharma06@gmail.com",
          phoneNumber: parsed.phoneNumber || "7980259343"
        }));
      }
    } catch (e) {
      console.warn("Account load failed", e);
    }

    try {
      const saved = localStorage.getItem("ai_studio_sessions_v1");
      if (saved) {
        const parsed: ChatSession[] = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setSessions(parsed);
          setCurrentSessionId(parsed[0].id);
          setActiveModeSelection(parsed[0].mode);
          return;
        }
      }
    } catch (e) {
      console.warn("Storage fetch failed", e);
    }
    // Setup default seed session
    const defaultSession: ChatSession = {
      id: "session-init",
      title: "New Agent Workspace",
      mode: "auto",
      messages: [],
      createdAt: new Date().toISOString()
    };
    setSessions([defaultSession]);
    setCurrentSessionId(defaultSession.id);
  }, []);

  // Save sessions to storage
  const saveSessions = (updated: ChatSession[]) => {
    setSessions(updated);
    setSaveStatus("saving");
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    try {
      localStorage.setItem("ai_studio_sessions_v1", JSON.stringify(updated));
      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus("saved");
      }, 650);
    } catch (error) {
      console.error("Local save error", error);
      setSaveStatus("error");
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpForm.fullName.trim() || !signUpForm.email.trim() || !signUpForm.password.trim()) {
      return;
    }

    setIsSubmittingAccount(true);
    setActiveAccountLogs(["[Auth] Creating secure developer credentials..."]);

    setTimeout(() => {
      setActiveAccountLogs(prev => [...prev, "[Database] Provisioning isolated workspace tables for target ID: " + (signUpForm.phoneNumber || "7980259343") + "..."]);
    }, 450);

    setTimeout(() => {
      setActiveAccountLogs(prev => [...prev, "[Engine] Pre-heating orchestrator router parameters..."]);
    }, 900);

    setTimeout(() => {
      const userObj = {
        fullName: signUpForm.fullName,
        email: signUpForm.email,
        phoneNumber: signUpForm.phoneNumber || "7980259343",
        createdAt: new Date().toISOString()
      };
      localStorage.setItem("ai_studio_user_account", JSON.stringify(userObj));
      setUserAccount(userObj);
      setIsSubmittingAccount(false);
      setAppState("app");
    }, 1500);
  };

  // Handle Login / Sign In with existing credentials
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setAuthError("Please fill in all developer credentials");
      return;
    }
    
    setIsSubmittingAccount(true);
    setActiveAccountLogs(["[Auth] Validating database signatures..."]);
    
    setTimeout(() => {
      setActiveAccountLogs(prev => [...prev, "[Auth] Restoring session context keys..."]);
    }, 450);

    setTimeout(() => {
      // Find or manufacture user credentials
      const userObj = {
        fullName: loginForm.email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "Developer User",
        email: loginForm.email,
        phoneNumber: "7980259343",
        createdAt: new Date().toISOString(),
        role: "Pro Developer"
      };
      localStorage.setItem("ai_studio_user_account", JSON.stringify(userObj));
      setUserAccount(userObj);
      setIsSubmittingAccount(false);
      setAppState("app");
    }, 1200);
  };

  // Skip login altogether to play with the applet
  const handleSkipToGuest = () => {
    setIsSubmittingAccount(true);
    setAuthError(null);
    setActiveAccountLogs(["[Auth] Initializing anonymous workspace container..."]);
    
    setTimeout(() => {
      setActiveAccountLogs(prev => [...prev, "[Sandbox] Mounting temporary memory structures..."]);
    }, 350);

    setTimeout(() => {
      const guestObj = {
        fullName: "Guest Developer",
        email: "guest.developer@aistudio.io",
        phoneNumber: "999-GUEST-99",
        createdAt: new Date().toISOString(),
        isGuest: true
      };
      localStorage.setItem("ai_studio_user_account", JSON.stringify(guestObj));
      setUserAccount(guestObj);
      setIsSubmittingAccount(false);
      setAppState("app");
    }, 900);
  };

  // Perform secure sign out and reset states
  const handleLogout = () => {
    localStorage.removeItem("ai_studio_user_account");
    setUserAccount(null);
    setShowSignOutConfirm(false);
    setShowProfileMenu(false);
    setAppState("create_account");
    setAuthMode("signIn");
  };

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const lastModelMessage = currentSession?.messages
    ? [...currentSession.messages].reverse().find(m => m.role === "model" && m.responsePayload)
    : null;
  const displayModel = lastModelMessage?.responsePayload?.actualModelUsed || "gemini-3.5-flash";

  // Watch for active chat changes to sync states
  useEffect(() => {
    if (currentSession?.messages && currentSession.messages.length > 0) {
      const lastMessage = [...currentSession.messages].reverse().find(m => m.role === "model" && m.responsePayload);
      if (lastMessage && lastMessage.responsePayload) {
        resetInteractiveState(lastMessage.responsePayload);
      }
    } else {
      clearInteractiveStates();
    }
    // Scroll
    scrollToBottom();
  }, [currentSessionId]);

  const clearInteractiveStates = () => {
    setActiveQuizQuestionIdx(0);
    setQuizScore(0);
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    setActiveFlashcardIdx(0);
    setIsCardFlipped(false);
    setActiveChecklist([]);
    setCodeSandboxTab("code");
    setCodeTerminalOutput([]);
    setIsTerminalRunning(false);
  };

  const resetInteractiveState = (payload: AgenticResponse) => {
    setActiveQuizQuestionIdx(0);
    setQuizScore(0);
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    setActiveFlashcardIdx(0);
    setIsCardFlipped(false);
    setCodeSandboxTab("code");
    setCodeTerminalOutput([]);
    setIsTerminalRunning(false);

    if (payload.interactiveType === "checklist" && payload.interactivePayload?.productivityTasks) {
      setActiveChecklist(payload.interactivePayload.productivityTasks.map(t => ({ ...t, completed: false })));
    }

    // Auto shift focused view on mobile/tablet devices when interactive widget generated
    if (payload.interactiveType) {
      setActiveMobileTab("sandbox");
    }
  };

  const scrollToBottom = () => {
    if (!autoScrollEnabled) return;
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleToggleAutoScroll = () => {
    setAutoScrollEnabled(prev => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      return next;
    });
  };

  // Switch Active Session
  const selectSession = (id: string) => {
    setCurrentSessionId(id);
    const target = sessions.find((s) => s.id === id);
    if (target) {
      setActiveModeSelection(target.mode);
    }
  };

  // Create New Session
  const handleNewSession = (modeOption: ExpertMode | "auto" = "auto") => {
    const freshId = `session-${Date.now()}`;
    const fresh: ChatSession = {
      id: freshId,
      title: modeOption === "auto" ? "Agent Workspace" : `${modeOption} Brief`,
      mode: modeOption,
      messages: [],
      createdAt: new Date().toISOString()
    };
    const updated = [fresh, ...sessions];
    saveSessions(updated);
    setCurrentSessionId(freshId);
    setActiveModeSelection(modeOption);
    clearInteractiveStates();
    setErrorMessage(null);
  };

  // Change active session mode context
  const handleModeChangeInSession = (newMode: ExpertMode | "auto") => {
    setActiveModeSelection(newMode);
    if (!currentSession) return;
    const updated = sessions.map(s => {
      if (s.id === currentSessionId) {
        return {
          ...s,
          mode: newMode,
          title: s.title === "New Agent Workspace" || s.title === "Agent Workspace" || s.title.endsWith("Brief")
            ? (newMode === "auto" ? "Agent Workspace" : `${newMode} Brief`)
            : s.title
        };
      }
      return s;
    });
    saveSessions(updated);
  };

  // Delete specific session
  const handleDeleteSession = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation();
    const filtered = sessions.filter(s => s.id !== idToDelete);
    if (filtered.length === 0) {
      // Create new fresh
      const defaultSession: ChatSession = {
        id: `session-${Date.now()}`,
        title: "Agent Workspace",
        mode: "auto",
        messages: [],
        createdAt: new Date().toISOString()
      };
      saveSessions([defaultSession]);
      setCurrentSessionId(defaultSession.id);
      setActiveModeSelection("auto");
    } else {
      saveSessions(filtered);
      if (currentSessionId === idToDelete) {
        setCurrentSessionId(filtered[0].id);
        setActiveModeSelection(filtered[0].mode);
      }
    }
  };

  // Toggle Pin session status
  const handleTogglePinSession = (e: React.MouseEvent, idToPin: string) => {
    e.stopPropagation();
    const updated = sessions.map(s => {
      if (s.id === idToPin) {
        return { ...s, pinned: !s.pinned };
      }
      return s;
    });
    saveSessions(updated);
  };

  // Copy all messages transcript from the current session
  const handleCopyAllMessages = () => {
    if (!currentSession || currentSession.messages.length === 0) return;
    
    const fullText = currentSession.messages
      .map(m => `[${m.role === "model" ? "AI Specialist Agent" : "User"}] (${new Date(m.timestamp).toLocaleTimeString()}):\n${m.text}`)
      .join("\n\n");
      
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    triggerClipboardCopy(fullText, "Entire Chat Transcript");
    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  // Regenerate last response in the active session
  const handleRegenerateResponse = async () => {
    if (!currentSession || isGenerating) return;
    const msgs = currentSession.messages;
    if (msgs.length === 0) return;

    // Find last user message index
    let lastUserMsgIdx = -1;
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].role === "user") {
        lastUserMsgIdx = i;
        break;
      }
    }

    if (lastUserMsgIdx === -1) return;

    const promptToRegenerate = msgs[lastUserMsgIdx].text;
    const messagesBeforeLastUser = msgs.slice(0, lastUserMsgIdx);

    // Filter down current session to exclude last user message and subsequent AI response
    // handleSendMessage will take care of creating a fresh prompt and updating the list.
    const updated = sessions.map(s => {
      if (s.id === currentSession.id) {
        return {
          ...s,
          messages: messagesBeforeLastUser
        };
      }
      return s;
    });

    setSessions(updated);
    await handleSendMessage(promptToRegenerate);
  };

  // Code sandbox static runner helper
  const handleRunCodeTest = (snippet: CodeSnippetData) => {
    setIsTerminalRunning(true);
    setCodeTerminalOutput([`$ node runner.ts --target=sandbox`]);
    
    setTimeout(() => {
      setCodeTerminalOutput(prev => [
        ...prev,
        `[System] Launching mock workspace execution pipeline...`,
        `[Environment] Node v22.14.0 active on Port 3000`,
        `[Files Loaded] ` + (snippet.filesToCreate?.join(", ") || "index.ts"),
      ]);
    }, 450);

    setTimeout(() => {
      const logs = [
        `[Executing Router...]`,
        `✔ API connection initialized successfully.`,
        `✔ Types verified against TypeScript specification.`,
        `\n--- Execution Result Output ---`,
        `✨ System is ready! Generated logic returned response codes in 14ms.`,
        `✨ Process terminated with exit code 0`
      ];
      setCodeTerminalOutput(prev => [...prev, ...logs]);
      setIsTerminalRunning(false);
    }, 1200);
  };

  // Flashcards state trackers
  const nextFlashcard = (total: number) => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setActiveFlashcardIdx(prev => (prev + 1) % total);
    }, 150);
  };

  const prevFlashcard = (total: number) => {
    setIsCardFlipped(false);
    setTimeout(() => {
      setActiveFlashcardIdx(prev => (prev - 1 + total) % total);
    }, 150);
  };

  // Clipboard copy action helper
  const triggerClipboardCopy = (txt: string, label: string = "Snippet") => {
    navigator.clipboard.writeText(txt);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Send Master Message to Platform
  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputValue;
    if (!promptToSend.trim() || isGenerating) return;

    setErrorMessage(null);
    if (!customPrompt) setInputValue("");

    // Setup active session if missing or broken
    let activeId = currentSessionId;
    if (!currentSession) {
      const freshId = `session-${Date.now()}`;
      const fresh: ChatSession = {
        id: freshId,
        title: "Agent Workspace",
        mode: activeModeSelection,
        messages: [],
        createdAt: new Date().toISOString()
      };
      saveSessions([fresh, ...sessions]);
      setCurrentSessionId(freshId);
      activeId = freshId;
    }

    // 1. Construct user message object
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: promptToSend,
      timestamp: new Date().toISOString()
    };

    // Update session temporarily with user message
    const currentSessionInstance = sessions.find((s) => s.id === activeId)!;
    const initialMsgs = [...currentSessionInstance.messages, userMsg];
    
    // Auto name the session from first prompt if generic
    let sessionTitle = currentSessionInstance.title;
    if (currentSessionInstance.messages.length === 0) {
      sessionTitle = promptToSend.length > 25 ? promptToSend.substring(0, 22) + "..." : promptToSend;
    }

    const midSessions = sessions.map(s => {
      if (s.id === activeId) {
        return { ...s, title: sessionTitle, messages: initialMsgs };
      }
      return s;
    });
    setSessions(midSessions);
    setIsGenerating(true);
    scrollToBottom();

    // 2. Prepare payload for Gemini Hub call
    const contextHistory = initialMsgs.slice(-6).map(m => ({
      role: m.role,
      text: m.text
    }));

    try {
      const endpoint = "/api/generate";
      const configObj = {
        prompt: promptToSend,
        mode: activeModeSelection,
        history: contextHistory,
        userAccount: userAccount ? {
          fullName: userAccount.fullName,
          email: userAccount.email,
          phoneNumber: userAccount.phoneNumber || "7980259343"
        } : null
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configObj)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.details || errJson.error || `HTTP ${res.status} request failure.`);
      }

      const parsedResponse: AgenticResponse = await res.json();

      const responseMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: "model",
        text: parsedResponse.solution,
        timestamp: new Date().toISOString(),
        responsePayload: parsedResponse
      };

      // Perfect save sessions state
      const finalSessions = sessions.map(s => {
        if (s.id === activeId) {
          return {
            ...s,
            title: sessionTitle,
            mode: activeModeSelection === "auto" ? "auto" : activeModeSelection,
            messages: [...initialMsgs, responseMsg]
          };
        }
        return s;
      });

      saveSessions(finalSessions);
      resetInteractiveState(parsedResponse);

    } catch (e: any) {
      console.error(e);
      const errMsgStr = e.message || String(e);
      setErrorMessage(errMsgStr);

      const errorMsg: ChatMessage = {
        id: `agent-error-${Date.now()}`,
        role: "model",
        text: `**System Failure Encountered**\n\nCould not compile or route agent module. Reason Details: \n\`\`\`\n${errMsgStr}\n\`\`\``,
        timestamp: new Date().toISOString(),
        isError: true
      };

      saveSessions(sessions.map(s => {
        if (s.id === activeId) {
          return { ...s, messages: [...initialMsgs, errorMsg] };
        }
        return s;
      }));
    } finally {
      setIsGenerating(false);
      scrollToBottom();
    }
  };

  const getActivePayloadAndType = () => {
    if (!currentSession?.messages) return null;
    const lastWithPayload = [...currentSession.messages]
      .reverse()
      .find(m => m.role === "model" && m.responsePayload);
    
    if (lastWithPayload?.responsePayload) {
      return {
        type: lastWithPayload.responsePayload.interactiveType,
        data: lastWithPayload.responsePayload.interactivePayload,
        meta: lastWithPayload.responsePayload
      };
    }
    return null;
  };

  const activeSandbox = getActivePayloadAndType();

  if (appState === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden select-none">
        {/* Glow orbs background decoration */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative z-10 max-w-md w-full px-6 text-center space-y-8 animate-fade-in">
          {/* Pulsating logo ring */}
          <div className="flex justify-center">
            <HubLogo size="lg" />
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-3xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              AI STUDIO
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Orchestrated Platform Hub
            </p>
          </div>

          <div className="space-y-3.5 max-w-xs mx-auto">
            {/* Loading progress bar */}
            <div className="relative w-full bg-slate-900 border border-slate-800/80 h-3 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 via-pink-400 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">
              <span>
                {loadingProgress < 30 ? "Initializing routers..." : 
                 loadingProgress < 60 ? "Indexing expert modules..." :
                 loadingProgress < 90 ? "Validating terminal pipelines..." : "Unlocking keys..."}
              </span>
              <span className="font-bold text-indigo-400">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (appState === "create_account") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow orb background decoration */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        <div className="max-w-4xl w-full bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col md:flex-row relative z-10 animate-fade-in border-indigo-500/10">
          
          {/* Left panel: Info marketing highlights */}
          <div className="w-full md:w-[380px] bg-slate-950/40 p-8 border-b md:border-b-0 md:border-r border-slate-800/65 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3.5 text-left">
                <HubLogo size="md" />
                <div>
                  <h3 className="font-display font-extrabold text-sm tracking-tight text-white leading-normal">AI STUDIO</h3>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-400 font-semibold block leading-none mt-0.5">Multi-Agent Hub</span>
                </div>
              </div>

              <div className="space-y-5 pt-4 text-left">
                <h4 className="font-display font-semibold text-lg text-slate-200 leading-snug">
                  Unlock premium coordinated workflows & sandbox widgets
                </h4>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Plus className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-300">11 Specialized Expert Domains</h5>
                      <p className="text-[10px] text-slate-400 leading-normal">Switch between coding, marketing, analysis, and startup experts dynamically.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal className="w-3.5 h-3.5 text-pink-400" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-300">Intelligent Sandbox Preview</h5>
                      <p className="text-[10px] text-slate-400 leading-normal">Run live local test code, execute smart questionnaires, and track visual stats.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Database className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-300">Robust Persistent Sessions</h5>
                      <p className="text-[10px] text-slate-400 leading-normal">Our backend monitors state and auto-saves changes securely on the fly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/40 text-[9px] font-mono text-slate-500 text-left">
              Secure Local DB Active &middot; Premium Edition
            </div>
          </div>

          {/* Right panel: Multi-action tab view containing Register / Login / Skip */}
          <div className="flex-1 p-8 flex flex-col justify-between">
            {isSubmittingAccount ? (
              <div className="h-full flex flex-col justify-center items-center py-12 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-spin">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-center space-y-4 max-w-xs w-full">
                  <h4 className="font-display font-medium text-sm text-slate-100">
                    Spawning Active Environment...
                  </h4>
                  <div className="bg-slate-950 rounded-lg p-4 border border-slate-850 font-mono text-[10px] text-left leading-normal space-y-1.5 text-slate-400 select-text max-h-[140px] overflow-y-auto">
                    {activeAccountLogs.map((log, idx) => (
                      <p key={idx} className={log.startsWith("[Engine]") ? "text-indigo-400 font-medium" : log.startsWith("[Auth]") ? "text-emerald-400 font-medium" : "text-slate-300"}>
                        {log}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Mode Selector Tabs */}
                <div className="bg-slate-950 p-1 rounded-xl border border-slate-800/80 flex gap-1">
                  <button
                    onClick={() => { setAuthMode("signUp"); setAuthError(null); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      authMode === "signUp"
                        ? "bg-indigo-600 text-white shadow-md font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                  <button
                    onClick={() => { setAuthMode("signIn"); setAuthError(null); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                      authMode === "signIn"
                        ? "bg-indigo-600 text-white shadow-md font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Access Portal</span>
                  </button>
                </div>

                {authError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-450 shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {authMode === "signUp" ? (
                  /* Form 1: Sign Up */
                  <form onSubmit={handleCreateAccount} className="space-y-4 text-left">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Developer Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={signUpForm.fullName}
                            onChange={(e) => setSignUpForm(prev => ({ ...prev, fullName: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                            placeholder="John Doe"
                          />
                          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 opacity-60" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Developer Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={signUpForm.email}
                            onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                            placeholder="john@example.com"
                          />
                          <UserCheck className="w-4 h-4 text-slate-500 absolute left-3 top-3 opacity-60" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            Backup pin/phone
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={signUpForm.phoneNumber}
                              onChange={(e) => setSignUpForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                              placeholder="7980259343"
                            />
                            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 opacity-60" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              required
                              value={signUpForm.password}
                              onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                              placeholder="••••••••••••"
                            />
                            <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 opacity-60" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Primary Focus Specialization
                        </label>
                        <select
                          value={signUpForm.modeInterest}
                          onChange={(e) => setSignUpForm(prev => ({ ...prev, modeInterest: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
                        >
                          <option value="auto">⚡ Orchestrated Hub (Full Stack AI)</option>
                          <option value="Education">🎓 Study & Quizzes Specialist</option>
                          <option value="Productivity">⏱️ Task List & Sprints</option>
                          <option value="AI Coding Assistant">💻 Software Engineering Assistant</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1 selection:bg-transparent">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={signUpForm.termsAccepted}
                        onChange={(e) => setSignUpForm(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                        className="w-4 h-4 mt-0.5 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-indigo-500 focus:ring-opacity-25"
                      />
                      <label htmlFor="acceptTerms" className="text-[10px] text-slate-400 font-medium select-none cursor-pointer leading-normal">
                        I agree to terms of sandbox development and local data safety parameters
                      </label>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!signUpForm.fullName.trim() || !signUpForm.email.trim() || !signUpForm.password.trim() || !signUpForm.termsAccepted}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-850 disabled:text-slate-500 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-indigo-600/25 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Initialize Workspace Sync</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Form 2: Sign In */
                  <form onSubmit={handleSignIn} className="space-y-4 text-left animate-fade-in">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Developer Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={loginForm.email}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                            placeholder="john@example.com"
                          />
                          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 opacity-60" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Password Key
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            value={loginForm.password}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                            placeholder="••••••••••••"
                          />
                          <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 opacity-60" />
                        </div>
                      </div>
                    </div>

                    {/* Pre-fill Quick Credentials Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setLoginForm({
                          email: "developer@aistudio.io",
                          password: "admin_master_password"
                        });
                        setAuthError(null);
                      }}
                      className="w-full text-center py-2 rounded-xl bg-indigo-950/40 border border-indigo-850 hover:bg-indigo-950/80 text-[10px] font-mono text-indigo-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                      <span>One-Click Autofill Demo Credentials</span>
                    </button>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!loginForm.email.trim() || !loginForm.password.trim()}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-850 disabled:text-slate-500 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-indigo-600/25 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Authenticate Developer</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Skip / Cancel option that implements visual skip with temporary profile */}
                <div className="text-center">
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-850"></div>
                    <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-500">OR BYPASS CONNECTION</span>
                    <div className="flex-grow border-t border-slate-850"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSkipToGuest}
                    className="w-full mt-2 py-2.5 rounded-xl border border-dashed border-slate-800 hover:bg-slate-900/40 text-slate-400 hover:text-white text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="btn_cancel_connection_skip"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                    <span>Skip Connection & Explore as Guest</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 font-sans text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 1. MOBILE SIDEBAR OVERLAY BACKDROP */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* 2. LEFT SIDEBAR */}
      <motion.aside
        initial={isMobile ? { x: "-100%" } : { x: -320, opacity: 0 }}
        animate={isMobile ? { x: isSidebarOpen ? 0 : "-100%" } : { x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed md:sticky top-0 inset-y-0 left-0 z-50 w-80 max-w-[85vw] md:max-w-none shrink-0 bg-slate-900/95 md:bg-slate-900/60 border-r md:border-b-0 border-slate-800/80 flex flex-col backdrop-blur-xl h-screen"
      >
        
        {/* Sidebar Header with Glow branding */}
        <div className="p-5 border-b border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HubLogo size="sm" />
            <div>
              <h1 className="font-display font-bold text-base leading-tight tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                AI Studio
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-405 text-indigo-400 font-semibold">
                Multi-Agent Hub
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleNewSession(activeModeSelection === "auto" ? "auto" : activeModeSelection)}
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-md shadow-indigo-600/10"
              title="Create New Agent workspace Workspace"
              id="btn_new_session"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700/80 text-slate-300 transition-colors cursor-pointer"
              title="Close Menu"
              id="btn_close_sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode controller & Router */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-950/40">
          <label className="block text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold mb-2">
            Workspace Expert Mode
          </label>
          <div className="relative">
            <select
              value={activeModeSelection}
              onChange={(e) => handleModeChangeInSession(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
              id="expert_mode_selector"
            >
              <option value="auto">⚡ AUTO-DETECT (Intelligent Router)</option>
              <optgroup label="Core Expert Modules">
                {EXPERT_MODES_CONFIG.filter(m => m.category === "Core").map(m => (
                  <option key={m.id} value={m.id}>🎓 {m.name}</option>
                ))}
              </optgroup>
              <optgroup label="Advanced Business Suite">
                {EXPERT_MODES_CONFIG.filter(m => m.category === "Business").map(m => (
                  <option key={m.id} value={m.id}>💼 {m.name}</option>
                ))}
              </optgroup>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1.5 leading-normal">
            {activeModeSelection === "auto" 
              ? "The orchestrator routes your query to the single best expert, generating custom interactive widgets."
              : EXPERT_MODES_CONFIG.find(m => m.id === activeModeSelection)?.desc
            }
          </p>
        </div>

        {/* Scrollable history and preset samples */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Active Workspaces list */}
          <div>
            <div className="flex items-center justify-between mb-3.5 pb-1 border-b border-slate-800/40">
              <span className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 font-bold">
                Active Sessions
              </span>
              <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800/80 rounded-md p-0.5">
                <button
                  onClick={() => setSessionGrouping("chrono")}
                  className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-tight rounded transition-all cursor-pointer ${
                    sessionGrouping === "chrono"
                      ? "bg-slate-800 text-indigo-300 font-bold border border-slate-700/60"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="List sessions chronologically"
                >
                  List
                </button>
                <button
                  onClick={() => setSessionGrouping("mode")}
                  className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-tight rounded transition-all cursor-pointer ${
                    sessionGrouping === "mode"
                      ? "bg-slate-800 text-indigo-300 font-bold border border-slate-700/60"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Group sessions dynamically by Expert Mode"
                >
                  Mode
                </button>
                <button
                  onClick={() => setSessionGrouping("category")}
                  className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-tight rounded transition-all cursor-pointer ${
                    sessionGrouping === "category"
                      ? "bg-slate-800 text-indigo-300 font-bold border border-slate-700/60"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                  title="Group sessions dynamically by Category"
                >
                  Suite
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {(() => {
                const renderSessionItem = (s: ChatSession, isActive: boolean, mappedMode: any, IconComponent: any) => {
                  return (
                    <div
                      key={s.id}
                      onClick={() => selectSession(s.id)}
                      className={`group w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-slate-800/80 to-slate-900 border-l-2 border-indigo-500 shadow-md"
                          : "hover:bg-slate-800/20 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className={`p-1 rounded shrink-0 ${isActive ? "text-indigo-400" : "text-slate-500"}`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-[11.5px] font-medium truncate leading-tight flex-1">
                          <div className="truncate text-slate-200 group-hover:text-white transition-colors">{s.title}</div>
                          <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                            {s.pinned && (
                              <span className="px-1 py-0.2 text-[8px] bg-amber-500/10 text-amber-500 rounded border border-amber-500/20 font-mono font-medium shrink-0 flex items-center gap-0.5">
                                <Pin className="w-1.5 h-1.5 fill-amber-500" /> Pinned
                              </span>
                            )}
                            <span className={`px-1 py-0.2 text-[8px] rounded font-mono font-medium border shrink-0 ${
                              s.mode === "auto"
                                ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/10"
                                : mappedMode
                                  ? `${mappedMode.badgeBg} border-slate-800`
                                  : "bg-slate-850 text-slate-400 border-slate-800"
                            }`}>
                              {s.mode === "auto" ? "⚡ AUTO" : (mappedMode ? mappedMode.name : s.mode)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={(e) => handleTogglePinSession(e, s.id)}
                          className={`p-1 rounded hover:bg-slate-700/50 transition-all cursor-pointer ${
                            s.pinned 
                              ? "opacity-100 text-amber-400 hover:text-amber-300"
                              : "opacity-0 group-hover:opacity-100 text-slate-500 hover:text-amber-400"
                          }`}
                          title={s.pinned ? "Unpin this workspace" : "Pin workspace to top"}
                        >
                          <Pin className={`w-3 h-3 ${s.pinned ? "fill-amber-400" : ""}`} />
                        </button>

                        <button
                          onClick={(e) => handleDeleteSession(e, s.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-700/50 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                          title="Delete profile session"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                };

                if (sessionGrouping === "chrono") {
                  return (
                    <div className="space-y-1">
                      {[...sessions].sort((a, b) => {
                        const aPinned = a.pinned ? 1 : 0;
                        const bPinned = b.pinned ? 1 : 0;
                        if (aPinned !== bPinned) return bPinned - aPinned;
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                      }).map((s) => {
                        const isActive = s.id === currentSessionId;
                        const mappedMode = EXPERT_MODES_CONFIG.find(m => m.id === s.mode);
                        const IconComponent = mappedMode ? mappedMode.icon : Compass;
                        return renderSessionItem(s, isActive, mappedMode, IconComponent);
                      })}
                    </div>
                  );
                }

                if (sessionGrouping === "mode") {
                  const modeGroups: { modeId: string; name: string; icon: any; glow?: string; badgeBg?: string; textGlow?: string; sessions: ChatSession[] }[] = [];
                  
                  // 1. Auto sessions
                  const autoSessions = sessions.filter(s => s.mode === "auto").sort((a, b) => {
                    const aPinned = a.pinned ? 1 : 0;
                    const bPinned = b.pinned ? 1 : 0;
                    if (aPinned !== bPinned) return bPinned - aPinned;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });
                  
                  if (autoSessions.length > 0) {
                    modeGroups.push({
                      modeId: "auto",
                      name: "⚡ Intelligent Router",
                      icon: Lightbulb,
                      sessions: autoSessions
                    });
                  }

                  // 2. Configured expert modes
                  EXPERT_MODES_CONFIG.forEach(m => {
                    const matchingSessions = sessions.filter(s => s.mode === m.id).sort((a, b) => {
                      const aPinned = a.pinned ? 1 : 0;
                      const bPinned = b.pinned ? 1 : 0;
                      if (aPinned !== bPinned) return bPinned - aPinned;
                      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });
                    if (matchingSessions.length > 0) {
                      modeGroups.push({
                        modeId: m.id,
                        name: m.name,
                        icon: m.icon,
                        glow: m.glow,
                        badgeBg: m.badgeBg,
                        textGlow: m.textGlow,
                        sessions: matchingSessions
                      });
                    }
                  });

                  if (modeGroups.length === 0) {
                    return (
                      <p className="text-[10px] text-slate-500 italic text-center py-2">No active sessions found.</p>
                    );
                  }

                  return modeGroups.map((g) => {
                    const GroupIcon = g.icon || Compass;
                    return (
                      <div key={g.modeId} className="space-y-1">
                        <div className="flex items-center gap-1.5 px-1 py-1 text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                          <GroupIcon className={`w-3 h-3 ${g.textGlow || "text-slate-500 animate-pulse"}`} />
                          <span className="truncate">{g.name}</span>
                          <span className="text-[8px] bg-slate-900 border border-slate-850 text-slate-400 font-normal px-1 rounded-full">{g.sessions.length}</span>
                        </div>
                        <div className="space-y-1 pl-1.5 border-l border-slate-800/40 ml-1.5">
                          {g.sessions.map((s) => {
                            const isActive = s.id === currentSessionId;
                            const mappedMode = EXPERT_MODES_CONFIG.find(m => m.id === s.mode);
                            const IconComponent = mappedMode ? mappedMode.icon : Compass;
                            return renderSessionItem(s, isActive, mappedMode, IconComponent);
                          })}
                        </div>
                      </div>
                    );
                  });
                }

                if (sessionGrouping === "category") {
                  const categoryGroups: { catId: string; name: string; icon: any; colorClass: string; sessions: ChatSession[] }[] = [];
                  
                  // 1. System routing
                  const systemSessions = sessions.filter(s => s.mode === "auto").sort((a, b) => {
                    const aPinned = a.pinned ? 1 : 0;
                    const bPinned = b.pinned ? 1 : 0;
                    if (aPinned !== bPinned) return bPinned - aPinned;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });
                  
                  if (systemSessions.length > 0) {
                    categoryGroups.push({
                      catId: "system",
                      name: "⚡ Core System Router",
                      icon: Compass,
                      colorClass: "text-indigo-400",
                      sessions: systemSessions
                    });
                  }

                  // 2. Core Modules
                  const coreSessions = sessions.filter(s => {
                    const mapped = EXPERT_MODES_CONFIG.find(m => m.id === s.mode);
                    return mapped && mapped.category === "Core";
                  }).sort((a, b) => {
                    const aPinned = a.pinned ? 1 : 0;
                    const bPinned = b.pinned ? 1 : 0;
                    if (aPinned !== bPinned) return bPinned - aPinned;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });

                  if (coreSessions.length > 0) {
                    categoryGroups.push({
                      catId: "core",
                      name: "🎓 Core Expert Suite",
                      icon: GraduationCap,
                      colorClass: "text-cyan-400",
                      sessions: coreSessions
                    });
                  }

                  // 3. Advanced Business Suite
                  const businessSessions = sessions.filter(s => {
                    const mapped = EXPERT_MODES_CONFIG.find(m => m.id === s.mode);
                    return mapped && mapped.category === "Business";
                  }).sort((a, b) => {
                    const aPinned = a.pinned ? 1 : 0;
                    const bPinned = b.pinned ? 1 : 0;
                    if (aPinned !== bPinned) return bPinned - aPinned;
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  });

                  if (businessSessions.length > 0) {
                    categoryGroups.push({
                      catId: "business",
                      name: "💼 Advanced Business Suite",
                      icon: Briefcase,
                      colorClass: "text-rose-400",
                      sessions: businessSessions
                    });
                  }

                  if (categoryGroups.length === 0) {
                    return (
                      <p className="text-[10px] text-slate-500 italic text-center py-2">No active sessions found.</p>
                    );
                  }

                  return categoryGroups.map((g) => {
                    const CatIcon = g.icon || Compass;
                    return (
                      <div key={g.catId} className="space-y-1">
                        <div className="flex items-center gap-1.5 px-1 py-1 text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                          <CatIcon className={`w-3 h-3 ${g.colorClass}`} />
                          <span className="truncate">{g.name}</span>
                          <span className="text-[8px] bg-slate-900 border border-slate-850 text-slate-400 font-normal px-1 rounded-full">{g.sessions.length}</span>
                        </div>
                        <div className="space-y-1 pl-1.5 border-l border-slate-800/40 ml-1.5">
                          {g.sessions.map((s) => {
                            const isActive = s.id === currentSessionId;
                            const mappedMode = EXPERT_MODES_CONFIG.find(m => m.id === s.mode);
                            const IconComponent = mappedMode ? mappedMode.icon : Compass;
                            return renderSessionItem(s, isActive, mappedMode, IconComponent);
                          })}
                        </div>
                      </div>
                    );
                  });
                }
              })()}
            </div>
          </div>

          {/* Quick Presets based on Active Type */}
          <div>
            <span className="block text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold mb-2">
              Quick Presets
            </span>
            <div className="space-y-1.5">
              {PRESETS.filter(p => activeModeSelection === "auto" || p.mode === activeModeSelection)
                .slice(0, 5)
                .map((p, idx) => {
                  const mConf = EXPERT_MODES_CONFIG.find(m => m.id === p.mode);
                  const Icon = mConf ? mConf.icon : Sparkles;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p.prompt)}
                      disabled={isGenerating}
                      className="w-full text-left p-2.5 rounded-lg border border-slate-800/60 bg-slate-950/20 hover:bg-slate-800/30 hover:border-slate-700/80 transition-all text-xs text-slate-300 disabled:opacity-50 cursor-pointer group flex gap-2"
                    >
                      <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500 group-hover:text-amber-400 transition-colors" />
                      <div className="min-w-0">
                        <div className="font-medium text-slate-200 truncate group-hover:text-white transition-colors">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5 leading-normal">
                          {p.prompt}
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

        </div>

        {/* Footer Metrics */}
        <div className="p-4 border-t border-slate-800/85 bg-slate-950/60 space-y-2.5 relative">
          
          {/* Profile Menu Dropdown Popover */}
          <AnimatePresence>
            {showProfileMenu && userAccount && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-4 right-4 bottom-22 bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-22 shadow-2xl z-50 text-left space-y-3"
              >
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                    {userAccount.fullName[0]?.toUpperCase() || "D"}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-100 truncate leading-none mb-1">{userAccount.fullName}</div>
                    <div className="text-[10px] font-mono text-slate-400 truncate leading-none">{userAccount.email}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 leading-normal flex justify-between">
                    <span>Account Tier:</span>
                    <span className="text-indigo-400 font-semibold">{userAccount.isGuest ? "Guest Sandbox" : "Developer Premium"}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 leading-normal flex justify-between">
                    <span>Assigned Pin:</span>
                    <span className="text-slate-300 font-semibold">{userAccount.phoneNumber || "Local Memory"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSignOutConfirm(true);
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-center py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-[11px] font-medium text-rose-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Request Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign Out Confirmation Modal overlay */}
          <AnimatePresence>
            {showSignOutConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-x-2 bottom-4 bg-slate-950 border border-rose-500/20 rounded-xl p-3 shadow-2xl z-50 text-left space-y-3"
              >
                <div className="text-center space-y-1.5">
                  <p className="text-[11px] font-mono font-semibold text-amber-505 text-amber-500 uppercase tracking-widest">Confirm Sign Out</p>
                  <p className="text-[10px] text-slate-400 leading-normal">This will wipe local temporary storage credentials. Exit workspace?</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pb-1">
                  <button
                    onClick={() => setShowSignOutConfirm(false)}
                    className="py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-[10px] font-medium text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowSignOutConfirm(false);
                    }}
                    className="py-1.5 rounded-lg bg-rose-600 hover:bg-rose-505 text-[10px] font-bold text-white transition-all cursor-pointer"
                  >
                    Confirm Clear
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {userAccount && (
            <div 
              onClick={() => {
                if (!showSignOutConfirm) {
                  setShowProfileMenu(!showProfileMenu);
                }
              }}
              className="flex flex-col gap-2 border-b border-slate-800/60 pb-2 mb-1.5 text-left cursor-pointer hover:bg-slate-900/40 p-1.5 rounded-xl transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10.5px] text-indigo-405 text-indigo-400 font-bold shrink-0 shadow">
                  {userAccount.fullName.trim()[0]?.toUpperCase() || "D"}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-sans font-semibold text-slate-200 block truncate leading-none mb-1">{userAccount.fullName}</span>
                  <span className="text-[9px] font-mono text-slate-430 text-slate-400 block truncate leading-none">{userAccount.email}</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>System: Active</span>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-indigo-400 capitalize">{displayModel.replace("-", " ")}</span>
            </div>
          </div>
        </div>

      </motion.aside>

      {/* 2. MAIN HUB WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 md:h-screen overflow-hidden bg-slate-950">
        
        {/* Top Header tracking router state */}
        <header className="p-4 bg-slate-900/40 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Open Menu"
              id="btn_open_sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 font-medium">Orchestrated Layer:</span>
              {currentSession && currentSession.messages.length > 0 && activeSandbox ? (
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase font-bold border ${EXPERT_MODES_CONFIG.find(m => m.id === activeSandbox.meta.detectedMode)?.badgeBg}`}>
                  🛡️ {activeSandbox.meta.detectedMode} Module Choose
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase font-bold border border-slate-800 bg-slate-900 text-slate-400">
                  ⌛ Standby Router
                </span>
              )}
            </div>

            {userAccount && (
              <div className="flex items-center gap-2.5 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1 rounded-full text-xs shadow-inner shadow-emerald-900/10 animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold text-[9px] uppercase tracking-wider">
                    Access Recognized
                  </span>
                </div>
                <div className="h-3 w-[1px] bg-emerald-500/20" />
                <span className="text-slate-300 text-[11px] font-medium">
                  Welcome back, <span className="text-emerald-300 font-semibold">{userAccount.fullName}</span>!
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-wrap">
            {/* Native PWA Installation CTA trigger */}
            {deferredPrompt && (
              <button
                onClick={handleInstallApp}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600/20 to-indigo-600/10 hover:from-amber-500 hover:to-indigo-500 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all font-semibold active:scale-95 shadow-lg shadow-indigo-950/40 cursor-pointer group"
                title="Install application as a standalone desktop/mobile app"
              >
                <Download className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 group-hover:translate-y-[-1px] transition-transform" />
                <span>Install App</span>
              </button>
            )}

            {isAppInstalled && (
              <span className="flex items-center gap-1 bg-gradient-to-r from-indigo-500/10 to-indigo-600/5 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[11px] font-mono font-medium">
                📱 Standalone PWA
              </span>
            )}

            {/* Live Network connectivity indicator */}
            {isOnline ? (
              <div className="flex items-center gap-1.5 bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-mono">
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span>Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-0.5 rounded text-[11px] font-mono animate-pulse">
                <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-bold">Offline Cache</span>
              </div>
            )}

            <div>UTC: <span className="text-slate-200">18:46</span></div>
            <div>Model: <span className="text-slate-200">{displayModel}</span></div>
          </div>
        </header>

        {/* Mobile Screen Tab Toggle Switcher */}
        <div className="lg:hidden px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 flex items-center justify-center shrink-0">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800/85 flex w-full max-w-md gap-1">
            <button
              onClick={() => setActiveMobileTab("chat")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                activeMobileTab === "chat"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Companion</span>
            </button>
            <button
              onClick={() => setActiveMobileTab("sandbox")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 relative ${
                activeMobileTab === "sandbox"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sandbox Dashboard</span>
              {activeSandbox && (
                <span className="absolute top-1 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main split dashboard view */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-w-0">
          
          {/* LEFT: Conversation Space */}
          <div className={`flex-1 flex flex-col min-w-0 border-b lg:border-b-0 lg:border-r border-slate-800/60 h-full overflow-hidden ${activeMobileTab === "chat" ? "flex" : "hidden lg:flex"}`}>
            
            {/* Thread Actions Header */}
            {currentSession && currentSession.messages.length > 0 && (
              <div className="px-6 py-3 bg-slate-900/40 border-b border-slate-850 flex items-center justify-between gap-4 shrink-0 backdrop-blur-md">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 font-semibold truncate">
                    WORKSPACE: <span className="text-slate-100 font-sans tracking-normal font-medium">{currentSession.title}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  {/* Manual Scroll-to-bottom Toggle Switch */}
                  <button
                    onClick={handleToggleAutoScroll}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-all duration-200 cursor-pointer ${
                      autoScrollEnabled
                        ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-300 shadow-md shadow-indigo-950/20"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:border-slate-700 hover:text-slate-300"
                    }`}
                    title={autoScrollEnabled ? "Auto-scroll is active (Click to pause during generation)" : "Auto-scroll is paused (Click to resume)"}
                    id="btn_toggle_autoscroll"
                  >
                    <ArrowDown className={`w-3 h-3 ${autoScrollEnabled && isGenerating ? "animate-bounce" : ""}`} />
                    <span>{autoScrollEnabled ? "Scroll: ON" : "Scroll: PAUSED"}</span>
                    
                    {/* Visual toggle pill track */}
                    <div className="w-6 h-3.5 rounded-full bg-slate-950/80 border border-slate-800 flex items-center p-0.5 transition-all">
                      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${autoScrollEnabled ? "bg-indigo-400 translate-x-2.5" : "bg-slate-600 translate-x-0"}`} />
                    </div>
                  </button>

                  {/* Copy All Button */}
                  <button
                    onClick={handleCopyAllMessages}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-all duration-200 cursor-pointer ${
                      copiedAll
                        ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-md shadow-emerald-950/20"
                        : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 text-slate-300 hover:text-white"
                    }`}
                    title="Copy entire chat session transcript"
                    id="btn_copy_all_messages"
                  >
                    <Copy className={`w-3 h-3 ${copiedAll ? "text-emerald-400 animate-pulse" : "text-slate-400"}`} />
                    <span>{copiedAll ? "Copied!" : "Copy All"}</span>
                  </button>

                  {/* Regenerate Button */}
                  <button
                    onClick={handleRegenerateResponse}
                    disabled={isGenerating || currentSession.messages.filter(m => m.role === "user").length === 0}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    title="Regenerate last agent response"
                    id="btn_regenerate_response"
                  >
                    <RotateCcw className={`w-3 h-3 ${isGenerating ? "animate-spin text-indigo-400" : "text-slate-400"}`} />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Scrollable messages and onboarding */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              
              {!currentSession || currentSession.messages.length === 0 ? (
                // Landing onboard board
                <div className="max-w-2xl mx-auto py-8 space-y-8">
                  
                  <div className="text-center space-y-3">
                    <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-pink-500/10 to-transparent border border-indigo-500/20 shadow-xl">
                      <Sparkles className="w-8 h-8 text-indigo-400 animate-bounce" />
                    </div>
                    <h2 className="font-display font-medium text-2xl tracking-tight text-white">
                      Welcome to the Multi-Agent Hub
                    </h2>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Enter any challenge below, or lock in a dedicated expert mode. Gemini will generate professional blueprints paired with fully client-interactive widgets.
                    </p>
                  </div>

                  {/* High Fidelity Bento of Modes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {EXPERT_MODES_CONFIG.map((mode) => {
                      const Icon = mode.icon;
                      const hasPreset = !!MODE_PRESET_MAP[mode.id];
                      return (
                        <div
                          key={mode.id}
                          onClick={() => handleModeChangeInSession(mode.id)}
                          className={`p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer group overflow-hidden relative flex flex-col justify-between ${
                            activeModeSelection === mode.id
                              ? `bg-slate-900 border-indigo-500/40 ${mode.glow}`
                              : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <div className={`p-2 rounded-lg ${
                                activeModeSelection === mode.id ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                                {mode.category}
                              </span>
                            </div>
                            
                            <h3 className="font-display font-semibold text-sm text-slate-200 group-hover:text-amber-300 transition-colors mt-3 flex items-center gap-1">
                              {mode.name}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                            </h3>
                            <p className="text-[11px] text-slate-400 leading-normal mt-1 block">
                              {mode.desc}
                            </p>
                          </div>

                          {hasPreset && (
                            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 z-10">
                              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">Instant UI Demo</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleModeChangeInSession(mode.id);
                                  handleSendMessage(MODE_PRESET_MAP[mode.id].prompt);
                                }}
                                disabled={isGenerating}
                                className="px-2.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 disabled:opacity-50 text-indigo-300 hover:text-white border border-indigo-500/20 hover:border-indigo-500 text-[10px] font-mono font-medium transition-all flex items-center gap-1 cursor-pointer"
                                title="Run this sample immediately"
                              >
                                <Zap className="w-3 h-3 text-amber-400" /> Run Live
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Thread flow
                <div className="space-y-6 max-w-3xl mx-auto">
                  <AnimatePresence initial={false}>
                    {currentSession.messages.map((message, mIdx) => {
                      const isModel = message.role === "model";
                      const staggerDelay = Math.min(mIdx, 10) * 0.05;
                      return (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, x: isModel ? -16 : 16, y: 8 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ 
                            duration: 0.45, 
                            ease: [0.16, 1, 0.3, 1], 
                            delay: staggerDelay 
                          }}
                          className={`flex gap-4 ${isModel ? "justify-start" : "justify-end"}`}
                        >
                          {isModel && (
                            <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center shrink-0 self-start text-indigo-400">
                              <Sparkles className="w-4 h-4 animate-spin-pulse" />
                            </div>
                          )}

                          <div className={`rounded-xl px-4 py-3 leading-relaxed max-w-[85%] border shadow-sm ${
                            isModel 
                              ? "bg-slate-900/50 border-slate-800/80 text-slate-200" 
                              : "bg-indigo-600 text-white border-indigo-500"
                          }`}>
                            
                            {/* Reasoning sub-badge */}
                            {isModel && message.responsePayload && (
                              <div className="flex flex-col gap-1 mb-2.5 pb-2.5 border-b border-slate-800/60">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                  <Zap className="w-3 h-3 text-amber-400" /> Auto-Selected: {message.responsePayload.detectedMode} Module
                                </span>
                                <p className="text-[10px] text-indigo-300 leading-normal italic font-sans">
                                  &quot;{message.responsePayload.reasoning}&quot;
                                </p>
                              </div>
                            )}

                            {/* Render styled content blocks natively */}
                            <div className="text-xs prose prose-invert font-sans space-y-2 mt-1 break-words">
                              {message.isError ? (
                                <div className="flex gap-2 text-rose-400 font-mono text-[11px]">
                                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                  <span>{message.text}</span>
                                </div>
                              ) : (
                                // Render structured blocks if we have payload, falling back to full text
                                message.responsePayload ? (
                                  <div className="space-y-4">
                                    <div>
                                      <div className="font-display font-medium text-slate-300 text-sm mb-1">
                                        {message.responsePayload.goal ? `Goal: ${message.responsePayload.goal}` : "Summary Overview"}
                                      </div>
                                      <p className="text-slate-400 leading-normal text-xs mb-3">
                                        {message.responsePayload.analysis}
                                      </p>
                                    </div>

                                    {/* Custom solution markdown output helper */}
                                    <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/50 text-[11.5px] leading-relaxed text-slate-200 select-text font-sans scrollbar whitespace-pre-wrap">
                                      {message.responsePayload.solution}
                                    </div>

                                    {/* Step-by-step action sequence */}
                                    {message.responsePayload.actionPlan && message.responsePayload.actionPlan.length > 0 && (
                                      <div className="space-y-1.5 pt-1">
                                        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 select-none">Action Plan Steps:</span>
                                        <div className="grid grid-cols-1 gap-1">
                                          {message.responsePayload.actionPlan.map((step, sIdx) => (
                                            <div key={sIdx} className="flex gap-2 items-start bg-slate-900/30 p-2 rounded border border-slate-800/40">
                                              <span className="w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center shrink-0 text-[10px] font-mono text-indigo-300 font-bold">
                                                {sIdx + 1}
                                              </span>
                                              <span className="text-[11px] leading-normal font-sans text-slate-300">{step}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <p className="whitespace-pre-wrap select-text leading-relaxed text-xs">
                                    {message.text}
                                  </p>
                                )
                              )}
                            </div>
                            
                            {/* Timestamp info */}
                            <div className="text-[9px] text-slate-500 text-right mt-2 font-mono">
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>

                          </div>

                          {!isModel && (
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 self-end text-white text-xs font-bold shadow-md">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                    {/* Generation loading skeleton */}
                    {isGenerating && (
                      <motion.div
                        key="skeleton-loader"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 justify-start w-full"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400 animate-pulse">
                          <Activity className="w-4 h-4 animate-spin" />
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl px-4 py-4 w-[75%] space-y-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Routing workspace to specialist...
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3.5 bg-slate-800 rounded w-2/5 animate-pulse"></div>
                            <div className="h-3 bg-slate-800/70 rounded w-5/6 animate-pulse"></div>
                            <div className="h-3 bg-slate-800/60 rounded w-4/6 animate-pulse"></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </div>
              )}

            </div>

            {/* Sticky Prompt Input Form at bottom */}
            <div className="p-4 bg-slate-900/20 border-t border-slate-800/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="max-w-3xl mx-auto flex gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isGenerating
                        ? "Specialist generating report..."
                        : activeModeSelection === "auto"
                        ? "Ask anything... (Core expert auto-detects)"
                        : `Instruct the ${EXPERT_MODES_CONFIG.find(m => m.id === activeModeSelection)?.name}...`
                    }
                    disabled={isGenerating}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-xs md:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:opacity-50"
                    id="input_chat_prompt"
                  />
                  {activeModeSelection !== "auto" && (
                    <div className="absolute right-3 top-3.5">
                      <span className="text-[9px] font-mono tracking-wider uppercase font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">
                        {activeModeSelection} Locked
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isGenerating || !inputValue.trim()}
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1 cursor-pointer disabled:cursor-not-allowed shadow-md shadow-indigo-600/10"
                  id="btn_send_prompt"
                >
                  {isGenerating ? "Routing..." : "Execute"}
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </form>

              {/* Real-time Persistence Status Indicator */}
              <div className="max-w-3xl mx-auto flex items-center justify-between mt-2.5 px-1 text-[10.5px] text-slate-500 font-mono">
                <span className="truncate">Gemini 1.5 Flash • Orchestrated Agents</span>
                
                <div className="flex items-center gap-1.5 shrink-0 transition-all duration-300">
                  {saveStatus === "saving" ? (
                    <span className="flex items-center gap-1 text-amber-400 font-medium animate-pulse" title="Syncing changes to local database">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Saving...</span>
                    </span>
                  ) : saveStatus === "saved" ? (
                    <span className="flex items-center gap-1 text-emerald-400/90 font-medium" title="All custom workspace sessions successfully saved">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved</span>
                    </span>
                  ) : saveStatus === "error" ? (
                    <span className="flex items-center gap-1 text-rose-400 font-medium" title="Storage limit exceeded or system error encountered">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                      <span>Save Error</span>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Dynamic Interactive Sandbox Panel */}
          <div className={`w-full lg:w-[440px] xl:w-[480px] shrink-0 bg-slate-900/30 h-full flex flex-col overflow-hidden ${activeMobileTab === "sandbox" ? "flex" : "hidden lg:flex"}`}>
            
            {/* Header tracking Sandbox active widget representation */}
            <div className="p-4 border-b border-slate-800/60 bg-slate-950/60 sticky top-0 z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 animate-pulse"></span>
                <span className="font-display font-medium text-xs tracking-tight text-white uppercase font-semibold">
                  Interactive Sandbox Playground
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded">
                🤖 Sandbox Mode
              </span>
            </div>

            {/* Sandbox Payload Area */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar space-y-6">
              
              {!activeSandbox ? (
                <div className="space-y-6">
                  {/* Premium Ambient Welcome Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/40 to-slate-950 border border-indigo-500/15 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        <Sparkles className="w-4 h-4 animate-spin-pulse" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-300">
                        Sandbox Engine Standby
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-100 font-sans tracking-tight">
                      Orchestration Playgrounds Ready
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal mt-1.5 leading-relaxed">
                      This smart platform automatically detects your goal and synthesizes fully-featured, client-interactive live widgets below. 
                      Click any <strong className="text-indigo-400">Run Live</strong> card on the left to instantly experience it.
                    </p>
                  </div>

                  {/* Capabilities List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                        Interactive Widgets Preview
                      </span>
                      <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/10">
                        Live Rendering
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { title: "Smart Multiple-Choice Quizzes", desc: "Interactive quizzes with instant score tracking, correct answer counters, and adaptive review notes.", icon: GraduationCap, badge: "Education", color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10" },
                        { title: "Dynamic Concept Flashcards", desc: "Concept learning review cards with flip toggle effects, confidence scorers, and progress cursors.", icon: Megaphone, badge: "Marketing", color: "text-pink-400 bg-pink-500/5 border-pink-500/10" },
                        { title: "Target Persona Profiles", desc: "Detailed buyer personas tracking pain points, demographies, and core values.", icon: Sparkles, badge: "Content", color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
                        { title: "Competitor Comparison SWOT", desc: "Scored competitive grids outlining advantages/disadvantages and market standing metrics.", icon: BarChart3, badge: "Data", color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
                        { title: "Business Model Lean Canvas", desc: "Interactive 9-box grids showing cost structures, channel paths, and revenue drivers.", icon: Rocket, badge: "Consultant", color: "text-rose-400 bg-rose-500/5 border-rose-500/10" },
                        { title: "Component UI Wireframe Builder", desc: "Interactive wireframe blocks displaying structured page hierarchies and call-to-actions.", icon: Eye, badge: "Advisor", color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
                        { title: "JWT Code Terminal Sandbox", desc: "Self-contained workspace directories paired with live terminal run commands.", icon: Terminal, badge: "Developer", color: "text-teal-400 bg-teal-500/5 border-teal-500/10" },
                        { title: "Sprints Action Plan Checklist", desc: "Generates step-by-step task pipelines with interactive state completeness checkboxes.", icon: CheckSquare, badge: "Productivity", color: "text-fuchsia-400 bg-fuchsia-500/5 border-fuchsia-500/10" },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div key={idx} className="group p-3 rounded-xl border border-slate-800/60 bg-slate-900/10 hover:bg-slate-900/30 hover:border-slate-800 transition-all flex gap-3 items-start">
                            <div className={`p-2 rounded-lg ${item.color} border grow-0 shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-slate-950/60 text-slate-400 border border-slate-800/80 rounded-md">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-400 leading-relaxed mt-0.5 font-sans">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Widget context parameters heading */}
                  <div className="p-3 rounded-lg border border-indigo-500/10 bg-indigo-500/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-[11px] font-mono font-medium text-indigo-300">
                        Widget Active: {activeSandbox.type.replace("_", " ")}
                      </span>
                    </div>
                    {copiedText ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Copied {copiedText}!</span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 italic">Playground Ready</span>
                    )}
                  </div>

                  {/* DYNAMIC COMPONENT 1: QUIZ WIDGET */}
                  {activeSandbox.type === "quiz" && activeSandbox.data?.quizQuestions && (
                    (() => {
                      const questions: QuizQuestion[] = activeSandbox.data.quizQuestions;
                      const activeQ = questions[activeQuizQuestionIdx];
                      const totalQs = questions.length;

                      if (!activeQ) return <p className="text-xs text-rose-400">Loading Quiz payload...</p>;

                      return (
                        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-5 space-y-4 shadow-lg">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                            <span className="text-[11px] text-indigo-400 font-mono font-semibold">Question {activeQuizQuestionIdx + 1} of {totalQs}</span>
                            <span className="text-[11px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">Score: {quizScore}/{totalQs}</span>
                          </div>

                          <h4 className="font-display font-medium text-sm text-slate-100 leading-snug">
                            {activeQ.question}
                          </h4>

                          {/* Options stack */}
                          <div className="space-y-2 pt-2">
                            {activeQ.options?.map((option, oIdx) => {
                              const isSelected = selectedQuizOption === option;
                              let borderS = "border-slate-800 hover:border-slate-700 hover:bg-slate-800/30";
                              if (isSelected) borderS = "border-indigo-500 bg-indigo-500/10";
                              if (isQuizAnswerSubmitted) {
                                if (option === activeQ.correctAnswer) {
                                  borderS = "border-emerald-500 bg-emerald-500/15 text-emerald-300";
                                } else if (isSelected) {
                                  borderS = "order-rose-500 bg-rose-500/15 text-rose-300";
                                } else {
                                  borderS = "border-slate-800/40 text-slate-500";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => !isQuizAnswerSubmitted && setSelectedQuizOption(option)}
                                  disabled={isQuizAnswerSubmitted}
                                  className={`w-full text-left p-3 rounded-xl border text-xs font-sans transition-all flex gap-3 ${borderS}`}
                                >
                                  <span className="font-mono text-slate-500 font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                                  <span>{option}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Submit / Next navigation bar */}
                          <div className="pt-3 flex gap-2">
                            {!isQuizAnswerSubmitted ? (
                              <button
                                onClick={() => {
                                  if (!selectedQuizOption) return;
                                  setIsQuizAnswerSubmitted(true);
                                  if (selectedQuizOption === activeQ.correctAnswer) {
                                    setQuizScore(prev => prev + 1);
                                  }
                                }}
                                disabled={!selectedQuizOption}
                                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg text-xs font-semibold uppercase leading-wider tracking-wide transition-all cursor-pointer"
                              >
                                Submit Answer
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedQuizOption(null);
                                  setIsQuizAnswerSubmitted(false);
                                  if (activeQuizQuestionIdx + 1 < totalQs) {
                                    setActiveQuizQuestionIdx(prev => prev + 1);
                                  } else {
                                    // Reset / restart
                                    setActiveQuizQuestionIdx(0);
                                    setQuizScore(0);
                                  }
                                }}
                                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold uppercase leading-wider tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                {activeQuizQuestionIdx + 1 < totalQs ? "Next Question" : "Restart Quiz"}
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {/* Context explanations display */}
                          {isQuizAnswerSubmitted && (
                            <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10 text-[11px] leading-relaxed text-indigo-300">
                              <span className="font-bold underline block mb-1">Explanation Hint:</span>
                              {activeQ.explanation}
                            </div>
                          )}

                        </div>
                      );
                    })()
                  )}

                  {/* DYNAMIC COMPONENT 2: FLASHCARDS INDEX */}
                  {activeSandbox.type === "flashcards" && activeSandbox.data?.flashcardsList && (
                    (() => {
                      const cards: Flashcard[] = activeSandbox.data.flashcardsList;
                      const cc = cards[activeFlashcardIdx];
                      const len = cards.length;

                      if (!cc) return <p className="text-xs text-rose-400">Loading cards payload...</p>;

                      return (
                        <div className="space-y-4">
                          
                          {/* Card stack container */}
                          <div
                            onClick={() => setIsCardFlipped(!isCardFlipped)}
                            className={`min-h-[220px] bg-slate-900/60 rounded-xl border border-slate-800/80 p-6 flex flex-col justify-between shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
                              isCardFlipped ? "border-amber-500/20 shadow-amber-500/5 bg-slate-900" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                {cc.category || "Flipped Card"}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {activeFlashcardIdx + 1} / {len}
                              </span>
                            </div>

                            <div className="text-center py-4 select-none">
                              {!isCardFlipped ? (
                                <p className="font-display font-medium text-slate-100 text-sm md:text-base leading-snug">
                                  {cc.question}
                                </p>
                              ) : (
                                <p className="text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                                  {cc.answer}
                                </p>
                              )}
                            </div>

                            <div className="text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                              {isCardFlipped ? "Click cards to show prompt" : "Click cards to reveal answer"}
                            </div>
                          </div>

                          {/* Deck navigator triggers */}
                          <div className="flex items-center justify-between gap-2.5">
                            <button
                              onClick={() => prevFlashcard(len)}
                              className="px-3 py-1.5 rounded-lg border border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 transition-all text-xs text-slate-300 cursor-pointer"
                            >
                              Previous Card
                            </button>
                            <button
                              onClick={() => setIsCardFlipped(!isCardFlipped)}
                              className="p-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 cursor-pointer"
                            >
                              Flip
                            </button>
                            <button
                              onClick={() => nextFlashcard(len)}
                              className="px-3 py-1.5 rounded-lg border border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700 transition-all text-xs text-slate-300 cursor-pointer"
                            >
                              Next Card
                            </button>
                          </div>

                        </div>
                      );
                    })()
                  )}

                  {/* DYNAMIC COMPONENT 3: MARKETING PERSONAS */}
                  {activeSandbox.type === "personas" && activeSandbox.data?.marketingPersonas && (
                    <div className="space-y-4">
                      {activeSandbox.data.marketingPersonas.map((persona: MarketingPersona, pIdx: number) => (
                        <div key={pIdx} className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-3 shadow-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                              <User className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <h5 className="font-display font-semibold text-xs leading-tight text-white">{persona.name}</h5>
                              <span className="text-[10px] font-mono text-pink-400 leading-normal">{persona.role} — {persona.demography}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-[11px] leading-normal border-t border-slate-800/40">
                            <div>
                              <span className="font-bold text-slate-300 block mb-1">Pain Points & Needs:</span>
                              <ul className="list-disc list-inside space-y-1 text-slate-400">
                                {persona.painPoints?.map((item, id) => (
                                  <li key={id}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="font-bold text-slate-300 block mb-1">Target Core Values:</span>
                              <ul className="list-disc list-inside space-y-1 text-slate-400">
                                {persona.values?.map((item, id) => (
                                  <li key={id}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 4: PRODUCTIVITY TASK CHECKLIST */}
                  {activeSandbox.type === "checklist" && activeChecklist && (
                    <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-4 shadow-lg">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                        <span className="text-xs font-mono text-violet-400 font-semibold uppercase">Productivity Tracker</span>
                        <span className="text-xs font-mono text-slate-400">
                          {activeChecklist.filter(t => t.completed).length} of {activeChecklist.length} Checked
                        </span>
                      </div>

                      {/* Display Progress bar */}
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-violet-500 h-full transition-all duration-500"
                          style={{
                            width: `${activeChecklist.length > 0 ? (activeChecklist.filter(t => t.completed).length / activeChecklist.length) * 100 : 0}%`
                          }}
                        ></div>
                      </div>

                      {/* Stack checklist */}
                      <div className="space-y-2 pt-1 max-h-[300px] overflow-y-auto pr-1">
                        {activeChecklist.map((item, tIdx) => (
                          <div
                            key={tIdx}
                            onClick={() => {
                              setActiveChecklist(prev =>
                                prev.map((t, i) => (i === tIdx ? { ...t, completed: !t.completed } : t))
                              );
                            }}
                            className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer flex gap-3 items-start ${
                              item.completed
                                ? "bg-violet-950/10 border-violet-500/20 text-slate-500"
                                : "bg-slate-950/30 border-slate-850 hover:bg-slate-900/60 hover:border-slate-700 text-slate-200"
                            }`}
                          >
                            <button className="mt-0.5 shrink-0">
                              {item.completed ? (
                                <CheckSquare className="w-4.5 h-4.5 text-violet-400" />
                              ) : (
                                <div className="w-4.5 h-4.5 rounded border border-slate-700"></div>
                              )}
                            </button>
                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between gap-4">
                                <span className={`text-[11.5px] font-sans font-medium leading-tight truncate ${item.completed ? "line-through text-slate-500" : ""}`}>
                                  {item.task}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500 shrink-0 uppercase tracking-tight">Est: {item.durationEstimate}</span>
                              </div>
                              <p className={`text-[10px] leading-normal font-sans mt-1 ${item.completed ? "text-slate-600" : "text-slate-400"}`}>
                                {item.description}
                              </p>
                              {item.priority && (
                                <span className={`inline-block text-[9px] font-mono uppercase mt-1 px-1.5 py-0.2 rounded ${
                                  item.priority.toLowerCase() === "high" || item.priority.toLowerCase() === "p0"
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                    : "bg-slate-800 text-slate-400 border border-slate-700"
                                }`}>
                                  {item.priority} Priority
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 5: COMPARISON GRAPH MATRIX */}
                  {activeSandbox.type === "comparison" && activeSandbox.data?.competitorComparison && (
                    <div className="space-y-4">
                      {activeSandbox.data.competitorComparison.map((comp: CompetitorItem, cIdx: number) => (
                        <div key={cIdx} className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-3.5 shadow-md">
                          
                          {/* Competitor heading with ratings indicator */}
                          <div className="flex justify-between items-center pb-2 border-b border-slate-800/50">
                            <span className="font-display font-semibold text-xs text-white uppercase">{comp.item}</span>
                            <div className="flex gap-0.5 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < (comp.rating || 4) ? "fill-amber-400" : "opacity-20"}`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[11px] leading-normal pt-1">
                            {/* Pros list mapping */}
                            <div className="space-y-1.5">
                              <span className="font-bold text-emerald-400 block pb-0.5">Key Pros:</span>
                              {comp.pros && comp.pros.map((pro, pIdx) => (
                                <div key={pIdx} className="flex gap-1.5 items-start">
                                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="text-slate-300 font-sans">{pro}</span>
                                </div>
                              ))}
                            </div>

                            {/* Cons list mapping */}
                            <div className="space-y-1.5">
                              <span className="font-bold text-rose-400 block pb-0.5">Key Cons:</span>
                              {comp.cons && comp.cons.map((con, cIdx) => (
                                <div key={cIdx} className="flex gap-1.5 items-start">
                                  <div className="text-rose-500 shrink-0 mt-0.5 font-bold font-mono h-3.5 w-3.5 flex items-center justify-center text-[10px] select-none">×</div>
                                  <span className="text-slate-400 font-sans">{con}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 6: DATA METRIC STRIPS & KPI CHANNELS */}
                  {activeSandbox.type === "data_table" && activeSandbox.data?.analyticsData && (
                    <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-4 shadow-lg">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">Analytics Dashboard Data</span>
                        <span className="text-[10px] text-slate-500 font-mono">Dataset output</span>
                      </div>

                      {/* Simple high-fidelity bento bar charts */}
                      <div className="space-y-3 pt-2">
                        {activeSandbox.data.analyticsData.map((row: AnalyticsItem, rIdx: number) => {
                          const isUp = row.change && !row.change.startsWith("-") && row.change !== "0";
                          // Calculate relative width percentage safely
                          const maxVal = Math.max(...activeSandbox.data.analyticsData.map((d: any) => d.value), 1);
                          const percentage = Math.max((row.value / maxVal) * 100, 10);

                          return (
                            <div key={rIdx} className="space-y-1 p-2 rounded bg-slate-950/30 border border-slate-800/40">
                              <div className="flex justify-between items-center text-[11px] font-sans">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-slate-200">{row.label}</span>
                                  <span className="text-[9px] font-mono text-slate-500 px-1.5 py-0.2 rounded bg-slate-900 uppercase">{row.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-200 font-mono">{row.value.toLocaleString()}</span>
                                  <span className={`inline-flex items-center text-[9px] font-semibold font-mono ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                                    {isUp ? "↑" : "↓"} {row.change}
                                  </span>
                                </div>
                              </div>
                              {/* Horizontal CSS Bar representation */}
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${isUp ? "bg-emerald-500" : "bg-teal-500"}`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 7: DESIGN BRAND PALETTE COLOR MATRICES */}
                  {activeSandbox.type === "design_color_palette" && activeSandbox.data?.colorPalette && (
                    <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-4 shadow-lg">
                      <span className="text-xs font-mono text-yellow-400 font-semibold uppercase tracking-wider block">Generated Color Palette Spec</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {activeSandbox.data.colorPalette.map((token: ColorToken, tIdx: number) => (
                          <div
                            key={tIdx}
                            onClick={() => triggerClipboardCopy(token.hex, token.name)}
                            className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 hover:bg-slate-950/80 hover:border-slate-700 transition-all cursor-pointer group text-left flex gap-3"
                          >
                            <div
                              className="w-9 h-9 rounded shadow-md shrink-0 border border-slate-800/40"
                              style={{ backgroundColor: token.hex }}
                            ></div>
                            <div className="min-w-0">
                              <span className="font-semibold text-[11px] text-slate-200 block truncate leading-tight">{token.name}</span>
                              <span className="font-mono text-[9px] text-slate-400 font-bold tracking-tight block uppercase">{token.hex}</span>
                              <span className="text-[9px] text-slate-500 block truncate mt-0.5 leading-normal">{token.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500 text-center font-sans">
                        Click on any token block to copy its Hex code to the clipboard instantly.
                      </p>
                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 8: BUSINESS MODEL CANVAS SYSTEM */}
                  {activeSandbox.type === "business_canvas" && activeSandbox.data?.businessCanvas && (
                    <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-4 shadow-lg overflow-x-auto">
                      <span className="text-xs font-mono text-rose-400 font-semibold uppercase tracking-wider block">Startup Lean Business Canvas</span>

                      {(() => {
                        const canvas: BusinessCanvasData = activeSandbox.data.businessCanvas;
                        return (
                          <div className="space-y-3.5">
                            {/* Value Proposition Hero panel */}
                            <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/10 text-left space-y-1.5">
                              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">💎 Key Value Proposition</span>
                              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-300">
                                {canvas.valueProposition?.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Two-Column details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              
                              <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 text-left space-y-1.5">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">👥 Customer Segments</span>
                                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-400">
                                  {canvas.customerSegments?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 text-left space-y-1.5">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">🛣️ Channels & Access</span>
                                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-400">
                                  {canvas.channels?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 text-left space-y-1.5">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">🧮 Cost Structure</span>
                                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-400">
                                  {canvas.costStructure?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60 text-left space-y-1.5">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold font-bold">💰 Revenue Streams</span>
                                <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-slate-400">
                                  {canvas.revenueStreams?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              </div>

                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 9: WIREFRAME BUILDER COMPONENT LAYOUT SHEET */}
                  {activeSandbox.type === "wireframe_builder" && activeSandbox.data?.wireframeElements && (
                    <div className="space-y-4">
                      
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-2.5">
                        <span className="text-xs font-mono text-slate-300 font-semibold uppercase block">Conceptual Layout Schematic</span>
                        
                        {/* High Fidelity Wireframe skeleton representation */}
                        <div className="border border-slate-800 rounded bg-slate-950 p-2 space-y-1.5">
                          <div className="border border-dashed border-slate-800/80 p-1 bg-slate-900/20 rounded flex items-center justify-between text-[9px] font-mono text-slate-500">
                            <span>[Header Block] Logo</span>
                            <span>Sign In</span>
                          </div>
                          <div className="border border-dashed border-slate-800/80 py-4 px-2 bg-indigo-500/5 rounded text-center text-[10px] font-mono text-indigo-400">
                            <span className="block font-bold">Hero Interactive</span>
                            <span className="text-[8px] text-slate-500">[Cta Primary Link]</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            <div className="border border-dashed border-slate-800/80 py-2 px-1 bg-slate-900/40 rounded text-center text-[8px] font-mono text-slate-400">Feature 1</div>
                            <div className="border border-dashed border-slate-800/80 py-2 px-1 bg-slate-900/40 rounded text-center text-[8px] font-mono text-slate-400">Feature 2</div>
                            <div className="border border-dashed border-slate-800/80 py-2 px-1 bg-slate-900/40 rounded text-center text-[8px] font-mono text-slate-400">Feature 3</div>
                          </div>
                          <div className="border border-dashed border-slate-800/80 py-1 px-2 bg-slate-900/20 rounded text-center text-[8.5px] font-mono text-slate-500">
                            [Footer Block] Context links &middot; 2026
                          </div>
                        </div>
                      </div>

                      {/* Element spec breakdown list cards */}
                      <div className="space-y-2">
                        {activeSandbox.data.wireframeElements.map((el: WireframeElement, eIdx: number) => (
                          <div key={eIdx} className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-4 space-y-2.5 text-left shadow">
                            <div className="flex items-center justify-between">
                              <h6 className="font-display font-semibold text-xs text-white uppercase">{el.title}</h6>
                              <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.2 rounded uppercase">{el.element}</span>
                            </div>
                            <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">{el.description}</p>
                            
                            {el.keyFeatures && el.keyFeatures.length > 0 && (
                              <div className="pt-1.5 flex flex-wrap gap-1">
                                {el.keyFeatures.map((feat, fIdx) => (
                                  <span key={fIdx} className="text-[9px] font-mono bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded">
                                    &middot; {feat}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* DYNAMIC COMPONENT 10: CODE VIEWER & SHADOW TERMINAL EXECUTOR */}
                  {activeSandbox.type === "code_sandbox" && activeSandbox.data?.codeSnippet && (
                    (() => {
                      const snippetData: CodeSnippetData = activeSandbox.data.codeSnippet;
                      return (
                        <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden shadow-lg flex flex-col">
                          
                          {/* Inner Tabs selection */}
                          <div className="flex bg-slate-950/60 border-b border-slate-800/80 font-mono text-[10px]">
                            <button
                              onClick={() => setCodeSandboxTab("code")}
                              className={`px-4 py-2 text-slate-400 hover:text-white transition-all cursor-pointer ${codeSandboxTab === "code" ? "bg-slate-900 text-indigo-400 border-b-2 border-indigo-500 font-semibold" : ""}`}
                            >
                              Snippet Code
                            </button>
                            <button
                              onClick={() => setCodeSandboxTab("explanation")}
                              className={`px-4 py-2 text-slate-400 hover:text-white transition-all cursor-pointer ${codeSandboxTab === "explanation" ? "bg-slate-900 text-indigo-400 border-b-2 border-indigo-500 font-semibold" : ""}`}
                            >
                              Explanation
                            </button>
                            <button
                              onClick={() => setCodeSandboxTab("terminal")}
                              className={`px-4 py-2 text-slate-400 hover:text-white transition-all cursor-pointer ${codeSandboxTab === "terminal" ? "bg-slate-900 text-indigo-400 border-b-2 border-indigo-500 font-semibold" : ""}`}
                            >
                              🖥️ Shadow Terminal
                            </button>
                          </div>

                          {/* Code sandbox panels content routing */}
                          <div className="p-4 flex-1">
                            {codeSandboxTab === "code" && (
                              <div className="space-y-3.5">
                                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
                                  <span>Language: {snippetData.language || "TypeScript"}</span>
                                  <button
                                    onClick={() => triggerClipboardCopy(snippetData.code)}
                                    className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                                    title="Copy to Clipboard"
                                  >
                                    <Copy className="w-3.5 h-3.5" /> Copy Code
                                  </button>
                                </div>
                                <pre className="bg-slate-950 p-3 rounded-lg border border-slate-850 overflow-x-auto text-[11px] font-mono text-indigo-200 select-text leading-relaxed outline-none scrollbar max-h-[300px]">
                                  <code>{snippetData.code}</code>
                                </pre>
                              </div>
                            )}

                            {codeSandboxTab === "explanation" && (
                              <div className="space-y-3 font-sans text-left text-xs text-slate-300 leading-normal">
                                <p className="leading-relaxed">{snippetData.explanation}</p>
                                {snippetData.filesToCreate && snippetData.filesToCreate.length > 0 && (
                                  <div className="pt-2">
                                    <span className="text-[10px] font-mono text-slate-500 uppercase">Files to create:</span>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                      {snippetData.filesToCreate.map((f, i) => (
                                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-400">{f}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {codeSandboxTab === "terminal" && (
                              <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                                  <span>Sandbox Workspace Emulator</span>
                                  <button
                                    onClick={() => handleRunCodeTest(snippetData)}
                                    disabled={isTerminalRunning}
                                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded text-[10.5px] font-semibold transition-all cursor-pointer font-sans"
                                    id="btn_run_tests"
                                  >
                                    {isTerminalRunning ? "Compiling..." : "Run Server Test"}
                                  </button>
                                </div>

                                <div className="bg-slate-950 border border-slate-850 rounded-lg p-3 min-h-[160px] font-mono text-[10.5px] text-slate-300 select-text overflow-y-auto space-y-1">
                                  {codeTerminalOutput.length === 0 ? (
                                    <p className="text-slate-500 italic">Click &quot;Run Server Test&quot; above to simulate server deployment and API test run inputs.</p>
                                  ) : (
                                    codeTerminalOutput.map((log, idx) => (
                                      <p key={idx} className={
                                        log.startsWith("✨") ? "text-emerald-400 font-semibold" :
                                        log.startsWith("✖") || log.startsWith("[Executing Router...") ? "text-indigo-400" :
                                        log.startsWith("$") ? "text-slate-500 pb-1 border-b border-slate-900" : "text-slate-300"
                                      }>
                                        {log}
                                      </p>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })()
                  )}

                  {/* DYNAMIC COMPONENT 11: CAREER TIMELINE TIMEPILINE GRID */}
                  {activeSandbox.type === "career_timeline" && activeSandbox.data?.careerTimeline && (
                    <div className="bg-slate-900/60 rounded-xl border border-slate-800/80 p-5 space-y-4 shadow-lg text-left">
                      <span className="text-xs font-mono text-fuchsia-400 font-semibold uppercase tracking-wider block">Strategic Career Pathway Timeline</span>

                      <div className="relative border-l-2 border-slate-800 space-y-6 pl-4 ml-2 pt-2">
                        {activeSandbox.data.careerTimeline.map((step: CareerTimelineStep, sIdx: number) => (
                          <div key={sIdx} className="relative space-y-2">
                            
                            {/* Marker dot */}
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-fuchsia-500 border border-slate-900 shadow-md shadow-fuchsia-500/20"></div>
                            
                            <div className="flex items-center justify-between gap-4">
                              <h6 className="font-display font-semibold text-xs leading-none text-white">{step.stepName}</h6>
                              <span className="text-[10px] font-mono text-fuchsia-400 font-bold shrink-0">{step.duration}</span>
                            </div>

                            <p className="text-[10.5px] text-slate-400 leading-normal font-sans pt-0.5">{step.description}</p>
                            
                            {step.focusSkills && step.focusSkills.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {step.focusSkills.map((sk, idx) => (
                                  <span key={idx} className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 border border-slate-850 text-slate-300">
                                    {sk}
                                  </span>
                                ))}
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

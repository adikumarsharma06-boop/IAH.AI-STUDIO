import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client with correct User-Agent for telemetry
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// JSON Schema definition for robust Agentic mode outputs
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    detectedMode: {
      type: Type.STRING,
      description: "One of the modes. Must be exactly: 'Education', 'Marketing', 'Content Creation', 'Data Analysis', 'Research', 'Productivity', 'Startup Advisor', 'AI Business Consultant', 'AI Career Coach', 'AI Coding Assistant', 'AI Designer'"
    },
    reasoning: {
      type: Type.STRING,
      description: "Short synthesis explaining why this expert mode was chosen for the query."
    },
    goal: {
      type: Type.STRING,
      description: "Concise summary of the user's objective."
    },
    analysis: {
      type: Type.STRING,
      description: "Brief expert level assessment of the request."
    },
    solution: {
      type: Type.STRING,
      description: "Comprehensive advice or detailed response content in Markdown syntax."
    },
    actionPlan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step action plan to accomplish the goal."
    },
    recommendedTools: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key tools, platforms, or resources ideal for this task."
    },
    nextSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Immediate next actions to take."
    },
    interactiveType: {
      type: Type.STRING,
      description: "Type of interactive widget to show. Choose the best matching type: 'quiz', 'flashcards', 'personas', 'checklist', 'comparison', 'data_table', 'business_canvas', 'design_color_palette', 'wireframe_builder', 'code_sandbox', 'career_timeline'"
    },
    interactivePayload: {
      type: Type.OBJECT,
      description: "Custom payload matching the generated interactiveType.",
      properties: {
        quizQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            }
          }
        },
        flashcardsList: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING },
              category: { type: Type.STRING }
            }
          }
        },
        marketingPersonas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              demography: { type: Type.STRING },
              painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              values: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        },
        productivityTasks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              task: { type: Type.STRING },
              durationEstimate: { type: Type.STRING },
              priority: { type: Type.STRING },
              description: { type: Type.STRING }
            }
          }
        },
        competitorComparison: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              rating: { type: Type.NUMBER }
            }
          }
        },
        analyticsData: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING },
              category: { type: Type.STRING },
              value: { type: Type.NUMBER },
              change: { type: Type.STRING }
            }
          }
        },
        businessCanvas: {
          type: Type.OBJECT,
          properties: {
            valueProposition: { type: Type.ARRAY, items: { type: Type.STRING } },
            customerSegments: { type: Type.ARRAY, items: { type: Type.STRING } },
            costStructure: { type: Type.ARRAY, items: { type: Type.STRING } },
            revenueStreams: { type: Type.ARRAY, items: { type: Type.STRING } },
            channels: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        colorPalette: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              hex: { type: Type.STRING },
              role: { type: Type.STRING }
            }
          }
        },
        wireframeElements: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              element: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING},
              keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        },
        codeSnippet: {
          type: Type.OBJECT,
          properties: {
            language: { type: Type.STRING },
            code: { type: Type.STRING },
            explanation: { type: Type.STRING },
            filesToCreate: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        },
        careerTimeline: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              stepName: { type: Type.STRING },
              duration: { type: Type.STRING },
              focusSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING }
            }
          }
        }
      }
    }
  },
  required: [
    "detectedMode",
    "reasoning",
    "goal",
    "analysis",
    "solution",
    "actionPlan",
    "recommendedTools",
    "nextSteps",
    "interactiveType",
    "interactivePayload"
  ]
};

// Main API generation endpoint proxying requests to Gemini safely
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, mode, history, userAccount } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not defined in backend environments. Please set it in Settings > Secrets."
      });
    }

    // Build rich instructions using official IAH.AI MASTER BRAIN SYSTEM
    const systemInstruction = `# IAH.AI MASTER BRAIN SYSTEM

You are IAH.AI, an advanced AI Workspace Platform designed to help users learn, create, research, analyze, build, solve problems, and achieve goals.

Your mission is not simply to answer questions. Your mission is to understand the user's goal, think like multiple experts, and provide the best possible solution.

## CORE IDENTITY

You are a combination of:
* AI Chat Assistant
* AI Search Engine
* AI Research Agent
* AI Data Analyst
* AI Marketing Agent
* AI Content Creator
* AI Coding Agent
* AI Business Consultant
* AI Startup Advisor
* AI Productivity Manager
* AI Presentation Maker
* AI Spreadsheet Analyzer
* AI Learning Tutor

You are friendly like a helpful friend, intelligent like a professional consultant, creative like a content creator, analytical like a data scientist, and practical like a business advisor.
Never sound robotic.
Always explain things clearly using simple language that anyone can understand.
Use examples, comparisons, stories, and step-by-step guidance whenever helpful.

## CRITICAL RESPONSE DIRECTIVES for SPEED & SIMPLICITY:

1. **MAXIMUM RESPONSE SPEED (OPTIMIZED FOR HIGH VELOCITY)**:
   * Generate highly dense, value-packed answers.
   * Avoid any greeting fluff, introductory preambles (e.g., "Certainly, here is...", "As an AI, I..."), and lengthy wrap-up summaries. 
   * Dive straight into the core answer. This guarantees a extremely fast and direct reply under high performance standards.

2. **CRYSTAL-CLEAR & ULTRA-SIMPLE VOCABULARY**:
   * Use extremely normal, easy-to-understand, everyday words that a high-school student or friendly peer can immediately grasp.
   * Strictly avoid elite academic jargon, heavy technical terms, or dense corporate buzzwords.
   * If you must mention a complex word/concept, immediately pair it with a simple real-world analogy (e.g., "Think of a database like a library catalog...").

3. **EASY EXPLANATIONS**:
   * Explain "the why" and "the how" in a straightforward step-by-step breakdown.
   * Make your answers beautifully scannable: use short, punchy paragraphs (maximum 2-3 sentences), simple bullet lists, and bold key terms so reading becomes completely effortless.

## MASTER THINKING PROCESS
Before every response:
Step 1: Understand what the user actually wants.
Step 2: Identify which expert roles are needed.
Step 3: Combine multiple experts if necessary.
Step 4: Create the most useful answer.
Step 5: Provide actionable next steps.

Never provide shallow answers. Always think deeply.
Always focus on helping the user achieve a real result.

---
## EXPERT ROLES DIRECTIVES & CAPABILITIES

1. AI CHAT ASSISTANT
Purpose: General conversations and problem solving.
Capabilities: Answer questions, explain concepts, brainstorm, solve problems, hold natural conversations.

2. AI SEARCH ENGINE
Purpose: Find and organize information.
Capabilities: Search topics, compare options, summarize, discover trends, find resources.
Output Focus: Key findings, advantages, disadvantages, recommendations.

3. AI RESEARCH AGENT
Purpose: Perform deep research.
Capabilities: Industry, market, competitor, trend, product, or academic research.
Output Focus: Summary, findings, opportunities, risks, recommendations.

4. AI DATA ANALYST
Purpose: Understand and analyze data.
Capabilities: Analyze spreadsheets, CSVs, reports; identify trends/patterns; forecast; create insights.
Output Focus: Key metrics, insights, opportunities, problems, recommendations.

5. AI MARKETING AGENT
Purpose: Grow brands and businesses.
Capabilities: Marketing strategy, SEO, social media, content marketing, email marketing, audience analysis, branding.
Output Focus: Marketing plan, content calendar, campaign ideas, growth strategy.

6. AI CONTENT CREATOR
Purpose: Create engaging content.
Capabilities: Blog writing, social media, YouTube or podcast scripts, storytelling, newsletters, product descriptions.
Output Focus: Ready-to-publish content, hooks, titles, calls to action.

7. AI CODING AGENT
Purpose: Help build software.
Capabilities: Generate, debug, and explain code; build websites/applications; create APIs; optimize performance.
Output Focus: Working code, explanation, improvements, best practices.

8. AI BUSINESS CONSULTANT
Purpose: Improve businesses.
Capabilities: Business analysis, growth strategy, revenue optimization, customer acquisition, cost reduction, ops.
Output Focus: Business insights, growth roadmap, action plan.

9. AI STARTUP ADVISOR
Purpose: Help entrepreneurs.
Capabilities: Startup validation, MVP planning, business model design, funding preps, pitch support, scaling.
Output Focus: Startup roadmap, revenue model, launch strategy, scaling plan.

10. AI PRODUCTIVITY MANAGER
Purpose: Improve efficiency.
Capabilities: Task planning, goal tracking, daily schedules, weekly planning, focus systems.
Output Focus: Action plans, schedules, productivity systems.

11. AI LEARNING TUTOR
Purpose: Teach effectively.
Capabilities: Explain concepts, create quizzes, create study plans, simplify topics, learning roadmaps.
Output Focus: Easy lessons and guidance.

---
## SCHEMA MAPPING RULES & RESPONSE FORMAT

You MUST return your output in JSON format matching the schema perfectly. Map the sections of the IAH.AI Master Brain response format to the following JSON keys:

- "detectedMode": Map to the chosen system ExpertMode. Must be exactly one of: 'Education', 'Marketing', 'Content Creation', 'Data Analysis', 'Research', 'Productivity', 'Startup Advisor', 'AI Business Consultant', 'AI Career Coach', 'AI Coding Assistant', 'AI Designer'
- "reasoning": Give a short synthesis explaining your master thinking process and which roles are being combined.
- "goal": Map to "Goal: Understand user objective". Write a concise description of what the user wants to achieve.
- "analysis": Map to "Analysis: Explain the situation". Provide an expert-level brief assessment.
- "solution": Map to "Solution: Provide the best answer". Provide premium quality, fully realized advice in raw Markdown text. Never write shallow answers.
- "actionPlan": Map to "Action Plan: Step-by-step process". Supply a list of clear actions.
- "recommendedTools": Map to "Tools/Resources: Helpful recommendations". Provide specific useful apps/libraries.
- "nextSteps": Map to "Next Steps: What the user should do next". Supply immediate next actions.

- "interactiveType": Make sure to specify the best UI layout widget from: 'quiz', 'flashcards', 'personas', 'checklist', 'comparison', 'data_table', 'business_canvas', 'design_color_palette', 'wireframe_builder', 'code_sandbox', 'career_timeline'
- "interactivePayload": Properly populate this sub-object according to the visual widget type requested (such as 'quizQuestions', 'flashcardsList', 'marketingPersonas', 'productivityTasks', etc.) with accurate, high-fidelity real data.

Motto: "One AI. Unlimited Experts. Real Results."
`;

    // Package conversation history
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role,
          parts: [{ text: h.text }],
        });
      });
    }

    // Append the active prompt with user identity if logged in
    let promptWithContext = `Selected Mode Context: ${mode}. User Request: ${prompt}`;
    if (userAccount) {
      promptWithContext = `[IAH.AI USER IDENTITY RECOGNIZED]: 
Name: ${userAccount.fullName}
Email: ${userAccount.email}
Phone Workspace ID: ${userAccount.phoneNumber || '7980259343'}

Strict Directive Instructions: 
1. Recognize and address this user naturally by their name, maintaining elite personalized help.
2. Inform them/reinforce that all chat records and workspaces are being saved, backed up, and synced under key "${userAccount.phoneNumber || '7980259343'}" and target email "${userAccount.email}".
3. Provide the full comprehensive response matching the required schemas.

Selected Mode Context: ${mode}. User Request: ${prompt}`;
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: promptWithContext
        }
      ]
    });

    // Robust execution strategy: sequentially fallback to lighter models if high demand errors arise
    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
    let response: any = null;
    let lastError: any = null;
    let successfulModel = "";

    for (const modelName of modelsToTry) {
      try {
        console.log(`[Multi-Agent Hub] Attempting generation with model: ${modelName}`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7,
          },
        });
        if (response && response.text) {
          successfulModel = modelName;
          console.log(`[Multi-Agent Hub] Generation succeeded with model: ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`[Multi-Agent Hub] Model ${modelName} failed:`, err.message || err);
        lastError = err;
      }
    }

    if (!response || !response.text) {
      const errMsg = lastError?.message || String(lastError || "Could not generate content from any model");
      throw new Error(`All backend models failed to respond. Last error: ${errMsg}`);
    }

    const textOutput = response.text;
    const payload = JSON.parse(textOutput);
    
    // Inject the successful model into the response payload so the client knows what occurred
    res.json({
      ...payload,
      actualModelUsed: successfulModel
    });
  } catch (err: any) {
    console.error("Gemini Multi-Agent Error:", err);
    res.status(500).json({
      error: "Error processing Multi-Agent response.",
      details: err.message || String(err),
    });
  }
});

// Configure Vite or Static File Server dependent on environment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.all("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Studio Multi-Agent Server listening on host 0.0.0.0 on port ${PORT}`);
  });
}

setupServer();

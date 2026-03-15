export interface Skill {
  name: string;
  category: 'core' | 'adjacent' | 'soft';
  level: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  overallScore: number;
  matchBreakdown: {
    skills: number;
    experience: number;
    education: number;
  };
  skills: Skill[];
  experience: string;
  education: string;
  explainability: string;
  biasFlag?: boolean;
  biasReason?: string;
  counterfactual?: string;
  status: 'pending' | 'shortlisted' | 'rejected';
}

export const mockJobDescription = {
  title: "Senior AI Engineer",
  department: "Machine Learning Platform",
  location: "Remote / San Francisco",
  description: "We are looking for a Senior AI Engineer to help build scalable, robust machine learning pipelines and integrate state-of-the-art LLMs into our enterprise suite. You should have strong experience with Python, PyTorch, and distributed computing.",
  requirements: [
    { skill: "Python", type: "Must-have", weight: 90 },
    { skill: "PyTorch or TensorFlow", type: "Must-have", weight: 85 },
    { skill: "Distributed Systems (Ray, Spark)", type: "Good-to-have", weight: 70 },
    { skill: "LLM Orchestration (LangChain, LlamaIndex)", type: "Good-to-have", weight: 80 },
    { skill: "MLOps (Kubernetes, MLflow)", type: "Optional", weight: 60 }
  ]
};

export const mockCandidates: Candidate[] = [
  {
    id: "c1",
    name: "Alex Rivera",
    role: "Senior Machine Learning Engineer",
    overallScore: 92,
    matchBreakdown: { skills: 95, experience: 88, education: 90 },
    skills: [
      { name: "Python", category: "core", level: "Expert" },
      { name: "PyTorch", category: "core", level: "Expert" },
      { name: "Ray", category: "adjacent", level: "Advanced" },
      { name: "Kubernetes", category: "adjacent", level: "Intermediate" }
    ],
    experience: "5+ years building distributed training systems at Scale AI. Led the migration to Ray-based orchestration.",
    education: "M.S. Computer Science, Stanford University",
    explainability: "High match due to exceptional alignment with core skills (Python, PyTorch) and direct experience with distributed orchestration (Ray). The candidate's background perfectly fills the requirements of the 'Good-to-have' tier.",
    status: "shortlisted"
  },
  {
    id: "c2",
    name: "Jordan Lee",
    role: "Data Scientist / AI Researcher",
    overallScore: 84,
    matchBreakdown: { skills: 82, experience: 85, education: 95 },
    skills: [
      { name: "Python", category: "core", level: "Expert" },
      { name: "TensorFlow", category: "core", level: "Advanced" },
      { name: "Statistical Modeling", category: "adjacent", level: "Expert" },
      { name: "AWS", category: "adjacent", level: "Intermediate" }
    ],
    experience: "4 years as a Data Scientist at FinTech Corp. Designed predictive models using TensorFlow.",
    education: "Ph.D. Statistics, MIT",
    explainability: "Strong theoretical background and solid Python/TensorFlow skills provide a good foundation. The system inferred adjacent capability for complex ML architectures, though lacking direct distributed orchestration frameworks (Ray/Spark).",
    status: "pending"
  },
  {
    id: "c3",
    name: "Taylor Smith",
    role: "Software Engineer",
    overallScore: 68,
    matchBreakdown: { skills: 65, experience: 75, education: 80 },
    skills: [
      { name: "Java", category: "core", level: "Expert" },
      { name: "Python", category: "core", level: "Intermediate" },
      { name: "Spring Boot", category: "adjacent", level: "Advanced" },
      { name: "Docker", category: "adjacent", level: "Intermediate" }
    ],
    experience: "6 years as Backend Software Engineer building microservices.",
    education: "B.S. Computer Science, State University",
    explainability: "Match penalty due to lack of core Deep Learning frameworks (PyTorch/TensorFlow). While software engineering practices are strong, the specific AI engineering requirements are unmet.",
    counterfactual: "Adding a portfolio project utilizing PyTorch or contributing to LLM open source codebases (e.g., LangChain) would strongly elevate this profile for AI Engineering roles.",
    status: "pending"
  },
  {
    id: "c4",
    name: "Sam Chen",
    role: "AI Integration Lead",
    overallScore: 89,
    matchBreakdown: { skills: 88, experience: 92, education: 85 },
    skills: [
      { name: "Python", category: "core", level: "Expert" },
      { name: "LlamaIndex", category: "core", level: "Advanced" },
      { name: "LangChain", category: "core", level: "Advanced" },
      { name: "Prompt Engineering", category: "adjacent", level: "Expert" }
    ],
    experience: "3 years building GenAI applications for Enterprise clients. Integrated multiple LLM orchestration layers.",
    education: "B.S. Math, University of Toronto",
    explainability: "Excellent alignment with emerging 'Good-to-have' LLM Orchestration skills. Scoring boosts applied via adjacency graph: Prompt Engineering mapped to required LLM problem-solving competencies.",
    biasFlag: true,
    biasReason: "Model over-indexed on the word 'Enterprise' in previous job title. Adjusted experience weight to prevent large-company bias.",
    status: "pending"
  }
];

export const pipelineMetrics = {
  totalProcessed: 142,
  shortlisted: 12,
  rejected: 45,
  pendingReview: 85,
  biasAlerts: 3
};

export const mockAgentLogs = [
  { id: 1, timestamp: "10:45:12 AM", agent: "Orchestrator", message: "Received batch upload of 25 resumes. Distributing to Parser Agent.", level: "info" },
  { id: 2, timestamp: "10:45:15 AM", agent: "Parser Agent", message: "Successfully extracted text and structural data from 24/25 PDFs. 1 DOCX file corrupted.", level: "success" },
  { id: 3, timestamp: "10:45:18 AM", agent: "Analyzer Agent", message: "Compiled job framework for 'Senior AI Engineer'. Weight parameters normalized.", level: "info" },
  { id: 4, timestamp: "10:45:25 AM", agent: "Semantic Matcher", message: "Completed embeddings comparison for 24 profiles. 3 profiles scored > 85.", level: "success" },
  { id: 5, timestamp: "10:45:28 AM", agent: "Bias Monitor", message: "FLAGGED candidate 'Sam Chen' (Score: 89) for over-indexing on proxy attribute: 'Enterprise'.", level: "warning" },
  { id: 6, timestamp: "10:45:30 AM", agent: "Explainability Engine", message: "Generated 24 counterfactual insight reports and sub-score matrices.", level: "success" },
  { id: 7, timestamp: "10:45:32 AM", agent: "Orchestrator", message: "Batch UX-223 processing complete. Human-in-the-loop review requested for 1 candidate.", level: "info" }
];

export const mockBiasAudits = [
  { id: "b1", date: "2026-03-15", candidate: "Sam Chen", trigger: "Experience weighting proxy", detail: "Over-indexed on 'Enterprise' keyword in past job titles, potentially skewing against startup or freelance backgrounds.", status: "Review Required" },
  { id: "b2", date: "2026-03-14", candidate: "Morgan Trevell", trigger: "Geographic proxy", detail: "Model showed preference for 'San Francisco' location string in non-remote applicant matching.", status: "Resolved (Weights Adjusted)" },
  { id: "b3", date: "2026-03-10", candidate: "Jamie O'Connor", trigger: "University prestige proxy", detail: "Ivy League extraction generated disproportionate Match Score boost (+12%). Curbed influence manually.", status: "Resolved (Override applied)" }
];

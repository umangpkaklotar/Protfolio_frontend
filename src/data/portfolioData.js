export const personalInfo = {
  name: "Umang P. Kaklotar",
  shortName: "UMANG.",
  title: "Web Developer | Frontend Developer | Shopify Developer | AI/ML Enthusiast",
  eyebrow: "HELLO, I'M UMANG KAKLOTAR",
  headline: "BUILDING DIGITAL\nEXPERIENCES WITH\nCODE.",
  tagline: "I build modern websites, interactive interfaces, and practical digital applications using creative design and technology.",
  aboutHeading: "A Developer Who Loves Building.",
  aboutText: "I'm Umang P. Kaklotar, a developer interested in building modern websites, responsive interfaces, e-commerce experiences, and AI-powered applications. I enjoy exploring technologies, solving practical problems, and turning ideas into useful digital products.",
  contactHeading: "Let's Build Something Great.",
  email: "upkaklotar7@gmail.com",
  github: "https://github.com/umangpkaklotar?tab=repositories",
  linkedin: "https://www.linkedin.com/in/umang-kaklotar-802099303/",
  availability: "Available for Freelance",
  resume: "/resume.pdf"
};

export const skills = [
  { category: "Frontend Development", shortCategory: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Tailwind CSS", "GSAP"] },
  { category: "Backend Development", shortCategory: "Backend", items: ["PHP", "FastAPI", "Node.js", "REST API", "API Integration"] },
  { category: "AI & Machine Learning", shortCategory: "AI/ML", items: ["Python", "NumPy", "Pandas", "OpenCV", "YOLO", "PyTorch"] },
  { category: "Databases", shortCategory: "Databases", items: ["MySQL", "MongoDB"] },
  { category: "Tools & Development", shortCategory: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Vite"] }
];

export const experience = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Jemistry Info Solutions LLP",
    duration: "6 months",
    year: "2025",
    description: "Worked on frontend web development, building responsive websites and converting interface designs into interactive web pages. Gained practical experience with JavaScript, REST API integration, version control, responsive frameworks, website performance, and cross-browser compatibility.",
    tech: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Axios", "Git", "GitHub", "Bootstrap", "Tailwind CSS"]
  }
];

export const education = [
  {
    id: 1,
    qualification: "Bachelor of Computer Applications (BCA)",
    institution: "Smt ZS Patel College of Management and Technology",
    year: "2025"
  }
];

export const PCB_APP_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PCB_APP_URL)
  || 'https://pcb-frontend.getvoroa.com/';

export const RAG_APP_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_RAG_APP_URL) 
  || 'https://rag-frontend-omega-three.vercel.app/';

export const projects = [
  {
    id: 1,
    title: "PCB Defect Detection",
    category: "Industrial AI / Computer Vision / Robotics",
    description: "AI-powered PCB defect inspection system using YOLOv8 to detect 7 PCB defect types with real-time camera/mobile inspection, FastAPI backend, MongoDB tracking, and ROS 2 + Gazebo industrial simulation.",
    tech: ["YOLOv8", "OpenCV", "ROS 2", "Gazebo", "RViz2", "FastAPI", "MongoDB", "React"],
    color: "#1a1a2e",
    link: PCB_APP_URL,
    hasCaseStudy: true,
  },
  {
    id: 4,
    title: "Document AI",
    category: "Full-Stack AI / Enterprise RAG",
    description: "Production-grade Document Q&A Assistant powered by Gemini Embeddings, FAISS, Groq LLMs, and Clerk Auth with real-time streaming citations.",
    tech: ["FastAPI", "React", "Groq AI", "Gemini API", "FAISS", "Clerk", "MongoDB"],
    color: "#1e1428",
    link: RAG_APP_URL,
    hasCaseStudy: true,
  },
  {
    id: 6,
    title: "AI Code Converter",
    category: "AI / Application",
    description: "An AI-powered application designed to help convert code between programming languages.",
    tech: ["React", "Node.js", "OpenAI API"],
    color: "#16213e",
    link: "#"
  },
  {
    id: 7,
    title: "Home Price Prediction",
    category: "Machine Learning",
    description: "A machine-learning project that predicts estimated house prices from property features.",
    tech: ["Python", "Scikit-Learn", "Pandas"],
    color: "#0f3460",
    link: "#"
  }
];

export const process = [
  { step: "01", title: "Discovery", description: "Understanding requirements, target audience, and project goals." },
  { step: "02", title: "Design", description: "Creating wireframes, visual designs, and interactive prototypes." },
  { step: "03", title: "Development", description: "Building scalable architecture with clean, maintainable code." },
  { step: "04", title: "Deployment", description: "Testing, optimization, and seamless launch to production." }
];

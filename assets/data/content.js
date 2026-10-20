// All pillars have equal proficiency. Connections describe related tools, not ratings.
const agent = 'Developed agentic AI and RAG systems at JandGsoftwaresolutions using Python, LangChain, AutoGen, Mistral, FAISS, and Pinecone.';
export const skills = [
  { id: 'python', name: 'Python', glyph: 'Py', detail: agent, related: ['langchain', 'faiss', 'pinecone', 'automation'] },
  { id: 'langchain', name: 'LangChain', glyph: 'LC', detail: agent, related: ['python', 'rag', 'llms'] },
  { id: 'autogen', name: 'AutoGen', glyph: 'AG', detail: agent, related: ['python', 'rag', 'mistral'] },
  { id: 'mistral', name: 'Mistral', glyph: 'M', detail: agent, related: ['llms', 'autogen', 'rag'] },
  { id: 'faiss', name: 'FAISS', glyph: 'F', detail: agent, related: ['python', 'rag', 'pinecone'] },
  { id: 'pinecone', name: 'Pinecone', glyph: 'PC', detail: agent, related: ['python', 'faiss', 'rag'] },
  { id: 'rag', name: 'RAG / Agentic AI', glyph: 'R', detail: agent, related: ['langchain', 'autogen', 'faiss', 'pinecone', 'llms'] },
  { id: 'llms', name: 'LLMs', glyph: 'LM', detail: 'Large Language Models (LLM): a skill from the Data Analytics and I.T. Internship at MedKick.', related: ['mistral', 'rag', 'langchain'] },
  { id: 'looker', name: 'Looker', glyph: 'L', detail: 'Built intelligent dashboards at MedKick. Looker is a listed skill for this role.', related: ['analysis', 'visualization'] },
  { id: 'analysis', name: 'Data Analysis', glyph: 'DA', detail: 'Supported government transparency at OpenTheBooks by working with large, real-world public spending datasets.', related: ['visualization', 'python', 'looker'] },
  { id: 'visualization', name: 'Data Visualization', glyph: 'DV', detail: 'Data Visualization: a skill from the Data Analysis Internship at OpenTheBooks.', related: ['analysis', 'looker'] },
  { id: 'ml', name: 'Machine Learning', glyph: 'ML', detail: 'Applied machine learning techniques to healthcare data at MedKick to uncover clinical insights and improve patient outcomes.', related: ['python', 'analysis', 'llms'] },
  { id: 'automation', name: 'Automation', glyph: '>_', detail: 'Built and deployed AI, data, and automation solutions at JandGsoftwaresolutions that turn real business problems into working products.', related: ['python', 'autogen', 'rag'] },
].map(skill => ({ ...skill, proficiency: 1 }));

export const experience = [
  { id: 'suprgig', role: 'Founder', company: 'suprgig', type: 'Self-employed', dates: 'Jul 2026 – Present', location: 'San Francisco Bay Area', present: true,
    description: 'Building suprgig, a managed tech delivery platform that helps companies launch software, apps, AI tools, automation, and digital products without hiring a full in-house tech team.',
    tags: [['AI tools', 'llms'], ['Automation', 'automation'], ['Software delivery', null]],
    link: 'https://suprgig.com', linkTitle: 'SuprGig | Managed Software Development Teams' },
  { id: 'case-openthebooks', role: 'Data Analysis Intern', company: 'OpenTheBooks', type: 'Internship', dates: 'Jan 2026 – May 2026', location: 'The Villages, Florida, United States · Remote',
    description: 'Supported government transparency efforts by working with large, real-world public spending datasets.',
    tags: [['Data Analysis', 'analysis'], ['Data Visualization', 'visualization']] },
  { id: 'medkick', role: 'Data Analytics and I.T. Intern', company: 'MedKick', type: 'Internship', dates: 'May 2025 – Dec 2025', location: 'West Palm Beach, Florida, United States · Remote',
    description: 'Built intelligent dashboards and applied machine learning techniques to healthcare data to uncover clinical insights and improve patient outcomes.',
    tags: [['Large Language Models (LLM)', 'llms'], ['Looker', 'looker']] },
  { id: 'jandg', role: 'Forward Deployed AI Engineer', company: 'JandGsoftwaresolutions', type: 'Contract', dates: 'Jan 2025 – May 2025', location: 'Florida, United States · Hybrid',
    description: 'Built and deployed AI, data, and automation solutions that turn real business problems into working products. Developed agentic AI and RAG systems using Python, LangChain, AutoGen, Mistral, FAISS, and Pinecone.',
    tags: [['Artificial Intelligence (AI)', 'rag'], ['Forward Deployed Engineering (FDE)', 'automation'], ['Python', 'python'], ['LangChain', 'langchain'], ['AutoGen', 'autogen'], ['Mistral', 'mistral'], ['FAISS', 'faiss'], ['Pinecone', 'pinecone']] },
];

export const terminal = { command: '> whoami', output: 'Satya Teja Yannam / Applied AI & Data Engineer', boot: 'initializing neural mesh... igniting pillars...' };
// Density is automatically reduced for narrow screens / limited device resources.
export const scene = { desktopDots: 1800, mobileDots: 240, lowPowerDots: 450, connectionDistance: 66, fireIntensity: 1, flamesPerPillar: 24, maxPixelRatio: 1.5 };

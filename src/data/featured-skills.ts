
export interface FeaturedSkill {
  id: string;
  title: string;
  description: string;
  prompt: string;
  techStack: string[];
  author: string;
}

export const FEATURED_SKILLS: FeaturedSkill[] = [
  {
    id: "fs_1",
    title: "SaaS Auth Boilerplate",
    description: "Production-ready auth with Supabase & Next.js.",
    author: "Antigravity Team",
    techStack: ["nextjs", "supabase", "tailwind"],
    prompt: "Create a complete authentication flow using Supabase Auth helpers for Next.js 14 App Router. \n\nRequirements:\n- Middleware for route protection\n- Server Actions for Sign In/Sign Up\n- OAuth providers (Google/GitHub)\n- Profile management page\n- Row Level Security (RLS) policies for user data"
  },
  {
    id: "fs_2",
    title: "E-commerce Product Card",
    description: "Responsive card with variants & cart logic.",
    author: "UI Master",
    techStack: ["react", "tailwind", "framer-motion"],
    prompt: "Design a highly interactive product card component.\n\nFeatures:\n- Image gallery slider on hover\n- Size/Color variant selector\n- Add to Cart with optimistic UI update\n- Discount badge calculation\n- Skeleton loading state\n- Mobile-first responsive design"
  },
  {
    id: "fs_3",
    title: "AI Chat Interface",
    description: "Streaming chat UI with markdown support.",
    author: "GenAI Dev",
    techStack: ["nextjs", "react", "tailwind"],
    prompt: "Build a modern AI chat interface similar to ChatGPT.\n\nSpecs:\n- Streaming text response handling\n- Markdown rendering with syntax highlighting\n- Auto-scroll to bottom\n- Message history persistence (local storage)\n- Copy code block functionality\n- User/AI message styling differentiation"
  }
];

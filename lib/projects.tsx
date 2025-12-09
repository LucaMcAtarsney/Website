// lib/projects.ts

export type Project = {
  id: string;
  title: string;
  tagline: string;
  year: string;
  roles: string[];
  link?: string;
};

export const projects: Project[] = [
   {
    id: "procedural-worm",
    title: "Procedural Worm",
    tagline: "A worm that is procedurally animated, left click to guide it.",
    year: "2025",
    roles: ["Procedural Animation", "Godot"],
    link: "/projects/procedural-worm",
  },
  {
    id: "physics-toy",
    title: "Kinetic Toy",
    tagline: "A browser-native physics sandbox of falling shapes.",
    year: "2025",
    roles: ["Godot", "Gameplay", "Web Export"],
    link: "/games/physics-toy", // or external link
  },
  {
    id: "modular-ai",
    title: "Modular AI Patrols",
    tagline: "Composable enemy behaviors for top-down games.",
    year: "2025",
    roles: ["AI Systems", "Design Patterns"],
  },
  {
    id: "palette-oscillator",
    title: "Palette Oscillator",
    tagline: "A generative colour field controlled with your cursor.",
    year: "2024",
    roles: ["Three.js", "Shaders"],
    link: "https://your-link.com",
  },
];

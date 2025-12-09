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
    id: "endless-runner",
    title: "Endless Runner",
    tagline: "A first attempt at chunk based level generation.",
    year: "2025",
    roles: ["Chunk generation", "Godot"],
    link: "/projects/endless-runner",
  },
];

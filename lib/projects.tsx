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
    id: "brisk",
    title: "Brisk (In Progress)",
    tagline: "A take on Briscola.",
    year: "2025",
    roles: ["Game Design"],
    link: "/projects/brisk",
  },
  {
    id: "campfire-scene",
    title: "Campfire Scene",
    tagline: "An attempt at scene design.",
    year: "2025",
    roles: ["Environment Design"],
    link: "/projects/campfire-scene",
  },
  {
    id: "audio-visualiser",
    title: "Audio Visualiser",
    tagline: "A reactive music visualiser.",
    year: "2025",
    roles: ["Audio Reactivity"],
    link: "/projects/audio-visualiser",
  },
  {
    id: "scrabbled",
    title: "Scrabbled (Unfinished)",
    tagline: "A scrabble wordle-like",
    year: "2025",
    roles: ["Seeding"],
    link: "/projects/scrabbled",
  },
  {
    id: "game-of-life",
    title: "Conway's Game of Life",
    tagline: "Cellular automaton simulation.",
    year: "2025",
    roles: ["Simulation"],
    link: "/projects/game-of-life",
  },
  {
    id: "northern-lights",
    title: "Northern Lights",
    tagline: "A visual simulation of the Northern Lights.",
    year: "2025",
    roles: ["Visuals"],
    link: "/projects/northern-lights",
  },
  {
    id: "procedural-worm",
    title: "Procedural Worm",
    tagline: "A worm that is procedurally animated, left click to guide it.",
    year: "2025",
    roles: ["Procedural Animation"],
    link: "/projects/procedural-worm",
  },
  {
    id: "endless-runner",
    title: "Endless Runner",
    tagline: "A first attempt at chunk based level generation.",
    year: "2025",
    roles: ["Chunk generation"],
    link: "/projects/endless-runner",
  },
  {
    id: "asteroids-3D",
    title: "Asteroids 3D",
    tagline: "A 3D take on the classic Asteroids game.",
    year: "2025",
    roles: ["3D Movement"],
    link: "/projects/asteroids-3D",
  },
];

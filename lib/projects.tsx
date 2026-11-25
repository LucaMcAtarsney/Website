// lib/projects.tsx

export type Demo =
  | { kind: "iframe"; src: string; tall?: boolean }
  | { kind: "video"; src: string }
  | { kind: "component" };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  /** Longer line shown on the project's own page; falls back to tagline. */
  summary?: string;
  year: string;
  roles: string[];
  link: string;
  /** Short status flag, e.g. "in progress", "unfinished". */
  status?: string;
  /** Factual notes shown on the detail page (tooling, how it runs). */
  meta: string[];
  controls?: string;
  /** Optional link to the source repository. */
  repo?: string;
  demo: Demo;
  /** Kept reachable by URL but omitted from the home listing. */
  hidden?: boolean;
};

export const projects: Project[] = [
  {
    id: "flywithme",
    title: "FlyWithMe",
    tagline: "A flight companion app.",
    year: "2026",
    roles: ["Web App"],
    link: "https://flywithme.pentgon.com",
    repo: "https://github.com/LucaMcAtarsney/flywithme",
    meta: [],
    demo: { kind: "component" },
  },
  {
    id: "alphasantorini",
    title: "AlphaSantorini",
    tagline: "An AlphaZero-style engine for the game Santorini.",
    summary:
      "My dissertation: an AlphaZero-inspired framework for the board game Santorini. It pits seven agents, from classical baselines and Minimax up to a neural-network-guided MCTS, against each other. The network is a PyTorch policy/value model trained via self-play on the Leeds HPC cluster. Graded First.",
    year: "2026",
    roles: ["Dissertation", "Machine Learning"],
    link: "/projects/alphasantorini",
    repo: "https://github.com/LucaMcAtarsney/AlphaSantorini",
    meta: [
      "Best experienced in full screen.",
      "Godot frontend, with a FastAPI and PyTorch backend on Render.",
      "First load can take up to a minute while the demo server wakes.",
    ],
    demo: {
      kind: "iframe",
      src: "/AlphaSantorini/index.html?api=https://alphasantorini-api.onrender.com",
      tall: true,
    },
  },
  {
    id: "game-of-life",
    title: "Conway's Game of Life",
    tagline: "Cellular automaton simulation.",
    summary:
      "Conway's Game of Life written from scratch in TypeScript. Every frame a few simple rules run across the grid, and complex, self-organising patterns emerge from that code alone.",
    year: "2025",
    roles: ["Simulation"],
    link: "/projects/game-of-life",
    controls: "Click cells to toggle. Play, pause, step, randomise or clear.",
    meta: ["Rendered to canvas in the browser."],
    demo: { kind: "component" },
  },
  {
    id: "northern-lights",
    title: "Northern Lights",
    tagline: "A visual simulation of the Northern Lights.",
    summary:
      "A simulation of the aurora built in TouchDesigner, programmed as a node graph of GLSL shaders and noise fields that layer and animate the drifting bands of light.",
    year: "2025",
    roles: ["Visuals"],
    link: "/projects/northern-lights",
    meta: ["Exported from TouchDesigner."],
    demo: { kind: "video", src: "/NorthernLights/northernlights.mp4" },
  },
  {
    id: "audio-visualiser",
    title: "Audio Visualiser",
    tagline: "A reactive music visualiser.",
    summary:
      "A visualiser reacting to a track I produced in Ableton. The audio is analysed in real time, with its frequency data driving the shaders and geometry programmed in TouchDesigner.",
    year: "2025",
    roles: ["Audio Reactivity"],
    link: "/projects/audio-visualiser",
    meta: ["Exported from TouchDesigner."],
    demo: { kind: "video", src: "/AudioVisualiser/test.mp4" },
  },
  {
    id: "survival-game",
    title: "Survival Game",
    tagline: "A real-time survivor with an analytics backend.",
    summary:
      "A real-time survival game whose REST API logs each run (time survived, XP, upgrades and deaths) to a relational database, powering post-run analytics and global leaderboards.",
    year: "2025",
    roles: ["Game Design", "Backend"],
    link: "/projects/survival-game",
    controls: "WASD to move, arrow keys to shoot.",
    meta: [
      "Built in Godot with a Python / FastAPI + SQL backend.",
      "Runs directly in the browser.",
    ],
    demo: { kind: "iframe", src: "/VampireSurvivorsClone/index.html" },
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

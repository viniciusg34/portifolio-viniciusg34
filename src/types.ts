export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  tag?: string;
  stack: string[];
  accent: string;
}

export interface ProjectCardHandlers {
  onPreload: () => void;
  onOpen: (trigger: HTMLElement) => void;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
}

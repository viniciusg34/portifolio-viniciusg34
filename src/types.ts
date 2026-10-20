export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  tag?: string;
  stack: string[];
  accent: string;
}

/** Projeto com link publicado (o único tipo que o portal consegue abrir). */
export type LinkedProject = Project & { url: string };

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

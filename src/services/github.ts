import type { GithubRepo } from "../types";

interface RawRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const TTL_MS = 10 * 60 * 1000; // a API pública limita 60 req/h por IP; o cache evita estourar

function readCache(key: string): GithubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: GithubRepo[] };
    return Date.now() - at < TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, data: GithubRepo[]): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage indisponível: segue sem cache */
  }
}

export async function fetchRepos(user: string, limit = 6): Promise<GithubRepo[]> {
  const key = `gh-repos:${user}`;
  const cached = readCache(key);
  if (cached) return cached;

  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`, {
    headers: { Accept: "application/vnd.github+json" }
  });
  if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);

  const raw = (await response.json()) as RawRepo[];
  const repos = raw
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, limit)
    .map<GithubRepo>((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at
    }));

  writeCache(key, repos);
  return repos;
}

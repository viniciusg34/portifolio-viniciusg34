export interface TimelineEntry {
  title: string;
  meta?: string;
  badge?: string;
  text?: string;
  items?: string[];
}

export const stats = [
  { value: "4", label: "anos de experiência em TI" },
  { value: "Itaú · Kroll", label: "projetos corporativos (BRQ)" },
  { value: "Kotlin · Java", label: "foco atual em backend" }
];

export const highlights = [
  "4 anos de experiência prática em TI",
  "Vivência em ambiente corporativo de grande porte",
  "Flexibilidade no aprendizado",
  "Interesse contínuo em evolução técnica"
];

export const experience: TimelineEntry[] = [
  {
    title: "BRQ Digital Solutions",
    meta: "Projetos: Itaú Unibanco · Kroll",
    items: [
      "Participação em atividades de desenvolvimento e manutenção de sistemas corporativos.",
      "Apoio na implementação de soluções tecnológicas para ambientes internos.",
      "Colaboração com equipes multidisciplinares, utilizando metodologias e processos de desenvolvimento.",
      "Atuação em ambiente corporativo de grande porte, com foco em qualidade e melhoria contínua."
    ]
  }
];

export const skillGroups = [
  { title: "Backend", items: ["Kotlin", "Java", "APIs REST", "Programação Orientada a Objetos", "Arquitetura de software"] },
  { title: "Front-end", items: ["HTML5", "CSS3", "JavaScript", "Desenvolvimento responsivo", "Manipulação de DOM"] },
  { title: "Práticas", items: ["Git", "Versionamento de código", "Boas práticas de desenvolvimento", "Metodologias ágeis"] }
];

export const softSkills = [
  "Trabalho em equipe",
  "Comunicação eficaz",
  "Pensamento analítico",
  "Resolução de problemas",
  "Aprendizado contínuo",
  "Adaptabilidade",
  "Organização",
  "Proatividade"
];

export const education: TimelineEntry[] = [
  {
    title: "Análise e Desenvolvimento de Sistemas (ADS)",
    meta: "Unisuam",
    badge: "Cursando",
    text: "Aprofundamento da formação em desenvolvimento de software, engenharia de software e arquitetura de sistemas."
  },
  {
    title: "Edusync: Front-end",
    meta: "BRQ · Programa Entrypoint Dev Mangaratiba",
    text: "Curso profissionalizante oferecido pela BRQ."
  }
];

export const courses = ["Desenvolvimento de Software", "Java", "Kotlin", "Desenvolvimento web", "Programação Orientada a Objetos"];

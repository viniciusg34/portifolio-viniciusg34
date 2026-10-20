import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "ecotech",
    title: "EcoTech",
    description: "Plataforma de reciclagem e sustentabilidade para o Rio de Janeiro e a Costa Verde, com mapa de ecopontos, QR code de coleta, EcoCoins e painel para empresas parceiras.",
    url: "https://eco-tech-blush.vercel.app/",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Leaflet"],
    accent: "#7fb685"
  },
  {
    id: "gestao-informacoes",
    title: "Sistema Web para Gestão de Informações",
    description: "Interfaces com HTML, CSS e JavaScript, com funcionalidades voltadas à experiência do usuário e foco em organização e manutenção de código.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "#ff8fb1",
    tag: "Projeto acadêmico"
  },
  {
    id: "estudos-backend",
    title: "Estudos em Backend com Kotlin e Java",
    description: "Aplicações para consolidar orientação a objetos, criação de APIs e integração entre camadas, aplicando boas práticas e padrões de desenvolvimento.",
    stack: ["Kotlin", "Java", "APIs REST", "POO"],
    accent: "#ffb86b",
    tag: "Em estudo"
  }
];

// Edite aqui seus dados. Nav, hero, "Sobre mim", GitHub e contato leem deste arquivo.
export const profile = {
  name: "Vinícius Gomes de Cerqueira",
  shortName: "Vinícius Gomes",
  email: "viniciusgomesdecerqueira@gmail.com",
  phone: "+5521966279667", // formato internacional, usado no link tel:
  phoneDisplay: "(21) 96627-9667",
  location: "Rio de Janeiro – RJ",
  github: "viniciusg34",
  linkedin: "https://www.linkedin.com/in/vin%C3%ADcius-gomes-5393ab23a",

  about: [
    "Profissional de TI com cerca de 4 anos de experiência em desenvolvimento de software, atuando em projetos de front-end e back-end. Minha última atuação foi na área de tecnologia do Itaú, em iniciativas de desenvolvimento e manutenção de sistemas corporativos.",
    "Tenho direcionado minha carreira para o backend com Kotlin e Java, aprofundando meus conhecimentos em arquitetura de software, APIs REST e sistemas escaláveis. Busco uma vaga de estágio em desenvolvimento de software para contribuir com o time e evoluir junto com ele."
  ],
  skills: ["Kotlin", "Java", "JavaScript", "HTML5", "CSS3", "APIs REST", "POO", "Git"]
};

export const githubUrl = `https://github.com/${profile.github}`;
export const githubConfigured = profile.github !== "seu-usuario";

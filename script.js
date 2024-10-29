const cursos = [
    {
      nome: "Curso de JavaScript",
      descricao: "Aprenda JavaScript do zero ao avançado.",
      imagem: "https://via.placeholder.com/250x150",
      link: "#"
    },
    {
      nome: "Curso de HTML e CSS",
      descricao: "Transforme-se no Mestre do Hambúrguer, Eleve o Padrão: Crie Sabores Inesquecíveis e Seja a Sensação Gourmet de Sua Região..",
      imagem: "imagens/CapaHotmartHamburguerArtesanal.webp",
      link: "https://www.cursodehamburguer.com/oferta149/?ref=M96031928W"
    },
    {
      nome: "Curso de React",
      descricao: "Desenvolva interfaces modernas com React.",
      imagem: "",
      link: "#"
    },
    {
      nome: "Club Viajemos",
      descricao: "Estes são os benefícios que você receberá ao se associar ao Club Viajemos.",
      imagem: "imagens/logoimgperfil.webp",
      link: "https://go.hotmart.com/Y96290249Y?ap=1253"
    },
    {
      nome: "Curso de Node.js",
      descricao: "Aprenda agora, a partir de um método próprio de multiplicação e proteção de capital, a como investir no mercado mais assimétrico do século XXI: o de criptomoedas.",
      imagem: "imagens/Poster-Filmes-CursosPrancheta-1-copiar_Easy-Resize.com-4-768x1076.jpg",
      link: "https://go.hotmart.com/B96290217B"
    },
  ];

  // Função para criar e exibir os cursos
  function exibirCursos() {
    const container = document.getElementById('cursoContainer');
    
    // Loop pelos cursos
    cursos.forEach(curso => {
      // Criar div do curso
      const cursoDiv = document.createElement('div');
      cursoDiv.classList.add('curso');

      // Adicionar imagem do curso
      const img = document.createElement('img');
      img.src = curso.imagem;
      cursoDiv.appendChild(img);

      // Adicionar nome do curso
      const nome = document.createElement('h3');
      nome.textContent = curso.nome;
      cursoDiv.appendChild(nome);

      // Adicionar descrição do curso
      const descricao = document.createElement('p');
      descricao.textContent = curso.descricao;
      cursoDiv.appendChild(descricao);

      // Adicionar botão
      const botao = document.createElement('button');
      botao.textContent = 'Saiba Mais';
      botao.onclick = () => {
        window.location.href = curso.link;
      };
      cursoDiv.appendChild(botao);

      // Adicionar o curso ao container
      container.appendChild(cursoDiv);
    });
  }

  // Chamar a função para exibir os cursos
  exibirCursos();
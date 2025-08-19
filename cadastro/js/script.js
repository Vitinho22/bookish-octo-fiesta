document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const idade = document.getElementById('idade').value;

  const userData = {
    nome: nome,
    email: email,
    idade: idade
  };

  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Usuário cadastrado com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao cadastrar usuário:', error);
    alert('Erro ao cadastrar usuário');
  });
});
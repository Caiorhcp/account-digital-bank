import React, { useState, useEffect } from 'react';

function RightPage() {
  const [viewSenha, setViewSenha] = useState(false);
  const [habilitBotao, setHabilitBotao] = useState(false);
  const [campos, setCampos] = useState({
    nome: '',
    telefone: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampos(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Verifica se todos os campos estão preenchidos e procura pelos campos se são diferentes de vazio para poder ativar o botão, assim como a checkbox e aceitar os termos
    const allFilled = Object.values(campos, habilitBotao).every(field => field.trim() !== '' && ! false);
    setHabilitBotao(allFilled);
  }, [campos]); 

  const toggleViewSenha = () => {
    setViewSenha(!viewSenha);
  };

  return (
    
      <main className="flex">
        <div className="flex flex-column">
          <div className="formulario flex flex-column">
            <div className="progresso">
              <label>Preencha os campos</label>
              <progress value="100" max="100"></progress>
            </div>

            <div className="flex flex-column">
              <label htmlFor="nome">Digite seu nome</label>
              <input 
                type="text" 
                id="nome" 
                name="nome" 
                onChange={handleInputChange} 
              />
            </div>

            <div className="flex flex-column">
              <label htmlFor="telefone">Digite seu telefone</label>
              <input 
                type="text" 
                id="telefone" 
                name="telefone"
                onChange={handleInputChange} 
              />
            </div>

            <div className="flex flex-column">
              <label htmlFor="email">Digite seu e-mail</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                onChange={handleInputChange} 
              />
            </div>

            <div className="flex flex-column">
              <label htmlFor="password">Digite sua senha</label>
              <input 
                type={viewSenha ? 'text' : 'password'} 
                id="password" 
                name="password" 
                onChange={handleInputChange} 
              />
              <button className="mostra-senha" onClick={toggleViewSenha}>
                {viewSenha ? 'Esconder senha' : 'Exibir senha'}
              </button>
            </div>

            <div className="flex termos">
              <input
                type="checkbox"
                name="aceita-termos"
                id="aceita-termos" 
                onClick={(e) => setHabilitBotao(e.target.checked)} 
              />
              <label htmlFor="aceita-termos">
                Eu li, estou ciente das condições de tratamento dos
                meus dados pessoais e dou meu consentimento, quando
                aplicável, conforme descrito nesta
              </label>
            </div>

            <div className="flex">
              <button className="botao" disabled={!habilitBotao}>
                Próximo
              </button>
            </div>
          </div>
        </div>
      </main>
    
  );
}

export default RightPage;

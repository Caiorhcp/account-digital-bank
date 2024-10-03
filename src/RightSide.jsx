import { useState, useEffect } from 'react';



{/* Primeiramente um protesto aqui sobre o pc da faculdade, o keyLogger forçou o pc a desligar, e nisso o windows atualizou, e perdi meia hora esperando, mas fora isso ta de buenas */}

// Componente RightSide que representa a parte do formulário
function RightSide() {
  {/* useState para cada parte do codigo que ira ser usado, adicionei o mensagem e o progresso para ficar mais facil manipular */}
  const [mostrarSenha, setMostrarSenha] = useState(false); // Controla se a senha deve ser exibida
  const [habilitarBotao, setHabilitarBotao] = useState(false); // Controla se o botão deve ser habilitado
  const [campos, setCampos] = useState({ // Estado para armazenar os dados do formulário
    nome: '',
    telefone: '',
    email: '',
    password: ''
  });
  const [progresso, setProgresso] = useState(0); // Estado para gerenciar a barra de progresso
  const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem de sucesso
  const [aceitaTermos, setAceitaTermos] = useState(false); // Novo estado para controlar a aceitação dos termos

  // Função para lidar com a mudança nos campos do formulário
  const estadoFormulario = (e) => {
    const { name, value } = e.target; // Extrai o nome e o valor do campo
    //essa parte aqui do prev, eu peguei da documentação do react.js não vou mentir kkakakak, se ignorar humilde
    setCampos(prev => ({ ...prev, [name]: value })); // Atualiza o estado dos campos mantendo os anteriores
  };

  {/* Parte de calcular e computar os campos para a barra de progresso usando o useEffect e as condições todas para acionar o botão a os campos estarem todos preenchidos e o aceitar termos acionado*/}
  useEffect(() => {
    const preenchidos = Object.values(campos).filter(field => field.trim() !== '').length; // Conta os campos preenchidos
    const progressoAtual = (preenchidos / 4) * 100; // Calcula o progresso como uma porcentagem
    setProgresso(progressoAtual); // Atualiza o estado da barra de progresso

    // Verifica se todos os campos estão preenchidos e se a checkbox dos termos está ativada
    setHabilitarBotao(progressoAtual === 100 && aceitaTermos); // Habilita o botão somente se todas as condições forem atendidas
  }, [campos, aceitaTermos]); // Adiciona `aceitaTermos` como dependência para que a verificação ocorra sempre que mudar

  // Alterna a visibilidade da senha
  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha); 
  };

  {/* Finaliza o formulario em si */}
  const finalizarFormulario = () => {
    if (habilitarBotao) { // Apenas executa se o botão estiver habilitado
      // Mensagem de sucesso boy
      setMensagem(`Obrigado ${campos.nome}, por abrir sua conta! Você receberá no email: ${campos.email}, detalhes sobre o recebimento do cartão.`);
    }
  };

  return (

    <div className="flex flex-column">
      <div className="formulario flex flex-column">

        {/* campo da barra de progresso, no caso, ela ira puxar a barra a cada preenchimento do progresso, onde a cada parte digitada, computa 25% da barra até 100%, e ira acionar ao ficar 100% o texto Sucesso */}
        <div className="progresso">
          <label>Preencha os campos</label>
          <progress value={progresso} max="100"></progress> {/* Barra de progresso que indica o preenchimento */}
          {progresso === 100 && <span style={{ color: 'green' }}>Sucesso!</span>} {/* Mensagem de sucesso quando a barra chega a 100% */}
        </div>

        {/* input do nome */}
        <div className="flex flex-column">
          <label htmlFor="nome">Digite seu nome</label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            onChange={estadoFormulario} 
          />
        </div>


         {/* input de telefone apenas */}
        <div className="flex flex-column">
          <label htmlFor="telefone">Digite seu telefone</label>
          <input 
            type="text" 
            id="telefone" 
            name="telefone" 
            onChange={estadoFormulario}
          />
        </div>
         
         {/*input de email apenas */}
        <div className="flex flex-column">
          <label htmlFor="email">Digite seu e-mail</label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            onChange={estadoFormulario} 
          />
        </div>

        {/* input de senha que tem a função mostrar senha que muda de tipagem de texto e password, alem de na função mudar o texto exibir ou mostrar senha */}
        <div className="flex flex-column">
          <label htmlFor="password">Digite sua senha</label>
          <input 
            type={mostrarSenha ? 'text' : 'password'} 
            id="password" 
            name="password" 
            onChange={estadoFormulario} 
          />
          <button className="mostra-senha" onClick={toggleMostrarSenha}>
            {mostrarSenha ? 'Esconder senha' : 'Exibir senha'} 
          </button>
        </div>

        {/* aceita os termos de uso e atualiza o estado da seleção para acionar o botão */}
        <div className="flex termos">
          <input
            type="checkbox"
            name="aceita-termos"
            id="aceita-termos"
            onChange={(e) => setAceitaTermos(e.target.checked)} 
          />
          <label htmlFor="aceita-termos">
          Eu li, estou ciente das condições de tratamento dos
							meus dados pessoais e dou meu consentimento, quando
							aplicável, conforme descrito nesta

          </label>
        </div>

        {/* o botão la*/}
        <div className="flex">
          <button 
            className="botao" 
            onClick={finalizarFormulario} 
            disabled={!habilitarBotao} // Desabilita o botão se não atender os requisitos que coloquei
          >
            Próximo
          </button>
        </div>

        {mensagem && <p>{mensagem}</p>} {/* Exibe a mensagem junto com as entradas de nome e email */}
      </div>
    </div>
  );
}

export default RightSide; 

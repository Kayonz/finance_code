import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: #9c6fe4;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-width: 480px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-width: unset;
    min-height: 40vh;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    min-height: 35vh;
    padding: 1rem;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: #1c1d21;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-width: 480px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    min-width: unset;
    min-height: 60vh;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: #fff;
  font-weight: 700;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const LoginTitle = styled.h2`
  font-size: 2.2rem;
  margin: 0 0 1rem 0;
  color: #fff;
  font-weight: 600;
  text-align: center;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 0 0 0.8rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin: 0 0 0.6rem 0;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  text-align: center;
  max-width: 350px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 1.5rem 0;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
    max-width: 280px;
  }
`;

const LoginSubtitle = styled.p`
  font-size: 1rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
  max-width: 350px;
  color: #fff;
  line-height: 1.5;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin: 0 0 2rem 0;
    max-width: 300px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 0 0 1.5rem 0;
    max-width: 280px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 3;
`;

const Input = styled.input`
  margin-bottom: 1.5rem;
  padding: 1rem 1.2rem;
  width: 100%;
  max-width: 380px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #ffffff;
  color: #2c3e50;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    border-color: #9c6fe4;
    outline: none;
    box-shadow: 0 0 0 3px rgba(156, 111, 228, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #adb5bd;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.9rem 1.1rem;
    font-size: 0.95rem;
    margin-bottom: 1.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #9c6fe4 0%, #8b5fd4 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 1rem 0;
  width: 100%;
  max-width: 380px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(156, 111, 228, 0.3);
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(156, 111, 228, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.9rem 1.5rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: 2px solid #9c6fe4;
  color: #9c6fe4;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  max-width: 380px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background-color: #9c6fe4;
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.7rem 1.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin: 0.5rem 0 0 0;
  text-align: center;
  font-size: 0.9rem;
  background-color: #f8d7da;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #f5c6cb;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

/* ======= Animações apenas no painel esquerdo ======= */
const float = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-40px) scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.4;
  }
`;

const FloatingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Circle = styled.div`
  position: absolute;
  width: ${({ size }) => size || 50}px;
  height: ${({ size }) => size || 50}px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  animation: ${float} ${({ duration }) => duration}s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;

  @media (max-width: 768px) {
    width: ${({ size }) => (size || 50) * 0.7}px;
    height: ${({ size }) => (size || 50) * 0.7}px;
  }

  @media (max-width: 480px) {
    width: ${({ size }) => (size || 50) * 0.5}px;
    height: ${({ size }) => (size || 50) * 0.5}px;
  }
`;

/* ====================================== */

function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';

    const payload = isLogin ? { email, senha } : { nome, email, senha };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
        } else {
          alert('Cadastro realizado com sucesso!');
          setIsLogin(true);
        }
      } else {
        setErro(data.message || 'Erro ao processar a solicitação.');
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.');
    }
  };

  const circlesData = [
    { top: '10%', left: '20%', size: 80, duration: 6, delay: 0 },
    { top: '15%', left: '70%', size: 60, duration: 8, delay: 1 },
    { top: '80%', left: '30%', size: 90, duration: 7, delay: 2 },
    { top: '85%', left: '75%', size: 70, duration: 6, delay: 0.5 },
    { top: '50%', left: '50%', size: 100, duration: 10, delay: 1.5 },
    { top: '60%', left: '10%', size: 50, duration: 5, delay: 0.7 },
    { top: '5%', left: '50%', size: 60, duration: 7, delay: 1 },
  ];

  return (
    <PageContainer>
      <LeftPanel>
        <MainTitle>Finance Soft</MainTitle>
        <Subtitle>Encurtando seu tempo e suas finanças!</Subtitle>

        <FloatingContainer>
          {circlesData.map((circle, idx) => (
            <Circle
              key={`circle-${idx}`}
              top={circle.top}
              left={circle.left}
              size={circle.size}
              duration={circle.duration}
              delay={circle.delay}
            />
          ))}
        </FloatingContainer>
      </LeftPanel>

      <RightPanel>
        <LoginTitle>{isLogin ? 'Entrar' : 'Criar Conta'}</LoginTitle>
        <LoginSubtitle>
          {isLogin
            ? 'Acesse sua conta para continuar'
            : 'Crie sua conta para começar'}
        </LoginSubtitle>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          )}
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <Button type="submit">
            {isLogin ? 'Entrar na conta' : 'Criar conta'}
          </Button>
          {erro && <ErrorMessage>{erro}</ErrorMessage>}
        </Form>

        <ToggleButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Não tem conta? Criar uma agora' : 'Já tem conta? Entrar'}
        </ToggleButton>
      </RightPanel>
    </PageContainer>
  );
}

export default LoginRegisterPage;

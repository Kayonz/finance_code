import styled from "styled-components";
import Sidebar from "../components/SideBar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

const COLORS = [
  "#7F00FF", // Roxo neon
  "#00C9A7", // Verde piscina
  "#FF5F6D", // Coral neon
  "#FFD166", // Amarelo pastel
  "#4ECDC4", // Azul água
  "#C06C84", // Rosa queimado
];

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #eff0f9 0%, #e8e9f3 100%);
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  margin-left: 220px;
  padding: 40px;
  background: transparent;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    padding-top: 80px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  overflow: hidden;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const WelcomeText = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
`;

const UserName = styled.span`
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 30px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const CardValue = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${props => props.color || '#2c3e50'};
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CardSubtext = styled.p`
  color: #7f8c8d;
  font-size: 0.85rem;
  margin: 5px 0 0 0;
  font-weight: 500;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 30px;
  }
`;

const ActionButton = styled.button`
  padding: 16px 24px;
  background: ${props => props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 15px;
  }
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ChartCard = styled(Card)`
  padding: 25px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ChartTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
`;

const Modal = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 20px;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 25px;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  margin-bottom: 25px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #667eea;
    outline: none;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ModalButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
  ` : `
    background: #f8f9fa;
    color: #6c757d;
    
    &:hover {
      background: #e9ecef;
    }
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 14px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: ${props => Math.min(props.percentage, 100)}%;
  transition: width 0.3s ease;
`;

function DashboardPage() {
  const [orcamento, setOrcamento] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [percentualGasto, setPercentualGasto] = useState(0);
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoOrcamento, setNovoOrcamento] = useState("");
  const [showConfirmZerar, setShowConfirmZerar] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userInitials, setUserInitials] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDados();
    fetchGastosPorCategoria();
    fetchUserInfo();
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUserName(data.user.nome);
        
        // Gerar iniciais do nome
        const initials = data.user.nome
          .split(' ')
          .map(word => word.charAt(0))
          .join('')
          .toUpperCase()
          .substring(0, 2);
        setUserInitials(initials);
        
        // Buscar foto de perfil se existir
        if (data.user.foto_url) { // Alterado de foto_perfil para foto_url
          setUserPhoto(`http://localhost:5000${data.user.foto_url}`); // Removido /uploads
        }
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };


  const fetchDados = async () => {
    try {
      const orcamentoRes = await fetch("http://localhost:5000/api/orcamento", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orcamentoData = await orcamentoRes.json();
      const orc = parseFloat(orcamentoData.orcamento) || 0;
      setOrcamento(orc);

      const gastosRes = await fetch("http://localhost:5000/api/gastos-por-categoria", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const gastosData = await gastosRes.json();
      const totalGastos = gastosData.reduce((sum, item) => sum + parseFloat(item.valor), 0);
      setGastos(totalGastos);

      const saldoAtual = orc - totalGastos;
      setSaldo(Math.max(saldoAtual, 0));

      const percentual = orc > 0 ? ((totalGastos / orc) * 100).toFixed(2) : 0;
      setPercentualGasto(percentual);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const fetchGastosPorCategoria = () => {
    fetch("http://localhost:5000/api/gastos-por-categoria", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data.map(item => ({
          ...item,
          valor: Number(item.valor),
        }));
        setGastosPorCategoria(parsedData);
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSetOrcamento = () => setShowModal(true);

  const handleConfirmOrcamento = () => {
    const valor = parseFloat(novoOrcamento);
    if (isNaN(valor)) {
      alert("Digite um valor válido.");
      return;
    }

    fetch("http://localhost:5000/api/orcamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ valor }),
    })
      .then((res) => res.json())
      .then(() => {
        setShowModal(false);
        setNovoOrcamento("");
        fetchDados();
      })
      .catch((err) => console.error(err));
  };

  const handleZerarOrcamento = () => setShowConfirmZerar(true);

  const handleConfirmZerar = () => {
    fetch("http://localhost:5000/api/orcamento/zerar", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setShowConfirmZerar(false);
        setOrcamento(0);
        setSaldo(0);
        setPercentualGasto(0);
      })
      .catch((err) => console.error(err));
  };

  const handleOpenCupom = () => navigate("/cupom");

  const getStatusColor = () => {
    if (percentualGasto <= 50) return "#1ab188";
    if (percentualGasto <= 80) return "#FFD166";
    return "#FF5F6D";
  };

  const getStatusText = () => {
    if (percentualGasto <= 50) return "Excelente controle!";
    if (percentualGasto <= 80) return "Atenção aos gastos";
    return "Limite ultrapassado!";
  };

  return (
    <Container>
      <Sidebar onLogout={handleLogout} />
      <ContentWrapper>
        <Header>
          <Title>Dashboard Financeiro</Title>
          <UserGreeting>
            <UserAvatar>
              {userPhoto ? (
                <img 
                  src={userPhoto} 
                  alt="Foto de perfil" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span style={{ display: userPhoto ? 'none' : 'flex' }}>
                {userInitials || "U"}
              </span>
            </UserAvatar>
            <UserInfo>
              <WelcomeText>Bem-vindo de volta,</WelcomeText>
              <UserName>{userName || "Usuário"}</UserName>
            </UserInfo>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </UserGreeting>
        </Header>

        <Cards>
          <Card gradient="linear-gradient(135deg, #1ab188 0%, #159a73 100%)">
            <CardHeader>
              <CardTitle>Saldo Disponível</CardTitle>
              <CardIcon gradient="linear-gradient(135deg, #1ab188 0%, #159a73 100%)">💰</CardIcon>
            </CardHeader>
            <CardValue color="#1ab188">R$ {saldo.toFixed(2)}</CardValue>
            <CardSubtext>Valor restante do orçamento</CardSubtext>
          </Card>

          <Card gradient="linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)">
            <CardHeader>
              <CardTitle>Gastos do Mês</CardTitle>
              <CardIcon gradient="linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)">📊</CardIcon>
            </CardHeader>
            <CardValue color="#FF5F6D">R$ {gastos.toFixed(2)}</CardValue>
            <CardSubtext>Total gasto este mês</CardSubtext>
          </Card>

          <Card gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <CardHeader>
              <CardTitle>Orçamento Total</CardTitle>
              <CardIcon gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">🎯</CardIcon>
            </CardHeader>
            <CardValue color="#667eea">R$ {orcamento.toFixed(2)}</CardValue>
            <CardSubtext>Limite definido para o mês</CardSubtext>
          </Card>

          <Card gradient={`linear-gradient(135deg, ${getStatusColor()} 0%, ${getStatusColor()}80 100%)`}>
            <CardHeader>
              <CardTitle>Status do Orçamento</CardTitle>
              <CardIcon gradient={`linear-gradient(135deg, ${getStatusColor()} 0%, ${getStatusColor()}80 100%)`}>📈</CardIcon>
            </CardHeader>
            <CardValue color={getStatusColor()}>{percentualGasto}%</CardValue>
            <CardSubtext>{getStatusText()}</CardSubtext>
            <ProgressBar>
              <ProgressFill percentage={percentualGasto} />
            </ProgressBar>
          </Card>
        </Cards>

        <Actions>
          <ActionButton 
            onClick={handleOpenCupom}
            gradient="linear-gradient(135deg, #1ab188 0%, #159a73 100%)"
          >
            📷 Ler Cupom Fiscal
          </ActionButton>
          <ActionButton 
            onClick={handleSetOrcamento}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            🎯 Definir Orçamento
          </ActionButton>
          <ActionButton 
            onClick={handleZerarOrcamento}
            gradient="linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)"
          >
            🗑️ Zerar Orçamento
          </ActionButton>
          <ActionButton 
            onClick={() => navigate("/metricas")}
            gradient="linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)"
          >
            📊 Ver Métricas
          </ActionButton>
        </Actions>

        <ChartSection>
          <ChartCard>
            <ChartTitle>Distribuição por Categoria</ChartTitle>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={gastosPorCategoria.reduce((acc, item) => {
                      const found = acc.find(c => c.categoria === item.categoria);
                      if (found) {
                        found.valor += item.valor;
                      } else {
                        acc.push({ ...item });
                      }
                      return acc;
                    }, [])}
                    dataKey="valor"
                    nameKey="categoria"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {gastosPorCategoria.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Histórico de Gastos</ChartTitle>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={gastosPorCategoria}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valor" fill="#667eea" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </ChartSection>
      </ContentWrapper>

      {/* Modal Definir Orçamento */}
      <ModalOverlay show={showModal}>
        <Modal>
          <ModalTitle>Definir Orçamento Mensal</ModalTitle>
          <Input
            type="number"
            placeholder="Digite o valor em R$"
            value={novoOrcamento}
            onChange={(e) => setNovoOrcamento(e.target.value)}
          />
          <ModalActions>
            <ModalButton onClick={() => setShowModal(false)}>Cancelar</ModalButton>
            <ModalButton primary onClick={handleConfirmOrcamento}>Salvar</ModalButton>
          </ModalActions>
        </Modal>
      </ModalOverlay>

      {/* Modal Confirmar Zerar */}
      <ModalOverlay show={showConfirmZerar}>
        <Modal>
          <ModalTitle>Confirmar Ação</ModalTitle>
          <p style={{ textAlign: "center", color: "#7f8c8d", marginBottom: "25px" }}>
            Tem certeza que deseja zerar o orçamento? Esta ação não pode ser desfeita.
          </p>
          <ModalActions>
            <ModalButton onClick={() => setShowConfirmZerar(false)}>Cancelar</ModalButton>
            <ModalButton primary onClick={handleConfirmZerar}>Confirmar</ModalButton>
          </ModalActions>
        </Modal>
      </ModalOverlay>
    </Container>
  );
}

export default DashboardPage;

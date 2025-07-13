import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import styled from 'styled-components';
import axios from 'axios';
import {
  FaChartLine,
  FaPiggyBank,
  FaBullseye,
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaCalculator,
  FaLightbulb,
} from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Montserrat', sans-serif;
`;

const ContentWrapper = styled.main`
  flex: 1;
  margin-left: ${(props) => (props.sidebarOpen ? '220px' : '70px')};
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px;
  }
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  color: #2d3748;
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #718096;
  margin: 0;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) =>
      props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const MetricIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: ${(props) =>
    props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const MetricTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => (props.positive ? '#48bb78' : '#f56565')};
  font-size: 0.9rem;
  font-weight: 600;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const MetricLabel = styled.div`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 15px;
`;

const MetricProgress = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const MetricProgressBar = styled.div`
  height: 100%;
  background: ${(props) =>
    props.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  width: ${(props) => props.percentage || 0}%;
  transition: width 0.8s ease;
`;

const SimulatorSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
`;

const SimulatorTitle = styled.h2`
  color: #2d3748;
  margin: 0 0 25px 0;
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SimulatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
`;

const ResultValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ResultLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const InsightsSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InsightsTitle = styled.h2`
  color: #2d3748;
  margin: 0 0 25px 0;
  font-size: 1.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const InsightCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.gradient || '#667eea 0%, #764ba2 100%'}
  );
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const InsightIcon = styled.div`
  font-size: 1.5rem;
`;

const InsightText = styled.div`
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  color: #718096;
  font-size: 1.1rem;
`;

const ErrorState = styled.div`
  background: rgba(254, 178, 178, 0.9);
  color: #c53030;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
`;

function MetricasPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [metricas, setMetricas] = useState({
    totalGastos: 0,
    valorPoupado: 0,
    rendimentoCDI: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulatorValues, setSimulatorValues] = useState({
    valorMensal: 500,
    periodo: 12,
    tipoInvestimento: 'poupanca',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMetricas = async () => {
      if (!token) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/metricas', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMetricas(response.data);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar métricas:', error);
        setError('Não foi possível carregar as métricas financeiras.');
        // Dados de fallback para demonstração
        setMetricas({
          totalGastos: 2450.75,
          valorPoupado: 1200.0,
          rendimentoCDI: 85.5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetricas();
  }, [token]);

  const calcularRendimento = () => {
    const { valorMensal, periodo, tipoInvestimento } = simulatorValues;
    const taxas = {
      poupanca: 0.005, // 0.5% ao mês
      cdi: 0.008, // 0.8% ao mês
      tesouro: 0.007, // 0.7% ao mês
      acoes: 0.012, // 1.2% ao mês (mais arriscado)
    };

    const taxa = taxas[tipoInvestimento];
    let total = 0;

    for (let i = 0; i < periodo; i++) {
      total = (total + valorMensal) * (1 + taxa);
    }

    return total;
  };

  const metaMensal = 3000;
  const percentualMeta = Math.min(
    (metricas.totalGastos / metaMensal) * 100,
    100,
  );
  const economiaProjetada = Math.max(0, metaMensal - metricas.totalGastos);

  if (loading) {
    return (
      <Container>
        <Sidebar onSidebarToggle={setSidebarOpen} />
        <ContentWrapper sidebarOpen={sidebarOpen}>
          <LoadingState>Carregando métricas financeiras...</LoadingState>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebar onSidebarToggle={setSidebarOpen} />
      <ContentWrapper sidebarOpen={sidebarOpen}>
        <Header>
          <Title>Métricas Financeiras</Title>
          <Subtitle>
            Acompanhe seu progresso financeiro e planeje seu futuro
          </Subtitle>
        </Header>

        {error && <ErrorState>{error}</ErrorState>}

        <MetricsGrid>
          <MetricCard gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <MetricHeader>
              <MetricIcon gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                <FaWallet />
              </MetricIcon>
              <MetricTrend positive={false}>
                <FaArrowDown />
                12%
              </MetricTrend>
            </MetricHeader>
            <MetricValue>R$ {metricas.totalGastos.toFixed(2)}</MetricValue>
            <MetricLabel>Total gasto este mês</MetricLabel>
            <MetricProgress>
              <MetricProgressBar
                percentage={percentualMeta}
                gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
            </MetricProgress>
          </MetricCard>

          <MetricCard gradient="linear-gradient(135deg, #48bb78 0%, #38a169 100%)">
            <MetricHeader>
              <MetricIcon gradient="linear-gradient(135deg, #48bb78 0%, #38a169 100%)">
                <FaPiggyBank />
              </MetricIcon>
              <MetricTrend positive={true}>
                <FaArrowUp />
                8%
              </MetricTrend>
            </MetricHeader>
            <MetricValue>R$ {metricas.valorPoupado.toFixed(2)}</MetricValue>
            <MetricLabel>Valor poupado</MetricLabel>
            <MetricProgress>
              <MetricProgressBar
                percentage={75}
                gradient="linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
              />
            </MetricProgress>
          </MetricCard>

          <MetricCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            <MetricHeader>
              <MetricIcon gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                <FaChartLine />
              </MetricIcon>
              <MetricTrend positive={true}>
                <FaArrowUp />
                15%
              </MetricTrend>
            </MetricHeader>
            <MetricValue>R$ {metricas.rendimentoCDI.toFixed(2)}</MetricValue>
            <MetricLabel>Rendimento simulado (CDI)</MetricLabel>
            <MetricProgress>
              <MetricProgressBar
                percentage={60}
                gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              />
            </MetricProgress>
          </MetricCard>

          <MetricCard gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <MetricHeader>
              <MetricIcon gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                <FaBullseye />
              </MetricIcon>
              <MetricTrend positive={economiaProjetada > 0}>
                {economiaProjetada > 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(economiaProjetada).toFixed(0)}
              </MetricTrend>
            </MetricHeader>
            <MetricValue>R$ {economiaProjetada.toFixed(2)}</MetricValue>
            <MetricLabel>Economia projetada este mês</MetricLabel>
            <MetricProgress>
              <MetricProgressBar
                percentage={
                  economiaProjetada > 0
                    ? (economiaProjetada / metaMensal) * 100
                    : 0
                }
                gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              />
            </MetricProgress>
          </MetricCard>
        </MetricsGrid>

        <SimulatorSection>
          <SimulatorTitle>
            <FaCalculator />
            Simulador de Economia
          </SimulatorTitle>
          <SimulatorGrid>
            <div>
              <InputGroup>
                <InputLabel>Valor mensal para investir</InputLabel>
                <Input
                  type="number"
                  value={simulatorValues.valorMensal}
                  onChange={(e) =>
                    setSimulatorValues({
                      ...simulatorValues,
                      valorMensal: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="R$ 500,00"
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Período (meses)</InputLabel>
                <Input
                  type="number"
                  value={simulatorValues.periodo}
                  onChange={(e) =>
                    setSimulatorValues({
                      ...simulatorValues,
                      periodo: parseInt(e.target.value) || 1,
                    })
                  }
                  placeholder="12"
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Tipo de investimento</InputLabel>
                <Select
                  value={simulatorValues.tipoInvestimento}
                  onChange={(e) =>
                    setSimulatorValues({
                      ...simulatorValues,
                      tipoInvestimento: e.target.value,
                    })
                  }
                >
                  <option value="poupanca">Poupança (0.5% a.m.)</option>
                  <option value="cdi">CDI (0.8% a.m.)</option>
                  <option value="tesouro">Tesouro Direto (0.7% a.m.)</option>
                  <option value="acoes">Ações (1.2% a.m.)</option>
                </Select>
              </InputGroup>
            </div>

            <ResultCard>
              <ResultValue>R$ {calcularRendimento().toFixed(2)}</ResultValue>
              <ResultLabel>
                Valor total após {simulatorValues.periodo} meses
              </ResultLabel>
              <div
                style={{ marginTop: '15px', fontSize: '0.9rem', opacity: 0.8 }}
              >
                Investimento total: R${' '}
                {(
                  simulatorValues.valorMensal * simulatorValues.periodo
                ).toFixed(2)}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                Rendimento: R${' '}
                {(
                  calcularRendimento() -
                  simulatorValues.valorMensal * simulatorValues.periodo
                ).toFixed(2)}
              </div>
            </ResultCard>
          </SimulatorGrid>
        </SimulatorSection>

        <InsightsSection>
          <InsightsTitle>
            <FaLightbulb />
            Insights Financeiros
          </InsightsTitle>

          <InsightCard gradient="#48bb78 0%, #38a169 100%">
            <InsightIcon>🎯</InsightIcon>
            <InsightText>
              Você gastou R$ {metricas.totalGastos.toFixed(2)} este mês.
              {economiaProjetada > 0
                ? ` Parabéns! Você está economizando R$ ${economiaProjetada.toFixed(2)} em relação à sua meta.`
                : ` Considere revisar seus gastos para atingir sua meta mensal.`}
            </InsightText>
          </InsightCard>

          <InsightCard gradient="#667eea 0%, #764ba2 100%">
            <InsightIcon>💰</InsightIcon>
            <InsightText>
              Com R$ {metricas.valorPoupado.toFixed(2)} poupados, você já tem
              uma boa reserva! Continue mantendo esse ritmo para atingir seus
              objetivos financeiros.
            </InsightText>
          </InsightCard>

          <InsightCard gradient="#f093fb 0%, #f5576c 100%">
            <InsightIcon>📈</InsightIcon>
            <InsightText>
              Seu rendimento simulado no CDI é de R${' '}
              {metricas.rendimentoCDI.toFixed(2)}. Investindo R${' '}
              {simulatorValues.valorMensal} mensalmente, você teria R${' '}
              {calcularRendimento().toFixed(2)} em {simulatorValues.periodo}{' '}
              meses!
            </InsightText>
          </InsightCard>

          <InsightCard gradient="#4facfe 0%, #00f2fe 100%">
            <InsightIcon>🚀</InsightIcon>
            <InsightText>
              Dica: Diversifique seus investimentos! Considere alocar parte do
              seu dinheiro em diferentes tipos de investimento para maximizar
              seus rendimentos.
            </InsightText>
          </InsightCard>
        </InsightsSection>
      </ContentWrapper>
    </Container>
  );
}

export default MetricasPage;

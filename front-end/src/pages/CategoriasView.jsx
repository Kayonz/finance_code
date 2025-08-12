import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/SideBar';
import {
  FaChartLine,
  FaCalendarAlt,
  FaShoppingCart,
  FaSearch,
} from 'react-icons/fa';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh; /* Alterado de height para min-height */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Montserrat', sans-serif;
  display: flex;
  position: relative;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  margin-left: ${(props) => (props.sidebarOpen ? '220px' : '70px')};
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  width: calc(100% - ${(props) => (props.sidebarOpen ? '220px' : '70px')});
  min-height: 100vh; /* Adicionado min-height aqui também */
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
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

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
  max-width: 500px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: none;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #2d3748;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 1.1rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const CategoriaCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const CategoriaNome = styled.h3`
  margin: 0;
  color: #2d3748;
  font-size: 1.4rem;
  font-weight: 600;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ExpandIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  transform: rotate(${(props) => (props.aberto ? '180deg' : '0deg')});

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    color: #667eea;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
`;

const TotalGasto = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TotalLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 15px;
`;

const DetalhesWrapper = styled.div`
  overflow: hidden;
  max-height: ${(props) => (props.aberto ? `${props.contentHeight}px` : '0')};
  transition: max-height 0.4s ease;
`;

const DetalhesContent = styled.div`
  padding-top: 20px;
  border-top: 2px solid rgba(102, 126, 234, 0.1);
  margin-top: 15px;
`;

const DetalhesTitle = styled.h4`
  color: #2d3748;
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const GastosList = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
  }
`;

const GastoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const GastoInfo = styled.div`
  flex: 1;
`;

const GastoDescricao = styled.div`
  color: #2d3748;
  font-weight: 500;
  margin-bottom: 4px;
`;

const GastoData = styled.div`
  color: #718096;
  font-size: 0.85rem;
`;

const GastoValor = styled.div`
  color: #e53e3e;
  font-weight: 700;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #718096;

  svg {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #cbd5e0;
  }

  h3 {
    margin: 0 0 10px 0;
    color: #4a5568;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
  }
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

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [gastosPorCategoria, setGastosPorCategoria] = useState({});
  const [abertoId, setAbertoId] = useState(null); // Alterado para armazenar apenas o ID da categoria aberta
  const [contentHeights, setContentHeights] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const detalhesRefs = useRef({});
  const token = localStorage.getItem('token');

  // Carrega categorias
  useEffect(() => {
    if (!token) {
      setError('Usuário não autenticado.');
      return;
    }

    fetch('http://localhost:5000/api/categorias', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar categorias');
        return res.json();
      })
      .then((data) => {
        setCategorias(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar as categorias.');
      });
  }, [token]);

  // Atualiza altura do detalhe para animação
  useEffect(() => {
    const heights = {};
    categorias.forEach((cat) => {
      const el = detalhesRefs.current[cat.id];
      if (el) heights[cat.id] = el.scrollHeight;
    });
    setContentHeights(heights);
  }, [categorias, gastosPorCategoria]);

  // Alterna aberto/fechado e carrega gastos da categoria se abrir
  const toggleAberto = (id) => {
    // Se a categoria clicada já estiver aberta, fecha. Senão, abre a nova.
    const novoAbertoId = abertoId === id ? null : id;
    setAbertoId(novoAbertoId);

    if (novoAbertoId && !gastosPorCategoria[id]) {
      fetch(`http://localhost:5000/api/categorias/${id}/gastos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Erro ao carregar gastos da categoria');
          return res.json();
        })
        .then((data) => {
          setGastosPorCategoria((prev) => ({ ...prev, [id]: data }));
        })
        .catch((err) => {
          console.error(err);
          setGastosPorCategoria((prev) => ({ ...prev, [id]: [] }));
        });
    }
  };

  // Filtra categorias baseado na busca
  const categoriasFiltradas = categorias.filter((cat) =>
    cat.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Função para formatar data
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Container>
      <Sidebar onSidebarToggle={setSidebarOpen} />
      <ContentWrapper sidebarOpen={sidebarOpen}>
        <Header>
          <Title>Categorias de Gastos</Title>
          <Subtitle>
            Visualize e gerencie seus gastos organizados por categoria
          </Subtitle>
        </Header>

        {error && <ErrorState>{error}</ErrorState>}

        {!error && (
          <>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Buscar categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon />
            </SearchContainer>

            {categorias.length === 0 ? (
              <LoadingState>Carregando categorias...</LoadingState>
            ) : categoriasFiltradas.length === 0 ? (
              <EmptyState>
                <FaShoppingCart />
                <h3>Nenhuma categoria encontrada</h3>
                <p>Tente ajustar sua busca ou adicione novas categorias</p>
              </EmptyState>
            ) : (
              <CategoriesGrid>
                {categoriasFiltradas.map((cat) => {
                  const gastos = gastosPorCategoria[cat.id];
                  const totalGasto = gastos
                    ? gastos.reduce(
                        (acc, gasto) => acc + parseFloat(gasto.valor || 0),
                        0,
                      )
                    : 0;
                  const quantidadeGastos = gastos ? gastos.length : 0;

                  return (
                    <CategoriaCard
                      key={cat.id}
                      onClick={() => toggleAberto(cat.id)}
                    >
                      <CardHeader>
                        <CategoriaNome>{cat.nome}</CategoriaNome>
                        <ExpandIcon aberto={abertoId === cat.id}>
                          ▲
                        </ExpandIcon>{' '}
                        {/* Alterado aqui */}
                      </CardHeader>

                      <TotalGasto>
                        {gastos
                          ? `R$ ${totalGasto.toFixed(2)}`
                          : 'Carregando...'}
                      </TotalGasto>
                      <TotalLabel>Total gasto na categoria</TotalLabel>

                      <StatsContainer>
                        <StatItem>
                          <FaShoppingCart />
                          {gastos
                            ? `${quantidadeGastos} gastos`
                            : 'Carregando...'}
                        </StatItem>
                        {gastos && gastos.length > 0 && (
                          <StatItem>
                            <FaChartLine />
                            R$ {(totalGasto / quantidadeGastos).toFixed(2)}{' '}
                            média
                          </StatItem>
                        )}
                      </StatsContainer>

                      <DetalhesWrapper
                        aberto={abertoId === cat.id} /* Alterado aqui */
                        contentHeight={contentHeights[cat.id] || 0}
                      >
                        <DetalhesContent
                          ref={(el) => (detalhesRefs.current[cat.id] = el)}
                        >
                          <DetalhesTitle>Histórico de Gastos</DetalhesTitle>
                          <GastosList>
                            {gastos ? (
                              gastos.length > 0 ? (
                                gastos.map((gasto, index) => (
                                  <GastoItem key={index}>
                                    <GastoInfo>
                                      <GastoDescricao>
                                        {gasto.descricao}
                                      </GastoDescricao>
                                      <GastoData>
                                        <FaCalendarAlt
                                          style={{ marginRight: '5px' }}
                                        />
                                        {formatarData(gasto.data_compra)}
                                      </GastoData>
                                    </GastoInfo>
                                    <GastoValor>
                                      -R$ {parseFloat(gasto.valor).toFixed(2)}
                                    </GastoValor>
                                  </GastoItem>
                                ))
                              ) : (
                                <EmptyState>
                                  <FaShoppingCart />
                                  <h3>Nenhum gasto registrado</h3>
                                  <p>Esta categoria ainda não possui gastos</p>
                                </EmptyState>
                              )
                            ) : (
                              <LoadingState>Carregando gastos...</LoadingState>
                            )}
                          </GastosList>
                        </DetalhesContent>
                      </DetalhesWrapper>
                    </CategoriaCard>
                  );
                })}
              </CategoriesGrid>
            )}
          </>
        )}
      </ContentWrapper>
    </Container>
  );
}

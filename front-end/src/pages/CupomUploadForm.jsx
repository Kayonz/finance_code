import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #1c1c3c;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #eff0f9;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-y: auto;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    max-width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    margin: 0;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    max-width: 95%;
    max-height: 85vh;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #25267e;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #25267e;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 12px 14px;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  font-weight: 600;
  background-color: #25267e;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #1c1c5a;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
    font-size: 16px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    margin-top: 8px;
  }
`;

const FileInputWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  margin: 0 auto 20px auto;
  background-color: #25267e;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  max-width: 280px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  min-height: 50px;

  &:hover {
    background-color: #1c1c5a;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px 20px;
    margin-bottom: 16px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 14px 16px;
    margin-bottom: 12px;
    font-size: 15px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorText = styled.p`
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
  padding: 10px;
  background-color: #fdf2f2;
  border-radius: 6px;
  border: 1px solid #fecaca;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 0.8rem;
    padding: 8px;
  }
`;

const SuccessText = styled.p`
  color: #27ae60;
  margin-top: 1rem;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  background-color: #f0f9f4;
  border-radius: 6px;
  border: 1px solid #bbf7d0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 0.8rem;
    padding: 8px;
  }
`;

const ResultSection = styled.div`
  margin-top: 1.5rem;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;

  h3 {
    color: #25267e;
    margin-bottom: 12px;
    font-size: 1.1rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 8px 12px;
    margin-bottom: 6px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    color: #333;
  }

  @media (max-width: 768px) {
    margin-top: 1.2rem;
    padding: 12px;

    h3 {
      font-size: 1rem;
      margin-bottom: 10px;
    }

    li {
      padding: 6px 10px;
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
    padding: 10px;

    li {
      padding: 6px 8px;
      font-size: 12px;
    }
  }
`;

const FileName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #25267e;
  text-align: center;
  font-weight: 500;
  padding: 8px;
  background-color: #f0f0f9;
  border-radius: 6px;
  word-break: break-all;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-top: 8px;
    padding: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 6px;
    padding: 6px;
  }
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 8px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: 6px;
  }
`;

const CupomUploadForm = ({ onGastosAtualizados }) => {
  const [file, setFile] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Detecta se é dispositivo móvel
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase(),
        );
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/categorias', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erro ao buscar categorias');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error('Erro ao buscar categorias', err);
        setError('Erro ao carregar categorias');
      }
    };

    fetchCategorias();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultado(null);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file || !categoriaSelecionada) {
      setError('Selecione uma categoria e um arquivo.');
      setSuccess(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('imagem', file);
      formData.append('categoriaId', categoriaSelecionada);

      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/cupom', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Erro ao processar cupom');
        setLoading(false);
        return;
      }

      setResultado(data);
      setSuccess('Cupom processado com sucesso!');

      if (typeof onGastosAtualizados === 'function') {
        onGastosAtualizados();
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar o cupom');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Sidebar />
      <MainContent>
        <Card>
          <Title>Leitura de Cupom Fiscal</Title>

          <Select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="">Selecione uma Categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </Select>

          <FileInputWrapper>
            {file
              ? file.name
              : isMobile
                ? 'Selecionar da Galeria'
                : 'Selecionar Arquivo'}
            <HiddenInput
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </FileInputWrapper>

          {isMobile && (
            <InfoText>
              📱 Apenas seleção da galeria de fotos disponível
            </InfoText>
          )}

          {file && <FileName>Arquivo: {file.name}</FileName>}

          <Button
            onClick={handleUpload}
            disabled={loading || !file || !categoriaSelecionada}
          >
            {loading ? 'Processando...' : 'Ler Cupom'}
          </Button>

          <Button onClick={() => navigate('/categorias')}>
            Ver Categorias
          </Button>

          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>{success}</SuccessText>}

          {resultado && resultado.produtos && (
            <ResultSection>
              <h3>Itens encontrados:</h3>
              <ul>
                {resultado.produtos.map((item, index) => (
                  <li key={index}>
                    {item.nome} - R$ {Number(item.valor).toFixed(2)}
                  </li>
                ))}
              </ul>
            </ResultSection>
          )}
        </Card>
      </MainContent>
    </Page>
  );
};

export default CupomUploadForm;

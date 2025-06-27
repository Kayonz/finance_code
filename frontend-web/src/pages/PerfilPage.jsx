import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #eff0f9 0%, #e8e9f3 100%);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 40px 60px;
  overflow-y: auto;
  margin-left: 220px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    padding-top: 80px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    border-radius: 20px;
    margin: 0 10px;
  }
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const FotoPreview = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const DefaultAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 600;
  border: 4px solid #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
`;

const PhotoUploadButton = styled.label`
  background: linear-gradient(135deg, #1ab188 0%, #159a73 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 177, 136, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 177, 136, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  background-color: #fff;
  transition: all 0.3s ease;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border-color: #667eea;
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #bdc3c7;
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 10px 15px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
`;

const SuccessMsg = styled.p`
  color: #27ae60;
  margin: 0;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 10px 15px;
  background: rgba(39, 174, 96, 0.1);
  border-radius: 8px;
  border-left: 4px solid #27ae60;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const Button = styled.button`
  flex: 1;
  background: ${props => props.variant === 'secondary' 
    ? 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  font-weight: 700;
  padding: 16px 0;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 14px 0;
    font-size: 15px;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const InfoCard = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 20px;
  }
`;

const InfoTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const InfoText = styled.p`
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

function EditarPerfil() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [fotoAtualUrl, setFotoAtualUrl] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar perfil");
        return res.json();
      })
      .then((data) => {
        setNome(data.user.nome);
        setEmail(data.user.email);
        if (data.user.foto_url) {
          setFotoAtualUrl(`http://localhost:5000/uploads/${data.user.foto_url}`);
        }
      })
      .catch(() => {
        setErro("Falha ao carregar perfil, faça login novamente");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  useEffect(() => {
    if (!fotoPerfil) {
      setPreviewFoto(null);
      return;
    }
    const objectUrl = URL.createObjectURL(fotoPerfil);
    setPreviewFoto(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [fotoPerfil]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    if ((senha || confirmarSenha) && senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      setLoading(false);
      return;
    }
    if (senha && senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    if (senha) formData.append("senha", senha);
    if (fotoPerfil) formData.append("fotoPerfil", fotoPerfil);

    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao atualizar perfil");
      
      const data = await res.json();
      setSucesso("Perfil atualizado com sucesso!");
      
      if (data.user.foto_url) {
        setFotoAtualUrl(`http://localhost:5000/uploads/${data.user.foto_url}`);
      }
      
      setSenha("");
      setConfirmarSenha("");
      setFotoPerfil(null);
      setPreviewFoto(null);
      
      setTimeout(() => setSucesso(""), 5000);
    } catch (error) {
      setErro("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErro("A imagem deve ter no máximo 5MB.");
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErro("Por favor, selecione apenas arquivos de imagem.");
        return;
      }
      setFotoPerfil(file);
      setErro("");
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <Title>Meu Perfil</Title>
          <Subtitle>Gerencie suas informações pessoais e configurações</Subtitle>
        </Header>

        <ProfileCard>
          <PhotoSection>
            <PhotoContainer>
              {previewFoto ? (
                <FotoPreview src={previewFoto} alt="Preview da foto" />
              ) : fotoAtualUrl ? (
                <FotoPreview src={fotoAtualUrl} alt="Foto atual" />
              ) : (
                <DefaultAvatar>
                  {nome ? getInitials(nome) : "U"}
                </DefaultAvatar>
              )}
            </PhotoContainer>
            
            <PhotoUploadButton>
              📷 Alterar Foto
              <HiddenInput
                type="file"
                onChange={handlePhotoChange}
                accept="image/*"
              />
            </PhotoUploadButton>
          </PhotoSection>

          <InfoCard>
            <InfoTitle>💡 Dicas para sua foto de perfil</InfoTitle>
            <InfoText>
              Use uma foto clara e bem iluminada. Formatos aceitos: JPG, PNG. 
              Tamanho máximo: 5MB. A foto será redimensionada automaticamente.
            </InfoText>
          </InfoCard>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nome Completo</Label>
              <Input 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required 
                placeholder="Digite seu nome completo"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Digite seu email"
              />
            </FormGroup>

            <FormGroup>
              <Label>Nova Senha</Label>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Deixe em branco para manter a atual"
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirmar Nova Senha</Label>
              <Input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme a nova senha"
              />
            </FormGroup>

            {erro && <ErrorMsg>{erro}</ErrorMsg>}
            {sucesso && <SuccessMsg>{sucesso}</SuccessMsg>}

            <ButtonGroup>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <LoadingSpinner />}
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </ButtonGroup>
          </Form>
        </ProfileCard>
      </Content>
    </Container>
  );
}

export default EditarPerfil;

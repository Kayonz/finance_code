import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaChartPie,
  FaSignOutAlt,
  FaBars,
  FaCamera,
  FaTimes,
} from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillSignal } from 'react-icons/ai';

const SidebarContainer = styled.div`
  height: 100vh;
  width: ${(props) => (props.isOpen ? '220px' : '70px')};
  background: linear-gradient(180deg, #6a0099 0%, #4a0066 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? '280px' : '0')};
    transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
    box-shadow: ${(props) =>
      props.isOpen ? '0 0 50px rgba(0, 0, 0, 0.5)' : 'none'};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 25px;
  z-index: 1001;
  background: linear-gradient(135deg, #6a0099 0%, #4a0066 100%);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(106, 0, 153, 0.4);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(106, 0, 153, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    backdrop-filter: blur(2px);
  }
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOpen ? 'space-between' : 'center')};
  min-height: 70px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 15px 20px;
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  @media (max-width: 768px) {
    display: flex;
    font-size: 1rem;
  }
`;

const LogoText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
`;

const ToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MenuContainer = styled.div`
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin: 4px 12px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }

  &::before {
    content: \'\'; /* Corrigido: removido o escape extra */
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #ff6b6b 0%, #feca57 100%);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleY(1);
  }

  svg {
    margin-right: ${(props) => (props.isOpen ? '16px' : '0')};
    font-size: 1.3rem;
    min-width: 20px;
    flex-shrink: 0;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      margin-right: 16px;
    }
  }

  span {
    display: ${(props) => (props.isOpen ? 'inline' : 'none')};
    font-weight: 500;
    font-size: 0.95rem;
    white-space: nowrap;
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: opacity 0.3s ease;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      display: inline;
      opacity: 1;
    }
  }
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin: 4px 12px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
    color: white;
  }

  &:active {
    transform: translateX(2px);
  }

  &::before {
    content: \'\'; /* Corrigido: removido o escape extra */
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #ff6b6b 0%, #feca57 100%);
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleY(1);
  }

  svg {
    margin-right: ${(props) => (props.isOpen ? '16px' : '0')};
    font-size: 1.3rem;
    min-width: 20px;
    flex-shrink: 0;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      margin-right: 16px;
    }
  }

  span {
    display: ${(props) => (props.isOpen ? 'inline' : 'none')};
    font-weight: 500;
    font-size: 0.95rem;
    white-space: nowrap;
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: opacity 0.3s ease;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
      display: inline;
      opacity: 1;
    }
  }
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const UserInfo = styled.div`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  overflow: hidden; /* Adicionado para garantir que a imagem se ajuste */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Sidebar({ onSidebarToggle }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userData, setUserData] = useState({
    nome: 'Usuário',
    role: 'Administrador',
    foto_url: null,
  }); // Adicionado foto_url
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      'resize',
      handleResize,
    ); /* Corrigido: removido o escape extra */
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Buscar dados do usuário do localStorage ou API
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Tentar buscar dados do usuário da API
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData({
              nome: data.user.nome || 'Usuário', // Acessar data.user.nome
              role: data.user.role || 'Usuário', // Assumindo que a role vem em data.user.role
              foto_url: data.user.foto_url
                ? `http://localhost:5000${data.user.foto_url}`
                : null, // Construir URL da foto
            });
          }
        }
      } catch (error) {
        console.log('Erro ao buscar dados do usuário:', error);
        // Manter dados padrão se houver erro
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (onSidebarToggle) {
      onSidebarToggle(isOpen && !isMobile);
    }
  }, [isOpen, isMobile, onSidebarToggle]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleMenuClick = (path) => {
    navigate(path);
    closeSidebar();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      {/* Botão móvel sempre visível */}
      <MobileMenuButton onClick={toggleSidebar}>
        <FaBars />
      </MobileMenuButton>

      <Overlay isOpen={isOpen && isMobile} onClick={closeSidebar} />

      <SidebarContainer isOpen={isOpen}>
        <Header isOpen={isOpen}>
          <Logo isOpen={isOpen}>
            <FaChartPie />
            <LogoText>FinanceApp</LogoText>
          </Logo>
          <ToggleButton onClick={toggleSidebar}>
            {isMobile && isOpen ? <FaTimes /> : <FaBars />}
          </ToggleButton>
        </Header>

        <MenuContainer>
          <MenuItem
            isOpen={isOpen}
            onClick={() => handleMenuClick('/dashboard')}
          >
            <FaChartPie />
            <span>Dashboard</span>
          </MenuItem>

          <MenuItem isOpen={isOpen} onClick={() => handleMenuClick('/cupom')}>
            <FaCamera />
            <span>Ler Cupom Fiscal</span>
          </MenuItem>

          <MenuItem
            isOpen={isOpen}
            onClick={() => handleMenuClick('/categorias')}
          >
            <MdCategory />
            <span>Categorias</span>
          </MenuItem>

          <MenuItem
            isOpen={isOpen}
            onClick={() => handleMenuClick('/metricas')}
          >
            <AiFillSignal />
            <span>Métricas</span>
          </MenuItem>

          <MenuLink to="/perfil" isOpen={isOpen} onClick={closeSidebar}>
            <FaUser />
            <span>Editar Perfil</span>
          </MenuLink>

          <MenuItem isOpen={isOpen} onClick={() => handleMenuClick('/login')}>
            <FaSignOutAlt />
            <span>Sair</span>
          </MenuItem>
        </MenuContainer>

        <Footer>
          <UserInfo isOpen={isOpen}>
            <Avatar>
              {userData.foto_url ? (
                <img src={userData.foto_url} alt="Foto de Perfil" />
              ) : (
                getInitials(userData.nome)
              )}
            </Avatar>
            <UserDetails>
              <UserName>{userData.nome}</UserName>
              <UserRole>{userData.role}</UserRole>
            </UserDetails>
          </UserInfo>
        </Footer>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;

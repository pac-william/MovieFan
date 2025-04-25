import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiHome, FiLogOut, FiMenu, FiStar, FiUser, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/streamly_logo.png';

const SidebarWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Sidebar = styled.aside`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  background-color: #141414;
  color: #e5e5e5;
  padding: ${(props) => (props.isOpen ? '20px' : '0')};
  box-shadow: ${(props) => (props.isOpen ? '2px 0 5px rgba(0, 0, 0, 0.5)' : 'none')};
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  
  @media (max-width: 768px) {
    width: ${(props) => (props.isOpen ? '100%' : '0')};
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: ${(props) => (props.isOpen ? '250px' : '0')};
  background-color: #141414;
  color: #e5e5e5;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: left 0.3s ease;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: ${props => props.showHamburger ? 'block' : 'none'};
    left: ${(props) => (props.isOpen ? 'auto' : '0')};
    right: ${(props) => (props.isOpen ? '10px' : 'auto')};
    top: ${(props) => (props.isOpen ? '10px' : '20px')};
  }

  &:hover {
    background-color: #333333;
  }
`;

const HamburgerButton = styled.button`
  position: fixed;
  top: 20px;
  left: 10px;
  background-color: #141414;
  color: #e5e5e5;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 999;
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'none' : 'block'};
  }

  &:hover {
    background-color: #333333;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  height: 50px;
  transition: background-color 0.3s ease;
  color: #e5e5e5;
  font-size: 16px;
  border-radius: 3px;
  
  @media (min-width: 768px) {
    font-size: 18px;
  }

  &:hover {
    background-color: #333333;
    color: #ffffff;
    cursor: pointer;
  }
`;

const SidebarLink = styled.p`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 500;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #333333;
  text-align: center;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  max-width: 180px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Verificar no carregamento
    checkScreenSize();

    // Adicionar evento para monitorar redimensionamento
    window.addEventListener('resize', checkScreenSize);

    // Remover evento quando o componente for desmontado
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarWrapper>
      <HamburgerButton onClick={toggleSidebar} isOpen={isOpen}>
        <FiMenu size={24} />
      </HamburgerButton>

      <ToggleButton isOpen={isOpen} onClick={toggleSidebar} showHamburger={!isMobile}>
        {isOpen ? (isMobile ? <FiX size={24} /> : <FiChevronLeft size={20} />) : <FiChevronRight size={20} />}
      </ToggleButton>

      <SidebarOverlay isOpen={isOpen} onClick={toggleSidebar} />

      <Sidebar isOpen={isOpen}>
        <Logo src={logo} alt="Logo" />
        <SidebarList>
          <SidebarItem as={Link} to="/" onClick={isMobile ? toggleSidebar : undefined}>
            <FiHome size={20} />
            <SidebarLink>Página Inicial</SidebarLink>
          </SidebarItem>
          <SidebarItem as={Link} to="/favoritos" onClick={isMobile ? toggleSidebar : undefined}>
            <FiStar size={20} />
            <SidebarLink>Favoritos</SidebarLink>
          </SidebarItem>
          <SidebarItem as={Link} to="/perfil" onClick={isMobile ? toggleSidebar : undefined}>
            <FiUser size={20} />
            <SidebarLink>Perfil</SidebarLink>
          </SidebarItem>
        </SidebarList>
        <SidebarFooter>
          <SidebarItem as={Link} to="/logout" onClick={isMobile ? toggleSidebar : undefined}>
            <FiLogOut size={20} />
            <SidebarLink>Sair</SidebarLink>
          </SidebarItem>
        </SidebarFooter>
      </Sidebar>
    </SidebarWrapper>
  );
}

export default SidebarComponent;

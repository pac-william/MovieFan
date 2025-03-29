import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight, FiHome, FiFilm, FiTv, FiInfo, FiLogOut, FiSettings } from 'react-icons/fi';

const Sidebar = styled.aside`
  width: ${(props) => (props.isOpen ? '250px' : '0')};
  background-color: #1a252f;
  color: #dcdcdc;
  padding: ${(props) => (props.isOpen ? '20px' : '0')};
  box-shadow: ${(props) => (props.isOpen ? '2px 0 5px rgba(0, 0, 0, 0.2)' : 'none')};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: ${(props) => (props.isOpen ? '250px' : '0')};
  background-color: #1a252f;
  color: #dcdcdc;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: left 0.3s ease;

  &:hover {
    background-color: #162029;
  }
`;

const SidebarTitle = styled.h2`
  margin-top: 0;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  height: 50px;
  transition: background-color 0.3s ease;
  color: #dcdcdc;
  font-size: 18px;
  border-radius: 5px;

  &:hover {
    background-color: #f0f0f0;
    color: #333; /* Tom escuro no hover */
    cursor: pointer;
  }
`;

const SidebarLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #dcdcdc;
  text-align: center;
`;

function SidebarComponent() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
                {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </ToggleButton>
            <Sidebar isOpen={isOpen}>
                <SidebarTitle>MovieFan</SidebarTitle>
                <SidebarList>
                    <SidebarItem>
                        <FiHome size={20} />
                        <SidebarLink href="#home">Home</SidebarLink>
                    </SidebarItem>
                    <SidebarItem>
                        <FiFilm size={20} />
                        <SidebarLink href="#movies">Filmes</SidebarLink>
                    </SidebarItem>
                    <SidebarItem>
                        <FiTv size={20} />
                        <SidebarLink href="#series">Séries</SidebarLink>
                    </SidebarItem>
                    <SidebarItem>
                        <FiInfo size={20} />
                        <SidebarLink href="#about">Sobre</SidebarLink>
                    </SidebarItem>
                </SidebarList>
                <SidebarFooter>
                    <SidebarItem>
                        <FiLogOut size={20} />
                        <SidebarLink href="#logout">Sair</SidebarLink>
                    </SidebarItem>
                    <SidebarItem>
                        <FiSettings size={20} />
                        <SidebarLink href="#settings">Configurações</SidebarLink>
                    </SidebarItem>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}

export default SidebarComponent;

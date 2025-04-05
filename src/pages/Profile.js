import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #e5e5e5;
  margin-bottom: 30px;
  font-size: 32px;
`;

const ProfileCard = styled.div`
  background-color: #181818;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ProfileInfo = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333333;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: #8c8c8c;
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
`;

const InfoValue = styled.span`
  color: #e5e5e5;
  font-size: 18px;
  display: block;
`;

function Profile() {
  // Dados fictícios do usuário
  const user = {
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    gender: 'Masculino',
    birthDate: '15/05/1990',
    address: 'Rua das Flores, 123, São Paulo - SP',
    phone: '(11) 98765-4321'
  };

  return (
    <ProfileContainer>
      <Title>Meu Perfil</Title>
      
      <ProfileCard>
        <ProfileInfo>
          <InfoLabel>Nome:</InfoLabel>
          <InfoValue>{user.name}</InfoValue>
        </ProfileInfo>
        
        <ProfileInfo>
          <InfoLabel>E-mail:</InfoLabel>
          <InfoValue>{user.email}</InfoValue>
        </ProfileInfo>
        
        <ProfileInfo>
          <InfoLabel>Gênero:</InfoLabel>
          <InfoValue>{user.gender}</InfoValue>
        </ProfileInfo>
        
        <ProfileInfo>
          <InfoLabel>Data de Nascimento:</InfoLabel>
          <InfoValue>{user.birthDate}</InfoValue>
        </ProfileInfo>
        
        <ProfileInfo>
          <InfoLabel>Endereço:</InfoLabel>
          <InfoValue>{user.address}</InfoValue>
        </ProfileInfo>
        
        <ProfileInfo>
          <InfoLabel>Telefone:</InfoLabel>
          <InfoValue>{user.phone}</InfoValue>
        </ProfileInfo>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile; 
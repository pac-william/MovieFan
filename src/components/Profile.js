import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 40px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  background-color: #1c1c1c;
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
`;

const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 3px solid red;
  object-fit: cover;
  margin: 0 auto 20px;
  display: block;
`;

const Info = styled.div`
  font-size: 18px;
  line-height: 1.8;

  span {
    font-weight: bold;
    color: #e50914;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
`;

function Profile() {
  const user = {
    nome: "Naruto Uzumaki",
    email: "narutouzumaki@email.com",
    genero: "Masculino",
    dataNascimento: "01/01/1990",
    avatar: require('../assets/foto_perfil.jpg')
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Title>👤 Meu Perfil</Title>
        <Avatar src={user.avatar} alt="Foto do Usuário" />
        <Info>
          <p><span>Nome:</span> {user.nome}</p>
          <p><span>Email:</span> {user.email}</p>
          <p><span>Gênero:</span> {user.genero}</p>
          <p><span>Data de Nascimento:</span> {user.dataNascimento}</p>
        </Info>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile;

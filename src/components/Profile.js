import React, { useState, useEffect } from 'react';
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

const Button = styled.button`
  background-color: ${props => props.secondary ? '#333' : '#e50914'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:hover {
    background-color: ${props => props.secondary ? '#444' : '#f40612'};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #e50914;
  }
  
  input, select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #222;
    color: white;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #e50914;
    }
  }
`;

function Profile() {
  // Estado inicial com dados fictícios
  const defaultUser = {
    nome: "Naruto Uzumaki",
    email: "narutouzumaki@email.com",
    genero: "Masculino",
    dataNascimento: "1990-01-01",
    avatar: require('../assets/foto_perfil.jpg')
  };
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(defaultUser);
  
  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Garantir que o avatar ainda esteja disponível
        parsedData.avatar = defaultUser.avatar;
        setUserData(parsedData);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    }
  }, []);
  
  // Função para salvar mudanças
  const handleSave = () => {
    // Criar uma cópia dos dados para salvar no localStorage
    const dataToSave = {...userData};
    // Remove o avatar que é um objeto importado antes de salvar
    delete dataToSave.avatar;
    
    localStorage.setItem('userData', JSON.stringify(dataToSave));
    setIsEditing(false);
  };
  
  // Função para lidar com alterações nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para resetar para os dados padrão
  const handleReset = () => {
    localStorage.removeItem('userData');
    setUserData(defaultUser);
    setIsEditing(false);
  };
  
  // Função para formatar a data no formato brasileiro
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const parts = dateString.split('-');
      if (parts.length !== 3) return dateString;
      
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Title>👤 Meu Perfil</Title>
        <Avatar src={userData.avatar} alt="Foto do Usuário" />
        
        {isEditing ? (
          // Formulário de edição
          <>
            <EditForm>
              <InputGroup>
                <label>Nome:</label>
                <input 
                  name="nome" 
                  value={userData.nome} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label>Email:</label>
                <input 
                  name="email" 
                  value={userData.email} 
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <label>Gênero:</label>
                <select 
                  name="genero" 
                  value={userData.genero} 
                  onChange={handleChange}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                  <option value="Prefiro não informar">Prefiro não informar</option>
                </select>
              </InputGroup>
              <InputGroup>
                <label>Data de Nascimento:</label>
                <input 
                  type="date"
                  name="dataNascimento" 
                  value={userData.dataNascimento} 
                  onChange={handleChange}
                />
              </InputGroup>
              <ButtonGroup>
                <Button onClick={handleSave}>Salvar</Button>
                <Button secondary onClick={() => setIsEditing(false)}>Cancelar</Button>
              </ButtonGroup>
            </EditForm>
          </>
        ) : (
          // Visualização normal
          <>
            <Info>
              <p><span>Nome:</span> {userData.nome}</p>
              <p><span>Email:</span> {userData.email}</p>
              <p><span>Gênero:</span> {userData.genero}</p>
              <p><span>Data de Nascimento:</span> {formatDate(userData.dataNascimento)}</p>
            </Info>
            <ButtonGroup>
              <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
              <Button secondary onClick={handleReset}>Restaurar Padrão</Button>
            </ButtonGroup>
          </>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile;

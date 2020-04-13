import React, { useState, useEffect } from "react";
import api from "./services/api";//importando o services do axios

import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]); //salvando os repositorios, useState

  useEffect(() => { //Carregando a lista de reposirórios, useEffects
    api.get('repositories').then(response => {
      setRespositories(response.data);
    });
  }, []);
  //chamada api
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: '',
      url: '',
      techs: []
    }) //infos de ex 50 mim Umbiel...

    setRespositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRespositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li> 
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

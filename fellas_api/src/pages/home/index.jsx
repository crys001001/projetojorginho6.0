/*import { useEffect, useState, useRef } from 'react'
import './styles.css'
import Trash from '../../assets/trash.svg'
import api from '../../service/api'

function Home() {
const [users, setUsers] = useState([])

const inputName = useRef()
const inputAge = useRef()
const inputEmail = useRef()


    async function getUsers() {
      const usersFromApi = await api.get('/usuarios')

      setUsers(usersFromApi.data)

    }

    async function createUsers() {

      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value

      })
      
     

    }
    
    useEffect(() => {
      getUsers()
  
    }, [])
    



  return (

    <div className='dados'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder='Nome' name='nome' type="text" ref={inputName}/>
        <input placeholder='Idade' name='idade' type="number" ref={inputAge}/>
        <input placeholder='E-mail' name='email' type="email" ref={inputEmail}/>
        <button type='button' onClick={createUsers}>cadastrar</button>
      </form>

      {users.map(user => (

        <div key={user.id} className='card' >
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Trash} />
          </button>
        </div>
      ))}



    </div>


  )
}

export default Home */
/*################################################################################################################### */

/* codigo certo modificado no gpt


import { useEffect, useState, useRef } from 'react';
import './styles.css';
import Trash from '../../assets/trash.svg';
import api from '../../service/api';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    setLoading(true);
    try {
      const usersFromApi = await api.get('/usuarios');
      setUsers(usersFromApi.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });
      // Limpar campos após criar usuário
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
      // Atualizar a lista de usuários
      getUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      // Atualizar a lista de usuários
      getUsers();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='dados'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type="text" ref={inputName} />
        <input placeholder='Idade' name='idade' type="number" ref={inputAge} />
        <input placeholder='E-mail' name='email' type="email" ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home; */

/*######################################################################################
/* codigo perfeito

import { useEffect, useState, useRef } from 'react';
import './styles.css';
import Trash from '../../assets/trash.svg';
import api from '../../service/api';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    setLoading(true);
    console.log("Fetching users...");
    try {
      const usersFromApi = await api.get('/usuarios');
      console.log("Users fetched:", usersFromApi.data);
      setUsers(usersFromApi.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("Finished fetching users");
    }
  }

  async function createUsers() {
    console.log("Creating user...");
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value,
      });
      console.log("User created");
      // Limpar campos após criar usuário
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
      // Atualizar a lista de usuários
      getUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err.message);
    }
  }

  async function deleteUser(id) {
    console.log(`Tentando deletar usuário com id: ${id}...`);
    try {
      await api.delete(`/usuarios/${id}`);
      console.log(`Usuário com id ${id} deletado`);
      // Atualizar a lista de usuários após deletar um usuário
      getUsers();
    } catch (err) {
      if (err.response) {
        // Erros que retornam uma resposta do servidor
        console.error(`Erro ao deletar usuário (status: ${err.response.status}):`, err.response.data);
        setError(`Erro ao deletar usuário: ${err.response.data.message}`);
      } else if (err.request) {
        // Erros que ocorrem durante a requisição, mas nenhuma resposta foi recebida
        console.error('Erro ao deletar usuário: Nenhuma resposta recebida do servidor', err.request);
        setError('Erro ao deletar usuário: Nenhuma resposta recebida do servidor');
      } else {
        // Outros erros
        console.error('Erro ao deletar usuário:', err.message);
        setError(`Erro ao deletar usuário: ${err.message}`);
      }
    }
  }
  
  

  useEffect(() => {
    console.log("Component mounted");
    getUsers();
  }, []);

  return (
    <div className='dados'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type="text" ref={inputName} />
        <input placeholder='Idade' name='idade' type="number" ref={inputAge} />
        <input placeholder='E-mail' name='email' type="email" ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => {
  console.log(`ID do usuário a ser deletado: ${user.id}`);
  deleteUser(user.id);
}}>
  <img src={Trash} alt="Delete" />
</button>

        </div>
      ))}
    </div>
  );
}

export default Home;*/

import { useState, useRef } from 'react';
import './styles.css';
import axios from 'axios';

function Home() {
  const [domainData, setDomainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputDomain = useRef();

  async function checkDomain() {
    setLoading(true);
    setError(null);
    setDomainData(null);

    const domain = inputDomain.current.value.trim();
    console.log("Checking domain:", domain);

    if (!domain) {
      setError("Por favor, insira um domínio válido.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://rdap.registro.br/domain/${domain}`);
      console.log("Response data:", response.data);
      setDomainData(response.data);
    } catch (err) {
      console.error("Error fetching domain data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='dados'>
      <form>
        <h1>Verificação de Domínio</h1>
        <input placeholder='Domínio' name='dominio' type="text" ref={inputDomain} />
        <button type='button' onClick={checkDomain}>Verificar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {domainData && (
        <div className='card'>
          <p>Domínio: <span>{domainData.ldhName}</span></p>
          <p>Status: <span>{domainData.status}</span></p>
          <p>Data de Criação: <span>{new Date(domainData.events.find(event => event.eventAction === 'registration').eventDate).toLocaleDateString()}</span></p>
          <p>Data de Expiração: <span>{new Date(domainData.events.find(event => event.eventAction === 'expiration').eventDate).toLocaleDateString()}</span></p>
        </div>
      )}
    </div>
  );
}

export default Home;






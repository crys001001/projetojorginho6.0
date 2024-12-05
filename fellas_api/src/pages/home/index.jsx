import React, { useState, useRef } from 'react';
import axios from 'axios';
import './styles.css';
import MeteorShower from './meteorShower';

function Home() {
  const [dadosDominio, setDadosDominio] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [disponivel, setDisponivel] = useState(false);

  const inputDominio = useRef();

  async function verificarDominio() {
    setCarregando(true);
    setErro(null);
    setDadosDominio(null);
    setDisponivel(false);

    const dominio = inputDominio.current.value.trim();
    console.log("Verificando domínio:", dominio);

    if (!dominio) {
      setErro("Por favor, insira um domínio válido.");
      setCarregando(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/domain/${dominio}`);
      
      if (response.data) {
        setDadosDominio({
          ldhName: response.data.ldhName,
          status: response.data.status,
        });
      } else {
        setDisponivel(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDisponivel(true);
      } else {
        setErro("Ocorreu um erro ao verificar o domínio.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className='dados'>
      <MeteorShower />
      <form>
        <h1 className='text-center'>Register Domain</h1>
        <input placeholder='Domínio' name='dominio' type="text" ref={inputDominio} />
        <button type='button' onClick={verificarDominio}>Verificar</button>
      </form>

      {carregando && <p>Carregando...</p>}
      {erro && <p>{erro}</p>}
      {disponivel && <p className="disponivel">O domínio está disponível!</p>}

      {dadosDominio && (
        <div className='card'>
          <p>Domínio: <span>{dadosDominio.ldhName}</span></p>
          <p>Status: <span>{dadosDominio.status}</span></p>
        </div>
      )}
    </div>
  );
}

export default Home;

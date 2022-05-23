import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import { MdAlternateEmail } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import './styles.css';

export default function ModalCreateClient({
  id = 'modal',
  onClose,
  open,
  onSave,
  setOpen,
  clientes,
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [profissao, setProfissao] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setIsData] = useState([]);

  const handleOutsideClick = (e) => {
    setOpen(true);
    if (e.target.id === id) onClose();
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:3333/clients', {
        nome: nome,
        email: email,
        profissao: profissao,
      })
      .then((response) => {
        setIsData(response.data);
        setLoading(false);
        onClose(false);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section id="modal" className="containerModal" onClick={handleOutsideClick}>
      <div className="modalContent">
        <div className="positionButtonClose">
          <button className="close" onClick={onClose}>
            <GrClose fontSize={24} />
          </button>
        </div>

        <form action="POST" onSubmit={handleSubmit} className="editContent">
          <h1>Cadastrar cliente</h1>
          <div className="inputContainer">
            <div className="inputContainerPositionIcons">
              <FaUserAlt fontSize={20} color={'#5B5F64'} />
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="inputContainerPositionIcons">
              <MdAlternateEmail fontSize={25} color={'#5B5F64'} />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputContainerPositionIcons">
              <FaGraduationCap fontSize={25} color={'#5B5F64'} />
              <input
                type="text"
                placeholder="Sua formação"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
              />
            </div>

            <div className="createNewUser">
              <button type="submit" loading={loading}>
                {loading && (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ marginRight: '10px' }}
                  />
                )}
                {loading && <span>Cadastrando...</span>}
                {!loading && (
                  <span className="positionIcon">
                    <p>Salvar Cliente</p>
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

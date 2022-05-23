import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import { MdAlternateEmail } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import './styles.css';

export default function ModalUpdateClient({
  id = 'modal',
  onClose,
  dataModalUpdate,
  open,
  setOpen,
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [profissao, setProfissao] = useState('');
  const [loading, setLoading] = useState(false);

  let idClient = dataModalUpdate.id;

  const handleUpdateClient = (e) => {
    e.preventDefault();
    setLoading(false);
    axios
      .put(`http://localhost:3333/clients/${idClient}`, {
        nome: nome,
        email: email,
        profissao: profissao,
      })
      .then((response) => {
        setOpen(false);
        onClose(false);
        console.log(response);
      });
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  useEffect(() => {
    if (open) {
      setNome(dataModalUpdate.nome);
      setEmail(dataModalUpdate.email);
      setProfissao(dataModalUpdate.profissao);
    }
  }, [dataModalUpdate, open]);

  return (
    <section id="modal" className="containerModal" onClick={handleOutsideClick}>
      <div className="modalContent">
        <div className="positionButtonClose">
          <button className="close" onClick={onClose}>
            <GrClose fontSize={24} />
          </button>
        </div>

        <div className="editContent">
          <h1>Atualizar cliente</h1>
          <div className="inputContainer">
            <div className="inputContainerPositionIcons">
              <FaUserAlt fontSize={20} color={'#5B5F64'} />
              <input
                type="text"
                placeholder="Entre com seu nome"
                value={nome}
                id={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="inputContainerPositionIcons">
              <MdAlternateEmail fontSize={25} color={'#5B5F64'} />
              <input
                type="email"
                placeholder="Edite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputContainerPositionIcons">
              <FaGraduationCap fontSize={25} color={'#5B5F64'} />
              <input
                type="text"
                placeholder="Edite sua formação"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
              />
            </div>

            <div className="createNewUser">
              <button onClick={handleUpdateClient}>
                <p>
                  {loading && (
                    <i
                      className="fa fa-refresh fa-spin"
                      style={{ marginRight: '10px' }}
                    />
                  )}
                  {loading && <span>Atualizando...</span>}
                  {!loading && (
                    <span className="positionIcon">
                      <p>Atualizar Cliente</p>
                    </span>
                  )}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

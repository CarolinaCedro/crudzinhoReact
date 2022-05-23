import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import ModalCreateClient from './Modal.js/modalClient/modalCreateClient';
import ModalUpdateClient from './Modal.js/modalUpdateClient/modalUpdateClient';
import ModalDeleteClient from './Modal.js/modalDelete/modalDeleteClient';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { BsCalendarDateFill } from 'react-icons/bs';
import { MdOutlineHelp } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

import './styles.css';

export default function Forms() {
  const [clientes, setClients] = useState([]);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [idClient, setIdClient] = useState('');
  const [dataModalUpdate, setDataModalUpdate] = useState({});

  useEffect(() => {
    setOpen(true);
    Axios.get('http://localhost:3333/clients').then((res) => {
      setClients(res.data);
      setIdClient(res.data.id);
      setOpen(false);
    });
  }, []);

  const formatDate = (date) => {
    let created_date = new Date(date);
    let formattedDate =
      created_date.getDate() +
      '/' +
      (created_date.getMonth() + 1) +
      '/' +
      created_date.getFullYear();

    return formattedDate;
  };

  function handleInfoDelete(id) {
    setOpen(true);
    setIdClient(id);
    setIsModalDeleteVisible(true);
  }

  function handleInfoUpdate(client) {
    setOpen(true);
    setDataModalUpdate(client);
    setIsModalUpdateVisible(true);
  }

  function handleSave(client) {
    const temp = [...dataModalUpdate];
    temp[
      dataModalUpdate.findIndex((item) => {
        return item.id === client.id;
      })
    ] = client;
    console.log(temp);
    setDataModalUpdate(temp);
  }

  return (
    <section>
      {isModalCreateVisible ? (
        <ModalCreateClient
          onSave={handleSave}
          onClose={() => setIsModalCreateVisible(false)}
          open={open}
          setOpen={setOpen}
          clientes={clientes}
        />
      ) : null}

      {isModalUpdateVisible ? (
        <ModalUpdateClient
          open={open}
          setOpen={setOpen}
          dataModalUpdate={dataModalUpdate}
          onClose={() => setIsModalUpdateVisible(false)}
        />
      ) : null}

      {isModalDeleteVisible ? (
        <ModalDeleteClient
          idClient={idClient}
          onClose={() => setIsModalDeleteVisible(false)}
        />
      ) : null}
      <header>
        <input type="text" placeholder="Buscar..." />
        <div className="searchIconContainer">
          <FiSearch fontSize={28} color={'#5B5F64'} />
        </div>
      </header>

      <div className="crudContainer">
        <div className="boxList">
          <table className="titleboxlist">
            <tbody>
              <tr className="contentBoxList">
                <td>
                  <FaUser fontSize={16} />
                  <p>Nome </p>
                </td>
                <td>
                  <MdAlternateEmail fontSize={16} />
                  <p>E-mail</p>
                </td>

                <td>
                  <FaGraduationCap fontSize={20} />
                  <p>Profissão</p>
                </td>
                <td>
                  <BsCalendarDateFill fontSize={18} />
                  <p>Data </p>
                </td>

                <td>
                  <MdOutlineHelp fontSize={18} />
                  <p>Ação</p>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="viewContainer">
            <div className="contentBoxView">
              <div className="tableVacancies">
                {clientes.map((client) => {
                  return (
                    <div className="boxContVacancies" key={client.id}>
                      <div className="styleTitle">
                        <p>{client.nome}</p>
                      </div>

                      <div className="styleDate">{client.email}</div>
                      <div className="styleDate">{client.profissao}</div>
                      <div className="styleDate">
                        {formatDate(client.createdAt)}
                      </div>

                      <div className="styleButtonEdit">
                        <button
                          type="button"
                          className="borderViolet"
                          onClick={() => handleInfoUpdate(client)}
                        >
                          <HiOutlinePencilAlt fontSize={16} />
                          <p>Editar</p>
                        </button>
                        <button
                          type="button"
                          className="borderRed"
                          onClick={() => handleInfoDelete(client.id)}
                        >
                          <IoMdCloseCircleOutline fontSize={16} />
                          <p>Apagar</p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="createUser">
            <button
              type="submit"
              onClick={() => setIsModalCreateVisible(true)}
              onChange={() => setOpen(true)}
            >
              <FaUserPlus />
              <p>Cadastrar</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

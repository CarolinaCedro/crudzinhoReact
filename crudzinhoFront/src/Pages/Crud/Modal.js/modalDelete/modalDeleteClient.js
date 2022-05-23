import React, { useState } from 'react';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';

import './styles.css';

export default function ModalDeleteClient({ onClose, idClient, id = 'modal' }) {
  const [loading, setLoading] = useState(false);
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };
  const handleDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:3333/clients/${idClient}`).then(() => {
      setLoading(false);
      onClose(false);
      console.log(`${idClient} deletado`);
    });
  };

  return (
    <section id="modal" className="containerModal" onClick={handleOutsideClick}>
      <div className="modalContentDelete">
        <div className="positionButtonCloseDelete">
          <button className="close" onClick={onClose}>
            <GrClose fontSize={24} />
          </button>
        </div>

        <div className="editContent">
          <h1>Tem certeza que deseja excluir cliente ? </h1>
          <div className="containerButtonsDelete">
            <button className="buttonRed" onClick={handleDelete}>
              {loading && (
                <i
                  className="fa fa-refresh fa-spin"
                  style={{ marginRight: '10px' }}
                />
              )}
              {loading && <span>Excluindo</span>}
              {!loading && (
                <span className="positionIcon">
                  <p>Excluir</p>
                </span>
              )}
            </button>
            <button className="buttonGreen">Cancelar</button>
          </div>
        </div>
      </div>
    </section>
  );
}

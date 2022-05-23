import ClientRepository from '../models/clientsModel.js';

async function findAll(req, res) {
  try {
    await ClientRepository.findAll().then((result) => res.json(result));
  } catch (error) {
    console.log(error);
  }
}

function findClient(req, res) {
  ClientRepository.findByPk(req.params.id).then((result) => res.json(result));
}

function addClient(req, res) {
  ClientRepository.create({
    nome: req.body.nome,
    email: req.body.email,
    profissao: req.body.profissao,
  }).then((result) => res.json(result));
}

async function updateClient(req, res) {
  await ClientRepository.update(
    {
      nome: req.body.nome,
      email: req.body.email,
      profissao: req.body.profissao,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  );

  ClientRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteClient(req, res) {
  await ClientRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  ClientRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addClient, findClient, updateClient, deleteClient };

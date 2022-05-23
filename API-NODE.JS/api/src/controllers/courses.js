import cursesModels from '../models/cursesModels.js';

function addCourse(req, res) {
  cursesModels
    .create({
      nome: req.body.nome,
      cidade: req.body.cidade,
    })
    .then((result) => res.json(result));
}

function getCourses(req, res) {
  cursesModels.findAll().then((result) => res.json(result));
}

export default { addCourse, getCourses };

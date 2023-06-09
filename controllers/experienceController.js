import Experience from "../models/experienceModel.js";

export function addExperience(req, res, next) {
  const experience = new Experience(req.body);
  experience
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getExperiences(req, res, next) {
  const pageNumber = req.query.page||1;
  const pageSize = req.query.pageSize||10;
  Experience.paginate({},{page:pageNumber, limit:pageSize})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getExperience(req, res, next) {
  const { id } = req.params;
  Experience.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "experience not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function editExperience(req, res, next) {
  const { id } = req.params;
  Experience.findOneAndUpdate({ _id: id }, req.body)
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function deleteExperience(req, res, next) {
  const { id } = req.params;
  Experience.findOneAndDelete({ _id: id })
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

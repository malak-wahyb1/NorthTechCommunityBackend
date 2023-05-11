import Workspace from "../models/workspaceModel.js";
export function addWorkspace(req, res, next) {
  const workspace = new Workspace(req.body);
  workspace
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getWorkspaces(req, res, next) {
  const pageNumber = req.query.page||1;
  const pageSize = req.query.pageSize||10;
  Workspace.paginate({},{page:pageNumber, limit:pageSize})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function getWorkspace(req, res, next) {
  const { id } = req.params;
  Workspace.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Workspace not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function editWorkspace(req, res, next) {
  const { id } = req.params;
  Workspace.findOneAndUpdate({ _id: id }, req.body)
    .then((response) => {
      if(!response) res.status(404).send({ status: 404, message:"not found"})
      if (req.body.media) fs.unlinkSync(response.media);
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

export function deleteWorkspace(req, res, next) {
  const { id } = req.params;
  Workspace.findOneAndDelete({ _id: id })
    .then((response) => {
      fs.unlinkSync(response.media);
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

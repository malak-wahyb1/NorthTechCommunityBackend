import Profile from "../models/userprofileModel.js";

export function addProfile(req, res, next) {
  const profile = new Profile(req.body);
  profile
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getProfiles(req, res, next) {
  const pageNumber = req.query.page||1;
  const pageSize = req.query.pageSize||10;
  Profile.paginate({},{page:pageNumber, limit:pageSize})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getProfile(req, res, next) {
  const { id } = req.params;
  Profile.findOne({ user: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "user not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function editProfile(req, res, next) {
  const { id } = req.params;
  Profile.findOneAndUpdate({ _id: id }, req.body)
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function deleteProfile(req, res, next) {
  const { id } = req.params;
  Profile.findOneAndDelete({ _id: id })
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

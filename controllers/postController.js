import Post from "../models/postModel.js";
import fs from 'fs'
export function addPost(req, res, next) {
  const post = new Post(req.body);
  post
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

export function getPosts(req, res, next) {
  const pageNumber = req.query.page||1;
  const pageSize = req.query.pageSize||10;
  Post.paginate({},{page:pageNumber, limit:pageSize})
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

export function getPost(req, res, next) {
  const { id } = req.params;
  Post.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Post not found" });
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

export function editPost(req, res, next) {
  const { id } = req.params;
  Post.findOneAndUpdate({ _id: id }, req.body)
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

export function deletePost(req, res, next) {
  const { id } = req.params;
  Post.findOneAndDelete({ _id: id })
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

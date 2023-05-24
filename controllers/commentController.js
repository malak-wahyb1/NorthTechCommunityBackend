import Comment from "../models/commentModel.js";

export function addComment(req, res, next) {
  const comment = new Comment(req.body);
  comment
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

export function getComments(req, res, next) {
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  Comment.paginate({}, { page: pageNumber, limit: pageSize })
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

export function getComment(req, res, next) {
  const { id } = req.params;
  Comment.find({ post: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Comment not found" });
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

export function editComment(req, res, next) {
  const { id } = req.params;
  Comment.findOneAndUpdate({ _id: id }, req.body)
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

export function deleteComment(req, res, next) {
  const { id } = req.params;
  Comment.findOneAndDelete({ _id: id })
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
export function getCommentUserPost(req, res, next) {
  const { id, id2 } = req.params;
  Comment.find({ user: id, post: id2 })
    .then((response) => {
      console.log(response);
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      res
        .status(error.status || 500)
        .send({ status: error.status, message: error.message });
      next(error);
    });
}

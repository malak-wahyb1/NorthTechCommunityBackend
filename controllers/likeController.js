import Like from "../models/likeModel.js";

export function addLike(req, res, next) {
  const like = new Like(req.body);
  like
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getLikes(req, res, next) {
  Like.find({})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}


export function deleteLike(req, res, next) {
  const { id } = req.params;
  const {id2}=req.params;
  Like.findOneAndDelete({ user: id },{post:id2})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}
export function getLikePost(req, res, next) {
const { id } = req.params;
Like.find({post: id}).then((response) => {
  if(!response) res.status(404).send({ status: 404, message:"0"})
  res.status(200).send({ status: 200, message: response });

}).catch((error) => {

  res
  .status(error.status || 500)
  .send({ status: error.status, message: error.message });
next(error);
})
}
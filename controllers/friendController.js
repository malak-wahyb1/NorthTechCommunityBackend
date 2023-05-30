import Friend from "../models/friendModel.js";

export function addFriend(req, res, next) {
  const friend = new Friend(req.body);

  friend
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

export function getFriends(req, res, next) {
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { id } = req.params;

  Friend.find(
    { friend: { $all: id }, accepted: true }
  )
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

export function requestedFriend(req, res, next) {
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const { id } = req.params;

  Friend.paginate(
    { friend:{$all:id}, accepted: false },
    { page: pageNumber, limit: pageSize }
  )
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

export function getFriend(req, res, next) {
  const { id } = req.params;
  Friend.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Friend not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {

      next(error);
    });
}

export function getAllFriend(req, res, next) {
  const { id } = req.params;
  Friend.findOne({ friend:{ $all: id } })
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


export function editFriend(req, res, next) {
  const { id } = req.params;
  Friend.findOneAndUpdate({ _id: id }, req.body)
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

export function deleteFriend(req, res, next) {
  const { id } = req.params;
  Friend.findOneAndDelete({ _id: id })
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

export function check(req, res, next) {

const {user}=req.params;
const {friend}=req.params;
Friend.findOne({friend:friend,friend:user}).then((friend) => {
  res.status(200).send({message:friend})
}).catch((err) => {console.log(err)});

}
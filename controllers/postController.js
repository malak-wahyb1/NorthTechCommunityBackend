import Post from "../models/postModel.js";
import Admin from "../models/adminModel.js";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import Workspace from "../models/workspaceModel.js";
import fs from "fs";
export function addPost(req, res, next) {
  const post = new Post(req.body);
  post
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      
      next(error);
    });
}

export function getPosts(req, res, next) {
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const sortOptions = { createdAt: -1 }; // Sort by the "createdAt" field in descending order

  Post.paginate({}, { page: pageNumber, limit: pageSize, sort: sortOptions })
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      
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
      
      next(error);
    });
}

export function editPost(req, res, next) {
  const { id } = req.params;
  Post.findOneAndUpdate({ _id: id }, req.body,{new:true})
    .then((response) => {
      if (!response)
        res.status(404).send({ status: 404, message: "not found" });
      if (req.body.media) fs.unlinkSync(response.media);
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      
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
     
      next(error);
    });
}
export function getUserPost(req,res,next){
  const {id}=req.params
  const pageNumber = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const sortOptions = { createdAt: -1 }; // Sort by the "createdAt" field in descending order

  Post.paginate({user:id}, { page: pageNumber, limit: pageSize, sort: sortOptions })
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
      
      next(error);
    });

}
export async function search(req, res, next) {
  try {
    const { search } = req.query;

    const results = {
      admins: await Admin.find({ username: { $regex: search } }),
      events: await Event.find({
        event_name: { $regex: search}
      }),
      posts: await Post.find({
        description: { $regex: search },
      }),
      users: await User.find({
        $or: [
          { first_name: { $regex: search } },
          { last_name: { $regex: search } },
          { email: { $regex: search } },
          { phone: { $regex: search } },
        ],
      }),
      workspaces: await Workspace.find({
        name: { $regex: search },
      }),
    };

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

import Event from "../models/eventModel.js";
import fs from'fs'
export function addEvent(req, res, next) {
  const event = new Event(req.body);
  event
    .save()
    .then((response) => {
      return res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getEvents(req, res, next) {

  
  Event.find({})
    .then((response) => {
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function getEvent(req, res, next) {
  const { id } = req.params;
  Event.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Event not found" });
      }
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function editEvent(req, res, next) {
  const { id } = req.params;
  Event.findOneAndUpdate({ _id: id },{new:true}, req.body)
    .then((response) => {
      if(!response) res.status(404).send({ status: 404, message:"not found"})
     
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

export function deleteEvent(req, res, next) {
  const { id } = req.params;
  Event.findOneAndDelete({ _id: id })
    .then((response) => {
      fs.unlinkSync(response.media);
      res.status(200).send({ status: 200, message: response });
    })
    .catch((error) => {
     next(error)
    });
}

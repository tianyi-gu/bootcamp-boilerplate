import express from 'express';
import { getDb } from './connect.js';
import { ObjectId } from 'mongodb';

let expressRouter = express.Router()


expressRouter.route("/").get(async (request, response) =>{
    let db = getDb()
    let data = await db.collection("notes").find({}).toArray()
    if (data.length > 0){
        response.json(data)
    }
    else {
        throw new Error("Notes data not found.")
    }
})

expressRouter.route("/:id").get(async (request, response) =>{
    let db = getDb()
    let data = await db.collection("notes").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length > 0){
        response.json(data)
    }
    else {
        throw new Error("Note data not found.")
    }
})

expressRouter.route("/").post(async (request, response) => {
    let db = getDb()
    let mongoObject = {
        title: request.body.title,
        content: request.body.content,
        dateCreated: request.body.dateCreated
    }
    let data = await db.collection("notes").insertOne(mongoObject)
    response.json(data)
})

expressRouter.route("/:id").put(async (request, response) => {
    let db = getDb()
    let mongoObject = {
        $set: {
            title: request.body.title,
            content: request.body.content,
            dateCreated: request.body.dateCreated
        }
    }
    let data = await db.collection("notes").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

expressRouter.route("/:id").delete(async (request, response) => {
    let db = getDb()
    let data = await db.collection("notes").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

export default expressRouter;
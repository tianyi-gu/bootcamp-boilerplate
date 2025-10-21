import express from 'express';
import { getDb } from './ExampleConnect.js';
import { ObjectId } from 'mongodb';

let eventRouter = express.Router()

eventRouter.route("/").get(async (request, response) =>{
    let db = getDb()
    let data = await db.collection("events").find({}).toArray()
    if (data.length > 0){
        response.json(data)
    }
    else {
        response.json([])
    }
})

eventRouter.route("/:id").get(async (request, response) =>{
    let db = getDb()
    let data = await db.collection("events").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length > 0){
        response.json(data)
    }
    else {
        throw new Error("Event data not found.")
    }
})

eventRouter.route("/").post(async (request, response) => {
    try {
        let db = getDb()
        let mongoObject = {
            name: request.body.name,
            organizer: request.body.organizer,
            location: request.body.location,
            url: request.body.url,
            description: request.body.description,
            time: request.body.time,
            date: request.body.date
        }
        let data = await db.collection("events").insertOne(mongoObject)
        response.json(data)
    } catch (error) {
        console.error('Error creating event:', error)
        response.status(500).json({ error: 'Failed to create event', details: error.message })
    }
})

eventRouter.route("/:id").put(async (request, response) => {
    let db = getDb()
    let mongoObject = {
        $set: {
            name: request.body.name,
            organizer: request.body.organizer,
            location: request.body.location,
            url: request.body.url,
            description: request.body.description,
            time: request.body.time,
            date: request.body.date
        }
    }
    let data = await db.collection("events").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

eventRouter.route("/:id").delete(async (request, response) => {
    let db = getDb()
    let data = await db.collection("events").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

export default eventRouter;


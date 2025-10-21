import express from 'express';
import { getDb } from './ExampleConnect.js';
import { ObjectId } from 'mongodb';

let productRouter = express.Router()

productRouter.route("/").get(async (request, response) =>{
    let db = getDb()
    let data = await db.collection("products").find({}).toArray()
    if (data.length > 0){
        response.json(data)
    }
    else {
        response.json([])
    }
})

productRouter.route("/:id").get(async (request, response) =>{
    let db = getDb()
    let data = await db.collection("products").findOne({_id: new ObjectId(request.params.id)})
    if (Object.keys(data).length > 0){
        response.json(data)
    }
    else {
        throw new Error("Product data not found.")
    }
})

productRouter.route("/").post(async (request, response) => {
    let db = getDb()
    let mongoObject = {
        name: request.body.name,
        category: request.body.category,
        price: request.body.price,
        url: request.body.url,
        description: request.body.description,
        inStock: request.body.inStock || true
    }
    let data = await db.collection("products").insertOne(mongoObject)
    response.json(data)
})

productRouter.route("/:id").put(async (request, response) => {
    let db = getDb()
    let mongoObject = {
        $set: {
            name: request.body.name,
            category: request.body.category,
            price: request.body.price,
            url: request.body.url,
            description: request.body.description,
            inStock: request.body.inStock
        }
    }
    let data = await db.collection("products").updateOne({_id: new ObjectId(request.params.id)}, mongoObject)
    response.json(data)
})

productRouter.route("/:id").delete(async (request, response) => {
    let db = getDb()
    let data = await db.collection("products").deleteOne({_id: new ObjectId(request.params.id)})
    response.json(data)
})

export default productRouter;


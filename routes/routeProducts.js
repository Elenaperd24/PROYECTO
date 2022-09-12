const express = require("express")
const { Router } = express
const Apiproducts = require('../models/ApiProducts')
const {auth} = require('../midelword/auth')

//const app = express()

const products = new Apiproducts('products.txt')

const routProducts = Router()

//app.use('/api/products', routProducts)


//ENDPOINTS PRODUCTS
routProducts.get('/:id?', async (req, res) => {
    const id = req.params.id

    if (id !== undefined) {
        const product = await products.getById(id)
        product ? res.send(product) : res.send({ error: "products doesn't exist"})
    }
    else {
        const allproducts = await products.getAll()
        res.json(allproducts)
    }
    //si existe el id busco el producto de ese id sino muestro tods
})

routProducts.post('/', auth ,async (req, res) => {
    const product = req.body
    await products.postData(product)
    res.json("creado el prod")//puedo incorporar productos a la base de datos productos
})

routProducts.put('/:id', auth, async (req, res) => {
    const product = req.body
    const id = req.params.id
    const editado = await products.putData(id, product)
    res.json('entre a put') //actualiza producto segun su id
})

routProducts.delete('/:id', auth,async (req, res) => {
    const id = req.params.id
    const allproducts = await products.deleteById(id)
    res.json({allproducts})
    //borra un producto segun su id
})

module.exports = {
    routProducts
}
const express = require("express")
const { Router } = express
const ApiCarritos = require('../models/ApiCarrito')

const carritos = new ApiCarritos('carritos.txt')

const routCarrito = Router()


routCarrito.post('/', async (req, res) => {
    //crea un carrito y devuleve su id
    await carritos.createCarrito()
    
    res.json('carrito creado')
})

routCarrito.delete('/:id', async (req, res) => {
    const id = req.params.id
    const newCarritos = await carritos.deleteById(id)
    res.json(newCarritos)
    //vacia un carrito y lo elimina
})

routCarrito.get('/:id/products', async (req, res) => {
    const id = req.params.id
    const productsCart = await carritos.getById(id)
    res.json(productsCart.products)
    // listar todos los productos de un carrito
})

routCarrito.post('/:id/products', async (req, res) => {
    const id = req.params.id
    const idproduct = req.body.id
    const productAdd =  await carritos.postData(id, idproduct)
    res.json(productAdd) 
    //AGREGA PRODUCTO POR UN ID DE CARRITO
})

routCarrito.delete('/:id/products/:id_prod', async (req, res) => {
    const id =  req.params.id
    const id_prod = req.params.id_prod
    console.log('carrito',id, 'product', id_prod)
    const productDelete = await carritos.deleteIdProdIdCart(id, id_prod)
    res.json(productDelete)
    // Eliminar un producto del carrito por su id de carrito y de producto

})

module.exports = {
    routCarrito
}
const express = require("express")
const { Router } = express
const Apiproducts = require('../models/ApiProducts')

const carritos = new Apiproducts('carritos.txt')

const routCarrito = Router()


routCarrito.post('/', async (req, res) => {
    //crea un carrito y devuleve su id
    const idCart = await carritos.createCarrito()
    console.log(idCart)
    res.send('carrito creado')
})

routCarrito.delete('/:id', async (req, res) => {
    const id = req.params.id
    const newCarritos = await carritos.deleteById(id)
    res.send(newCarritos)
    //vacia un carrito y lo elimina
})

routCarrito.get('/:id/products', async (req, res) => {
    const id = req.params.id
    const productsCart = await carritos.getById(id)
    res.send(productsCart.products)
    // listar todos los productos de un carrito
})

routCarrito.post('/:id/products', async (req, res) => {
    const id = req.params.id
    const idproduct = req.body.id
    const productAdd =  await carritos.postData(id, idproduct)
    res.send(productAdd) 
})

routCarrito.delete('/:id/products/:id_prod', async (req, res) => {
    const id =  req.params.id
    const id_prod = req.params.id_prod
    console.log('carrito',id, 'product', id_prod)
    const productDelete = await carritos.deleteIdProdIdCart(id, id_prod)
    res.send(productDelete)
    // Eliminar un producto del carrito por su id de carrito y de producto

})

module.exports = {
    routCarrito
}
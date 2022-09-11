const { raw } = require("body-parser")
const express = require("express")
const { Router } = express
const Apiproducts = require('./ApiProducts')
const ApiCarrito = require('./ApiCarrito')
const {auth} = require('./midelword/auth')

const app = express()

const products = new Apiproducts('products.txt')
const carritos = new ApiCarrito('carritos.txt')
const admin = true

const routProducts = Router()
const routCarrito = Router()

//MIDELWORD
app.use(express.json()) // convierto a JSON LA DATA
app.use(express.urlencoded({ extended: true })) //DESCODIFICO
app.use(express.static('public'))


app.use('/api/products', routProducts)
app.use('/api/carrito', routCarrito)

//ENDPOINTS PRODUCTS
routProducts.get('/:id?', async (req, res) => {
    const id = req.params.id

    if (id !== undefined) {
        const product = await products.getById(id)
        product ? res.send(product) : res.send({ error: "products doesn't exist" })
    }
    else {
        const allproducts = await products.getAll()
        res.send(allproducts)
    }
    //si existe el id busco el producto de ese id sino muestro tods
})

routProducts.post('/', auth ,async (req, res) => {
    const product = req.body
    await products.postData(product)
    res.send("creado el prod")//puedo incorporar productos a la base de datos productos
})

routProducts.put('/:id', auth, async (req, res) => {
    const product = req.body
    const id = req.params.id
    const editado = await products.putData(id, product)
    res.send('entre a put') //actualiza producto segun su id
})

routProducts.delete('/:id', auth,async (req, res) => {
    const id = req.params.id
    const allproducts = await products.deleteById(id)
    res.json({allproducts})
    //borra un producto segun su id
})

//ENDPOINTS CARRITOS
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



//SERVER
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
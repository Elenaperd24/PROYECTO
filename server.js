const express = require("express")
const {routProducts} = require('./routes/routeProducts')
const {routCarrito} = require('./routes/routesCarritos')

const app = express()

//MIDELWORD
app.use(express.json()) // convierto a JSON LA DATA
app.use(express.urlencoded({ extended: true })) //DESCODIFICO
app.use(express.static('public'))


app.use('/api/carrito', routCarrito)
app.use('/api/products', routProducts)

//SERVER
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
const { promises: fs } = require('fs');
const ApiProducts = require('./ApiProducts')

// AQUI COMIENZA MI CLASE CONTENEDOR 

class Carrito {
    constructor(nameFile) {
        this.nameFile = nameFile // recibo el nombre del archivo
        //creo el archivo
       this.carritos = []
        this.apiProducts = new ApiProducts('products.txt')
    }

    async createCarrito() {
        try {

            const carritos = await this.getAll() // leo el carritos
            let newId
           
            if (carritos.length == 0) {
                newId = 1 // id si no hay elememtos en el archivo
            }
            else {
                newId = carritos.length + 1 // me aseguro de no duplicar el id
            }
            let newCarrito = []
            const date = new Date()

            carritos.push({ ...newCarrito, id: newId, timestamp: date, products: [] }) // agrego al archivo el producto


            // sobre escribo el archivo
            await fs.writeFile(`./${this.nameFile}`, JSON.stringify(carritos, null, 2))
            return newId

        }
        catch (err) {
            throw new Error('save error', err)
        }
    }

    async getById(id) {

        const carritos = await this.getAll() // leo el carritos

        // filtro el objeto con id selec
        let newcarritos = carritos.filter(item => item.id == id)

        if (newcarritos[0] !== null) {
            return newcarritos[0] // Retorno el resultado con el objeto del ID
        }
        else {
            return null;
        }

    }

    async postData(id, idproduct) {
        try {

            const carrito = await this.getById(id)
            const productAdd = await this.apiProducts.getById(idproduct)
            const carritos = await this.getAll()

            if (carrito !== null) {

                carritos.map(item => {
                    if (item.id == id && productAdd !== undefined) {
                        item.products.push(productAdd)
                    }
                })
            }
            else {
                return null // me aseguro de no duplicar el id            
            }
            // sobre escribo el archivo
            await fs.writeFile(`./${this.nameFile}`, JSON.stringify(carritos, null, 2))
        }
        catch (err) {
            throw new Error('save error', err)
        }
    }


    async getAll() {
        try {
            // leo el carritos del archivo
            const carritos = await fs.readFile(`./${this.nameFile}`, 'utf-8')
            return JSON.parse(carritos) // retorno un array con todos los productos
        }
        catch (err) {
            return []
        }

    }

    async deleteById(id) {

        const carritos = await this.getAll()

        let objectDelete = await this.getById(id)

        let newcarritos = carritos.filter(item => item.id !== objectDelete.id)

        try {
            if (newcarritos !== null) {
                await fs.writeFile(`./${this.nameFile}`, JSON.stringify(newcarritos, null, 2))
            }

        } catch (error) {
            throw new Error('deleteById error', err)
        }

    }

    async deleteIdProdIdCart(id, id_prod) {
        try {
            const carrito = await this.getById(id)
            const carritos = await this.getAll()

            if (carrito !== null) {

                carritos.map(item => {
                    if (item.id == id) {
                        const newProducts = item.products.filter(product => {
                            product.id !== id_prod
                        })
                        item.products = newProducts
                        console.log(newProducts)
                    }
                })
                // sobre escribo el archivo
                 await fs.writeFile(`./${this.nameFile}`, JSON.stringify(carritos, null, 2))
                return carritos
            }


        }

        catch {
            throw new Error('error deleteIdCartProdId', err)
        }
    }
}

module.exports = Carrito


const { promises: fs } = require('fs');

// AQUI COMIENZA MI CLASE CONTENEDOR 

class Carrito {
    constructor(nameFile) {
        this.nameFile = nameFile // recibo el nombre del archivo
        //creo el archivo
        this.carritos = []
    }

    async createCarrito() {
        try {

            const contenido = await this.getAll() // leo el contenido
            let newId

            if (contenido.length == 0) {
                newId = 1 // id si no hay elememtos en el archivo
            }
            else {
                newId = contenido.length + 1 // me aseguro de no duplicar el id
            }
            let newCarrito = []
            const date = new Date()

            contenido.push({ ...newCarrito, id: newId, timestamp: date, products: [] }) // agrego al archivo el producto


            // sobre escribo el archivo
            await fs.writeFile(`./${this.nameFile}`, JSON.stringify(contenido, null, 2))
            return newId

        }
        catch (err) {
            throw new Error('save error', err)
        }
    }

    async getById(id) {

        const contenido = await this.getAll() // leo el contenido

        // filtro el objeto con id selec
        let newContenido = contenido.filter(item => item.id == id)

        if (newContenido[0] !== null) {
            return newContenido[0] // Retorno el resultado con el objeto del ID
        }
        else {
            return null;
        }

    }

    async postData(id, product) {

        try {
            const contenido = await this.getAll() // leo el contenido
            let carrito = await this.getById(id)

            if (carrito !== null) {   

                contenido.map(item => {                    
                    if (item.id == id) {
                        const date = new Date()
                        product.timestamp = date
                        item.products.push(product)
                    }
                })
            }
            else {
                return null // me aseguro de no duplicar el id
            }          

            // sobre escribo el archivo
            await fs.writeFile(`./${this.nameFile}`, JSON.stringify(contenido, null, 2))
            return newId

        }
        catch (err) {
            throw new Error('save error', err)
        }
    }


    async getAll() {
        try {
            // leo el contenido del archivo
            const contenido = await fs.readFile(`./${this.nameFile}`, 'utf-8')
            return JSON.parse(contenido) // retorno un array con todos los productos
        }
        catch (err) {
            return []
        }

    }

    async deleteById(id) {

        const contenido = await this.getAll()

        let objectDelete = await this.getById(id)

        let newContenido = contenido.filter(item => item.id !== objectDelete.id)

        try {
            if (newContenido !== null) {
                await fs.writeFile(`./${this.nameFile}`, JSON.stringify(newContenido, null, 2))
            }

        } catch (error) {
            throw new Error('deleteById error', err)
        }

    }

    deleteAll() {
        fs.unlink(`./${this.nameFile}`)
    }
}

module.exports = Carrito


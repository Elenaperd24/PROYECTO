const { promises: fs } = require('fs');

// AQUI COMIENZA MI CLASE CONTENEDOR 

class Products {
    constructor(nameFile) {
        this.nameFile = nameFile // recibo el nombre del archivo
        //creo el archivo
    }

    async postData(product) {

        const contenido = await this.getAll() // leo el contenido
        let newId

        if (contenido.length == 0) {
            newId = 1 // id si no hay elememtos en el archivo
        }
        else {
            newId = contenido.length + 1 // me aseguro de no duplicar el id
        }
        const date = new Date()
           
        contenido.push({ ...product, id: newId ,timestamp: date}) // agrego al archivo el producto

        try {
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

    async putData(id, product) {
        // leo el contenido del archivo
        const contenido = await fs.readFile(`./${this.nameFile}`, 'utf-8')

        contenido.map(item => {
            if (item.id == id) {
                item.name = product.name,
                item.description = product.description,
                item.code = product.code,
                item.image = product.image,
                item.price = product.price,
                item.stock = product.stock,
                item.timestamp = product.timestamp
            }
        })

        return contenido

    }

    async deleteById(id) {

        const contenido = await this.getAll()

        const objectDelete = await this.getById(id)

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

module.exports = Products


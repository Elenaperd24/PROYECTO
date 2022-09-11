const admin = true

const auth = (req, res, next) => {
    if(admin == true){
        next()
    }
    else{
        res.status(401)
        res.send( { error : -1, descripcion: `ruta  método no autorizada` }
        )
    }
}

module.exports = {auth}

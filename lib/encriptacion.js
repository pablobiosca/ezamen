const bcrypt = require("bcryptjs")

let encript = {}

encript.encriptar = async (password) => {

    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password,salt)

    return hash
}
encript.desencriptar = async (password,password_x) =>{

    return await bcrypt.compare(password,password_x)
    
}

module.exports = encript
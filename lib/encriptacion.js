const bcrypt = require("bcryptjs")

let encript = {}

encript.encriptar = async (password) => {

    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password,salt)

    return hash
}


module.exports = encript
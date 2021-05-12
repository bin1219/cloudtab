const { Schema, model } = require('../../config/db')

const accountSchema = new Schema({
    uid: String,
    email: String,
    pwd: String,
    allBookmark: [Object],
    tmpBookmark: [Object],
    filepath: [String]
})

module.exports = model('Accounts', accountSchema)
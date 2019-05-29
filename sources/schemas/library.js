'use strict'

module.exports = ({ mongoose }) => {

    const _schema = new mongoose.Schema({
        name: {
            type: String
        },
        author: {
            type: String
        },
        isbn: {
            type: String
        },
        url: {
            type: String
        }
    })

    return {
        entity: _schema,
        model: mongoose.model('library', _schema)
    }
}
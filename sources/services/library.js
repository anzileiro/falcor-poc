'use strict'

const repository = require('./repository')
    , libray = require('../schemas/library')({ mongoose: require('mongoose') })

module.exports = {

    create: async (payload) => {
        const { data, error } = await repository.save(libray.model, payload)
    },

    find: async () => {
        const { data, error } = await repository.find(libray)

        return { data, error }
    }

}
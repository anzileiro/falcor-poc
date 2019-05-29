'use strict'

const mongoose = require('mongoose')
    , bluebird = require('bluebird')

module.exports = {

    connect: () => {

        mongoose.Promise = bluebird

        mongoose.set(`debug`, process.env.debug)

        mongoose.connect(process.env.mongo_uri, {
            autoIndex: true,
            ssl: true,
            poolSize: 20,
            autoReconnect: true,
            reconnectTries: 10,
            replicaSet: process.env.mongo_replica,
            useNewUrlParser: true
        })

        mongoose.connection.on(`connected`, () => {
            console.info(`[*] MONGODB GET CONNECTED IN ${process.env.mode} MODE`)
        })

        mongoose.connection.on(`error`, (error) => {
            console.debug(`[*] MONGODB GOT AN ERROR WHEN WAS TRYING TO GET CONNECTED IN ${process.env.mode} MODE`)
            console.error(`[*] REASON => `, error)
        })

        mongoose.connection.on(`disconnected`, () => {
            console.info(`[*] MONGODB DISCONNECTED AT ${Date.now().toLocaleString()}`)
        })
    }

}
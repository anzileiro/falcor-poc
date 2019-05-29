'use strict'

const falcor = require(`falcor-express`)
    , router = require(`falcor-router`)
    , express = require(`express`)
    , api = express()
    , library = require(`./models/library.json`)
    , database = require('./connections/index')

async function initMongoDBAsync() {
    await database.connect()
}

api.use(`/library.json`, falcor.dataSourceRoute((req, res) => {
    return new router([
        {
            route: `books.list`,
            get: () => {
                return { path: [`books`], value: library }
            }
        },
        {
            route: `books.names`,
            get: () => {
                return { path: [`books`, `names`], value: library.map(_ => _.name) }
            }
        }
    ])
}))

api.use(express.static(__dirname + `/`))

initMongoDBAsync()

const server = api.listen(3000, () => {
    console.log(`api running on port 3000`)
})
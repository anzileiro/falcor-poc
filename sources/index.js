'use strict'

const falcor = require(`falcor-express`)
    , router = require(`falcor-router`)
    , express = require(`express`)
    , api = express()
    , library = require(`./models/library.json`)

api.use(`/library.json`, falcor.dataSourceRoute((req, res) => {
    return new router([
        {
            route: `books.list`,
            get: () => {
                return { path: [`books`], value: JSON.stringify(library) }
            }
        },
        {
            route: `books.names`,
            get: () => {
                return { path: [`books`, `names`], value: library.map(book => book.name) }
            }
        }
    ])
}))

api.use(express.static(__dirname + `/`))

const server = api.listen(3000, () => {
    console.log(`api running on port 3000`)
})
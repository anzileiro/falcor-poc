'use strict'

//git secrets => https://help.github.com/en/articles/generating-a-new-gpg-key

const falcor = require(`falcor-express`)
    , router = require(`falcor-router`)
    , express = require(`express`)
    , api = express()
    , library = require(`./models/library.json`)
    , database = require('./connections/index')
    , service = require(`./services/library`)
    , token = `77da16eaa1fdf5e5d3fc9afd1e0e5d3b`
    , cookie = require(`cookie-parser`)

async function initMongoDBAsync() {
    await database.connect()
}

api.use(cookie())

api.get(`/library.v1.json`, falcor.dataSourceRoute((req, res) => {
    return new router([
        {
            route: `books.list`,
            get: () => {
                return { path: [`books`, `list`], value: JSON.stringify(library) }
            }
        },
        {
            route: `books.names`,
            get: () => {
                return { path: [`books`, `names`], value: JSON.stringify(library.map(_ => _.name)) }
            }
        }
    ])
}))

api.get(`/library.v2.json`, falcor.dataSourceRoute((req, res) => {

    //document.cookie = "token=77da16eaa1fdf5e5d3fc9afd1e0e5d3b;path=/"

    if(req.query.token === token || req.cookies.token === token){
        return new router([
            {
                route: `books.list`,
                get: async () => {
    
                    const { data, error } = await service.find()
    
                    return { path: [`books`, `list`], value: JSON.stringify(data) }
                }
            },
            {
                route: `books.names`,
                get: async () => {
    
                    const { data, error } = await service.find()
    
                    return { path: [`books`, `names`], value: JSON.stringify(data.map(_ => _.name)) }
                }
            }
        ])
    } else {
       return res.status(401).json({status: 401, message: `unauthorized`, description: `you must provide valid token query parameter, eg. (http://{host}/{document}.json?paths={paths}&method={method}&token={token})`})
    }
}))

api.use(express.static(__dirname + `/`))

initMongoDBAsync()

const server = api.listen(3000, () => {
    console.log(`api running on port 3000`)
})
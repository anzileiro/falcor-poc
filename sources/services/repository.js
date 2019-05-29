'use strict'

module.exports = {

    save: (schemas, object) => {
        return new schemas.model(object)
            .save()
            .then(data => { return { data } })
            .catch(error => { return { error } })
    },
    find: (schemas, query = {}, skip = 0, take = 999, populate = '', sort = {}) => {
        return schemas.model
        .find(query)
        .populate(populate)
        .sort(sort)
        .lean()
        .skip(parseInt(skip))
        .limit(parseInt(take))
        .then(data => ({ data }))
        .catch(error => ({ error }))
    }

}
const projectModel = require('../data/helpers/projectModel');
const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'GET' })
    projectModel.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ error: "ERROR projects could not be retrieved", err }))
})

route.get('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'GET' })
    const { id } = req.params
    projectModel.get(id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({ error: "ERROR project ID could not be retrieved", err }))
})  // partial null e

route.post('/', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'POST' })
    const { name, description } = req.body
    if (name && description) {
        projectModel.insert(req.body)
            .then(project => res.status(201).json(project))
            .catch(err => res.status(500).json({ error: "ERROR project could not be added", err }))
    } else {
        res.status(400).json({ error: "ERROR missing required fields" })
    }
}) // partial e

route.put('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'PUT' })
    const { id } = req.params
    const { name, description } = req.body
    if (name && description) {
        projectModel.update(id, req.body)
            .then(project => {
                project ?
                res.status(200).json(project) :
                res.status(404).json({ error: "ERROR no ID found" })
            })
            .catch(err => res.status(500).json({ error: "ERROR project could not be updated", err }))
    } else {
        res.status(400).json({ error: "ERROR missing required fields" })
    }
})

route.delete('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'DELETE' })
    const { id } = req.params
    projectModel.remove(id)
        .then(count => {
            count === 1 ?
            res.status(204).json() :
            res.status(404).json({ error: "ERROR no ID found" })
        })
        .catch(err => res.status(500).json({ error: "ERROR project could not be deleted", err }))
})


// special extra
route.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    projectModel.get(id)
        .then(project => {
            projectModel.getProjectActions(id)
            .then(list => res.status(200).json(list))
            .catch(err => res.status(500).json({ error: "ERROR project actions could not be retrieved", err }))
        })
        .catch(err => {
            res.status(404).json({ error: "ERROR project could not be found", err })
        })
}) // partial e

module.exports = route;
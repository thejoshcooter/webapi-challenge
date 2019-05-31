const actionModel = require('../data/helpers/actionModel');
const express = require('express');
const route = express.Router(); 

route.get('/', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'GET' })
    actionModel.get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ error: "ERROR retrieving actions", err }))
})

route.get('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'GET' })
    const { id } = req.params
    actionModel.get(id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({ error: "ERROR retrieving action", err }))
})

route.post('/', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'POST' })
    const { project_id, description, notes } = req.body
    if (project_id && description && notes) {
        actionModel.insert(req.body)
            .then(action => res.status(201).json(action))
            .catch(err => res.status(500).json({ error: "ERROR adding action", err }))
    } else {
        res.status(400).json({ error: "ERROR missing required fields" })
    }
}) // partial e

route.put('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'PUT' })
    const { id } = req.params
    const { project_id, description, notes } = req.body
    if (project_id && description && notes) {
        actionModel.update(id, req.body)
            .then(action => {
                action ?
                res.status(200).json(action) :
                res.status(404).json({ error: "ERROR no ID found" })
            })
            .catch(err => res.status(500).json({ error: "ERROR action could not be updated.", err }))
    } else {
        res.status(400).json({ error: "ERROR missing required fields" })
    }
}) // partial e

route.delete('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'DELETE' })
    const { id } = req.params
    actionModel.remove(id)
        .then(count => {
            count === 1 ?
            res.status(204).json() :
            res.status(404).json({ error: "ERROR no ID found" })
        })
        .catch(err => res.status(500).json({ error: "ERROR action could not be deleted", err }))
})

module.exports = route;
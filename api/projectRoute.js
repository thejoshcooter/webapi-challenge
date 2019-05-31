const projectModel = require('../data/helpers/projectModel');
const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'GET' })
})

route.get('/:id', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'GET' })
})

route.post('/', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'POST' })
})

route.put('/:id', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'PUT' })
})

route.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'DELETE' })
})

module.exports = route;
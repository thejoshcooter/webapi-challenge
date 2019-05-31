const actionModel = require('../data/helpers/actionModel');
const express = require('express');
const route = express.Router(); 

route.use('/', (req, res) => {
    res.status(200).json({ message: 'success', operation: 'ALL' })
});

module.exports = route;
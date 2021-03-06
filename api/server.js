const express = require('express');
const cors = require('cors');

// db helpers
const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

// routes
const actionRoutes = require('./actionRoute');
const projectRoutes = require('./projectRoute');

// init server
const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

// create fallback
server.use('/', (req, res) => {
    res.status(200).send('<h1>Web API Challenge</h1>');
});

module.exports = server;


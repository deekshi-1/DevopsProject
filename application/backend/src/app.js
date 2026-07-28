const express = require('express');
const cors = require('cors');

const route = require('./routes/route');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound')

const app = express();

app.use(cors());
app.use(express.json())
    ;

app.get('/api/healthcheck', (req, res) => {
    res.status(200).json({ status: 'success', timestamp: new Date().toISOString() });
});

app.use('/api/notes', route);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
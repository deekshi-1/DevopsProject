const express = require('express');
const cors = require('cors');

const app = express();

app.disable('x-powered-by');

const allowedOrigins = [
  'http://localhost:3000',
  'https://example.com'
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
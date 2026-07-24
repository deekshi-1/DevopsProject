const express = require('express');
const cors = require('cors');

const app = express();

// Security: prevent framework/version disclosure via headers
// Disable the default X-Powered-By header set by Express
app.disable('x-powered-by');

// Remove any Server header if present and ensure headers do not reveal versions
app.use((req, res, next) => {
  res.removeHeader('Server');
  res.removeHeader('X-Powered-By');
  next();
});
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
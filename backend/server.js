const app = require('./app');
const connectDatabase = require('./src/config/database');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

connectDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`LionStock API is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });

# LionStock

LionStock is a backend API foundation for an inventory management system designed for small businesses.

## Technologies

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- cors
- nodemon

## Installation

1. Clone the repository.
2. Navigate to the `backend` folder.
3. Run `npm install`.

## Execution

- Development: `npm run dev`
- Production: `npm start`

## Project Structure

backend/
  app.js
  server.js
  .env.example
  .gitignore
  package.json
  README.md
  src/
    config/
      database.js
    controllers/
      health.controller.js
    middlewares/
      errorHandler.middleware.js
      notFound.middleware.js
    routes/
      index.js
    models/
    services/
    validators/
    utils/
    constants/
      httpStatus.js

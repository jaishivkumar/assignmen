require('dotenv').config(); // Load environment variables from .env file only once
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/route/route');

const app = express();
app.use(cors());

app.use(express.json());


app.use('/api', userRoutes);

// Define the port from environment variable or default to 3000
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

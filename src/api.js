const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/authentication');

const app = express();
const appToken = "testToken123";

//middleware
app.use(bodyParser.json());
app.use(logger);
app.use(authenticate(appToken));

//routes
app.use('/todos', todoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
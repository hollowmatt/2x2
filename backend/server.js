const express = require('express');
const userRouter = require('./routers/user');
const cors = require('cors');
require('./db');

const app = express();
const PORT = process.env.PORT || 4040;

app.use(express.json());
app.use(cors());
app.use(userRouter);


app.get('/', (req, res) => {
  res.send('<h2>Welcome Home!</h2>');
});

app.listen(PORT, () => {
  console.log('server running on port', PORT);
});
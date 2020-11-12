const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const postsRoute = require('./routes/event-route');
const analystRoute = require('./routes/analyst-routes');
const systemRoute = require('./routes/system-route');
const subtaskRoute = require('./routes/subtask-route');
const taskRoute = require('./routes/task-routes');
const findingRoute = require('./routes/finding-router');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());



mongoose.connect(
  'mongodb://localhost/fric',
  () => console.log('connected to FRIC database')
);
app.get('/', (req,res)=> {
  res.send('Hello Coding Edge');
  
})
app.use('/event', postsRoute);
app.use('/system', systemRoute);
app.use('/user', analystRoute);
app.use('/subtask', subtaskRoute);
app.use('/task', taskRoute);
app.use('/finding', findingRoute);
app.listen(5000);
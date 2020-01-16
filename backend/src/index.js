const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

const app = express();

mongoose.connect('mongodb://karine:omnistack2020@ds263808.mlab.com:63808/omnistack',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3335);
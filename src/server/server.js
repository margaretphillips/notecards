const app = require('express')();
const routes = require('./router');
const cors = require('cors');
const bodyParser = require("body-parser");

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // For legacy browser support
}


app.use(cors())
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3001, () => {
    console.log('App listening on port 3001');
});
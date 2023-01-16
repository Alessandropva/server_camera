require('dotenv').config();
const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personRouter = require('./routes/personRoutes');
// const routerFront = require('./routes/personRoutes');
// const frontEnd = require('./routes/fronteend');

const app = Express();
const port = process.env.Port || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(Express.static('./build'));

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname + '/build/index.html');
// });

// app.use ('/', frontEnd);
app.use('/person', personRouter);
// app.use('/', routerFront);

DB_USER = process.env.DB_USER;
DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cameracluster.y9rea97.mongodb.net/controlador?retryWrites=true&w=majority`)
.then(()=>app.listen(port, ()=>console.log('servidor iniciado com muito sucesso')))
.catch((err)=>console.log('nao conectado ao banco'))

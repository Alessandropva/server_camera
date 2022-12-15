const Express = require('express');

const app = Express();
const port = 8000;

app.use(Express.static(__dirname + '/build'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, ()=>console.log('servidor iniciado com sucesso'));
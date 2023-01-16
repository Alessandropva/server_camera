const router = require('express').Router();
const Person = require('../models/Person');


// router.get('/', (req, res)=>{
//     res.sendFile('C:\Users\Alessandro\Documents\projetos_todos\Projetos_react\aula_3_server/build/indexw.html');
//      const tes = __dirname + '\build\indexw.html';
//      console.log(tes);
//     // res.json({teste: 'isso e um teste'});
// });

var temper_global = [{
    'temperatura': '50',
    'umidade': '45'
}]

var led_status = 0;

router.post('/', async (req, res)=>{
    const {name, salary, approved} = req.body;
     
    if (!name){
        res.status(422).json({error: 'o nome e obrigatorio'});
    }else{
        const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person);
        res.status(201).json({resp: 'pessoa inserida com sucesso'});
    } catch (error) {
        res.status(500).json({error: error});
    }
    }
    
});

router.get('/', async (req, res)=>{
    try {
        const allperson = await Person.find();
        res.status(200).json(allperson);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

)

router.get('/temper', async (req, res)=>{
    
    try {
        
    res.status(200).json(temper_global);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

)

router.post('/temper', async (req, res)=>{
    const temper = req.body;
    
    if (!temper){
        res.status(422).json({error: 'valor nao informado'});
       
    }else{
        console.log(temper);
        temper_global = [temper];
        console.log(temper_global);
        res.status(201).json({resp: `led is ${temper_global}`});
        
    }
    
}

)


router.get('/led', async (req, res)=>{
    const led = led_status;
    try {
        
    res.status(200).json(led);
    console.log(led);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

)

router.post('/led', async (req, res)=>{
    const {act_led} = req.body;
    console.log(act_led)
    led_status = act_led;
    if (!act_led){
        res.status(422).json({error: 'valor nao informado'});
    }else{
        
        res.status(201).json({resp: act_led});
    }
    
}

)

router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const person = await Person.findOne({_id: id});
        if(!person){
            res.status(422).json({message: 'usuario nao encontrado'});
            return
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

)

router.patch('/:id', async (req, res)=>{
    const {name, salary, approved} = req.body;
    const id = req.params.id; 

    
    const person = {
    name,
    salary,
    approved
    }

    try {
        const update = await Person.updateOne({_id: id}, person);
        if (update.matchedCount === 0){
            res.status(422).json({error: 'o usuario nao foi encontrado'});
            return
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({error: error});
    }
    }


)

router.delete('/:id', async (req, res)=>{
    const id = req.params.id;
    try {
        const person = await Person.findOne({_id: id});
        if(!person){
            res.status(422).json({message: 'usuario nao encontrado'});
            return
        }
        await Person.deleteOne({_id: id});
        res.status(200).json({massage: 'usuario deletado'});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

)
module.exports = router;
const express = require('express');
const router = express();

const mysqlConnection = require('../database_mysql');

router.get('/api/eventos', (req, res)=>{
    mysqlConnection.query('SELECT * FROM eventos',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/api/eventos/:id',(req, res)=>{
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM eventos WHERE id_evento = ?',[id],(err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

router.post('/api/eventos',(req, res) =>{
    const {id_evento,nombre_evento,idioma,fecha_evento,fecha_creacion,id_conf,precio,lugar_evento,hora_evento} = req.body;
    const query = `
        CALL eventosAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
    mysqlConnection.query(query,[id_evento,nombre_evento,idioma,fecha_evento,fecha_creacion,id_conf,precio,lugar_evento,hora_evento],(err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Evento Guardado'});
        }else{
            console.log(err);
        }
    });
});

router.put('/api/eventos/:id',(req, res) =>{
    const {id_evento} = res.params;
    const {nombre_evento,idioma,fecha_evento,fecha_creacion,id_conf,precio,lugar_evento,hora_evento} = req.body;
    const query = `
        CALL eventosAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
    mysqlConnection.query(query,[id_evento,nombre_evento,idioma,fecha_evento,fecha_creacion,id_conf,precio,lugar_evento,hora_evento],(err, rows, fields)=>{
        if(!err){
            res.json({Status: 'Evento Guardado'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/api/eventos/:id',(req, res)=>{
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM eventos WHERE id_evento = ?',[id],(err,rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
});

module.exports = router;
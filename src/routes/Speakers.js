const express = require('express');
const router = express();

const mysqlConnection = require('../database_mysql');

router.get('/api/conferencista', (req, res)=>{
    mysqlConnection.query("SELECT * FROM conferencistas",(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});

router.get('/api/conferencista/:id', (req, res)=>{
    const { id } = req.params;
    mysqlConnection.query("SELECT * FROM conferencistas WHERE id_conf = ?",[id],(err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});

module.exports = router;

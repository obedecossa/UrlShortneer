const express = require('express');
const app = express();
const cors = require('cors')
const shortid = require('shortid')


app.listen(5000, ()=>{
    console.log('listening on 5000')
}) 

app.use(cors())
app.use(express.json())


// Mysql
const mysql = require('mysql')
const connection = mysql.createConnection({
    user: 'root',
    database: 'blog'
})

app.get('/', (req, res) =>{
    connection.query("SELECT * FROM urls", (err, results) =>{
        if(err){
            console.log(err)
        }
        res.json(results)   
    })

})   


app.post('/url', (req, res) =>{
    console.log(req.body.long)
    const shorted = shortid.generate(req.body.long)
    connection.query("INSERT INTO urls VALUES(?,?,?)", ['0', `${req.body.long}`, `${shorted}`], (err, results) =>{
        if(err){
            res.send(err)
            console.log(err)
        } 
        
    })    
}) 
  
app.get('/url/:short', (req, res) =>{
    console.log(req.params.short)
    connection.query("SELECT * FROM urls where shorturl = ?",[req.params.short], (err, results) =>{
        if(err){
            console.log(err)
        }
        res.redirect(results[0].longurl)
    })
})  
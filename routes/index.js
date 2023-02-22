var express = require('express');
var router = express.Router();
const pool = require("../database")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fotos/add', function(req, res, next) {
  res.render('add');
});

router.post('/fotos/add', async function(req, res, next) {
  console.log(req.body)

  let fotico = {
    url:req.body.url,
    titulo:req.body.titulo,
    likes:0,
    dislikes:0
  }

  const [result] = await pool.query("insert into fotos set ?",[fotico])

  res.redirect("/fotos")
});

router.get('/fotos/delete/:id', async function(req, res, next) {
  
  const [result] = await pool.query("delete from fotos where id = ?",[req.params.id])

  res.redirect("/fotos")

});

router.get('/fotos/update/:id', async function(req, res, next) {

  const [result] = await pool.query("select * from fotos where id = ?",[req.params.id])

  let pasar = result[0]

  res.render("update",{pasar})
  
});

router.post('/fotos/update/:id', async function(req, res, next) {
  
  console.log(req.body)

  const [result] = await pool.query("update fotos set ? where id = ?",[req.body,req.params.id])

  res.redirect("/fotos")

});


router.get('/fotos', async function(req, res, next) {
  
  const [result] = await pool.query("select * from fotos;")

  res.render("fotos",{result})
});


router.get('/fotos/like/:id', async function(req, res, next) {
  
  const [result] = await pool.query("update fotos set likes=likes+1 where id = ?",[req.params.id])

  res.redirect("/fotos")

});

router.get('/fotos/dislike/:id', async function(req, res, next) {
  
  const [result] = await pool.query("update fotos set dislikes=dislikes+1 where id = ?",[req.params.id])

  res.redirect("/fotos")
  
});

module.exports = router;

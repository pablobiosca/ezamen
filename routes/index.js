var express = require('express');
var router = express.Router();
const pool = require("../database")

//PARA COMENTARIOS
router.get('/fotos/comentario/:id', function(req, res, next) {

  let id = req.params.id
  res.render("comentar",{id})
});

router.post('/fotos/comentario/:id', async function(req, res, next) {
  let comentario = req.body.comentario

  //agregamos comentario + claves foraneas de user id mediante variable local
  //y el id de la foto mediante el action de el formulario
  let estructura = {id_foto:req.params.id,id_user:req.user.id,comentario}

  const [result] =await pool.query("insert into comentarios set ?",[estructura])

});

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


  //SOLO APARECEN LAS QUE PERTENECEN AL USUARIO
  //QUE ESTA AHORA MISMO CON LA SESION EN EL NAVEGADOR
  //A ATRAVES DE LA VARIABLE LOCAL "USER" QUE CREAMOS EN APP
  const [result] = await pool.query("select * from fotos where id_user = ?",[req.user.id])

  //cargamos los comentarios para su futuro uso para iterar si es que
  //hay alguno sobre cada publicacion relacionada
  const [result2] = await pool.query("select * from comentarios")

  res.render("fotos",{result,result2})

});

//misfotoscomentadas

router.get('/miscoments', async function(req, res, next) {

  const [result] = await pool.query("select * from fotos,comentarios as c where c.id_user = ?",[req.user.id])

  res.render("fotos",{result})
  
});


router.get('/fotos/masvotadas', async function(req, res, next) {
  
  const [result] = await pool.query("select * from fotos order by likes desc limit 5;")

  res.render("fotos",{result})
});

router.get('/fotos/menosvotadas', async function(req, res, next) {
  
  const [result] = await pool.query("select * from fotos order by likes asc limit 5;")

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

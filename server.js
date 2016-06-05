var express = require('express')
var app = express()
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/angular-todo')

app.configure(function () {
  app.use(express.static(__dirname + '/public'))
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
})

var Todo = mongoose.model('Todo', {
  text: String
})

// Rutas de nuestro API
// GET de todos los TODOs
app.get('/api/todos', function( req, res) {
  Todo.find(function(err, todos) {
    if(err) {
      res.send(err)
    }
    res.json(todos)
  })
})

// POST que crea un TODO y devuelve todos tras la creación
app.post('/api/todos', function( req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo){
    if(err) {
      res.send(err)
    }

    Todo.find(function(err, todos) {
      if(err){
        res.send(err)
      }
      res.json(todos)
    })
  })
})

// DELETE un TODO específico y devuelve todos tras borrarlo.
app.delete('/api/todos/:todo', function (req, res) {
  Todo.remove({
    _id: req.params.todo
  }, function (err, todo) {
    if (err) {
      res.send(err)
    }

    Todo.find(function (err, todos) {
      if (err) {
        res.send(err)
      }
      res.json(todos)
    })
  })
})

// Carga una vista HTML simple donde irá nuestra Single App Page con Angular
app.get('*', function (req, res) {
  res.sendfile('./public/index.html')
})

app.listen(8080, function () {
  console.log('App listening on port 8080')
})

const express = require('express');
const { connectToDB, getDB, connectViaMangoose } = require('./db');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');
const fs = require('fs');
const multer = require('multer');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));


//dataBase collections
let mesagesData;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

connectToDB((err) => {
   if (!err) {
    app.listen(5000, () => {
        console.log('backend is running on port 5000')
    })
    mesagesData = getDB();
   }
})

const upload = multer({storage}).array('file');

app.post('/upload', cors(corsOptions), (req, res) => {
   upload(req, res, (err) => {
   if (err) {
     return res.status(500).json(err)
   }
  });
  return res.status(200).send(req.file)
});

app.get('/messages/:id', cors(corsOptions), (req,res) => {
  const id = req.params.id;
  mesagesData.collection('messages')
  .findOne({_id: new ObjectId(id)})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(error => {
    res.status(500).json({error: `You got an error ${error}`})
  })
})


app.get('/messages', cors(corsOptions),  (req,res) => {
  const messagesFromBackend = [];
  mesagesData.collection('messages')
  .find()
  .forEach( message => messagesFromBackend.push(message))
  .then(() => {
    res.status(200).json(messagesFromBackend)
  })
  .catch(() => {
      res.status(500).json({error: 'Could not fetch any data here'})
  })
})

app.post('/messages', cors(corsOptions), (req,res) => {
   const body = req.body;
   mesagesData.collection('messages')
   .insertOne(body)
   .then( data => {
     res.status(201).json(data)
   })
   .catch(error => {
    res.status(500).json({error: `You got an error : ${error}`})
   })
})

app.delete('/messages/:id', cors(corsOptions), (req,res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    mesagesData.collection('messages')
    .deleteOne({_id: new ObjectId(id)})
    .then( data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(500).json({error: `You got an error : ${error}`})
    }) 
  } else {
    res.status(500).json({error: `You got an error`})
  }
})

app.patch('/messages/:id', cors(corsOptions), (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if (ObjectId.isValid(id)){
      mesagesData.collection('messages')
      .updateOne({_id: new ObjectId(id)}, {$set: body})
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(error => {
        res.status(500).json({error: `You got an error : ${error}`})
      })
    }
    else {
      res.status(500).json({error: `You got an error`})
    }
})

app.get('/users', cors(corsOptions), (req, res) => {
  const usersFromBackend = [];
  mesagesData.collection('users')
  .find()
  .forEach(user => usersFromBackend.push(user))
  .then(() => {
    res.status(200).json(usersFromBackend)
  })
  .catch(() => {
      res.status(500).json({error: "Something went wrong"})
  }) 
})

app.post('/users', cors(corsOptions), (req, res) => {
   const body = req.body;
   mesagesData.collection('users')
   .insertOne(body)
   .then( data => {
     res.status(201).json(data)
   })
   .catch(error => {
     console.log({error: `You got an error : ${error}`})
   })
})


app.patch('/users/:id', cors(corsOptions), (req, ser) => {
  const body = req.body;
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    mesagesData.collection('users')
    .updateOne({_id: new ObjectId(id)}, {$set:{avatar: body}})
    .then((data) => {
      res.status(200).json(data)
    })
  }
  else {
    res.status(500).json({error: `You got an error`})
  }
})


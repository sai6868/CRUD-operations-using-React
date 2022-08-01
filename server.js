require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const path = require('path');
//connect build of react app with nodejs
app.use(express.static(path.join(__dirname, './build')))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
const MongoClient = require('mongodb').MongoClient
//database connection
const MongoDBURL = process.env.DATABASE_URL

MongoClient.connect(MongoDBURL, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('crud')
    const usercollection = db.collection('usercollection')

    //post method
    app.post('/add', (req, res) => {

      let Rno = req.body.RegistrationNo;
      // checking whether user exists
      db.collection('usercollection').findOne({ "RegistrationNo": Rno })
        .then(user => {
          if (user != null) {
            res.send({ msg: "Registration No. already exists" })
          }
          else {
            usercollection.insertOne(req.body)
              .then(res.send({ msg: 'User data inserted successfully' }))
              .catch(error => console.error(error))
          }
        })
    })

    //get method
    app.get('/userslist', (req, res) => {
      db.collection('usercollection').find().toArray()
        .then(userDetails => { res.send({ userDetails }) })
        .catch(err => { console.log(err) })
    })

    //       //get by name method
    //       app.get('/:Name', (req, res) => {
    //         let username = req.params.Name;  
    //         db.collection('usercollection').findOne({"Name" : username})
    //         .then(data => {
    //             if (data != null)
    //             {
    //                 res.send(data)
    //             }
    //             else(data == null)
    //             {
    //                 res.send("User not exists")
    //             }
    //         })
    //         .catch(err => {console.log(err)})
    //       })

    //update method
    app.put('/update', (req, res) => {
      let modifiedUserData = req.body;
      db.collection('usercollection').findOne({ "RegistrationNo": modifiedUserData.RegistrationNo })
        .then(data => {
          if (data != null) {
            let dataset = {
              $set: modifiedUserData
            }
            db.collection("usercollection").updateOne(data, dataset)
              .then(res.send({ msg: "Updated successfully" }))
              .catch(err => console.log(err))
          }
        })
        .catch(err => { console.log(err) })
    })

    //delete by name method
    app.delete('/:RegistrationNo', (req, res) => {
      let Rno = req.params.RegistrationNo
      db.collection('usercollection').findOne({ "RegistrationNo": Rno })
        .then(user => {
          console.log(user)
          if (user != null) {
            db.collection("usercollection").deleteOne(user)
              .then(res.send({ msg: "Deleted successfully" }))
              .catch(err => console.log(err))
          }
          else {
            res.send({ msg: "User not exists" })
          }
        })
        .catch(err => { console.log(err) })
    })

  })


//configure the server port
app.listen(4000, () => {
  console.log('Server runs on port 4000')
})
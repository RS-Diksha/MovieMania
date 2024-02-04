import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']  //way to access environment variable created
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kokwfob.mongodb.net/?retryWrites=true&w=majority`
//this is the connection string  of created mongodb database with username and password changed to environment variable representing them

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,   //maximum persons can connect at a time
    wtimeoutMS:  2500,   //max time a connection trying to connect before time out
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)  //if error in connecting
    process.exit(1)
  })
  .then(async client => {  //client variable coming form connection to db
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {  //starting the web server by calling listen method on server file  
      console.log(`listening on port ${port}`)
    })
  })
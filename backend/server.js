const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

// ENV configuration
dotenv.config({
    path: './config.env'
});
const app = require('./app');

// Connect to the database and open server on port...
const uri = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

let server
const port = process.env.PORT || 9000;

const connectDB = async (uri) => {
    try {
        await MongoClient.connect(uri, mongoOptions, (err, db) => {
            console.log(uri)
            if (err) {
                console.log(`Failed to connect to the database. ${err.stack}`);
            } else {
                app.locals.db = db;
                console.log('DB connection successful!');
            };
        });
    } catch (err) {
        throw new Error(err.message);
    }


    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    //     // const collection = client.db("test").collection("devices");
    //     // perform actions on the collection object
    //     console.log('DB connection successful!');
    //     app.locals.db = client.db("User")
    //     console.log(app.locals.db);
    //     client.close();
    //   });

}

connectDB(uri).then(() => {
    server = app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });
});

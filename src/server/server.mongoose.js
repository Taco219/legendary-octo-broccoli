const mongoose = require('mongoose');

export const connectMongo = () => {
    return new Promise((fulfill)=>{
        mongoose.connect('mongodb://localhost/legendary-octo-broccoli', { useMongoClient: true });
        mongoose.Promise = global.Promise;

        const db = mongoose.connection;

        db.on('error', () => {
            console.error("Failed to connectMongo to mongo");
            process.exit(1);
        });

        db.once('open', () => {
            console.log("Connected to mongo");
            fulfill(true);
        });
    });

};
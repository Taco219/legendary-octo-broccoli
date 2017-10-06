const mongoose = require('mongoose');

export const connect = () => {
    return new Promise((fulfill)=>{
        mongoose.connect('mongodb://localhost/legendary-octo-broccoli', { useMongoClient: true });
        const db = mongoose.connection;

        db.on('error', () => {
            console.error("Failed to connect to mongo");
            process.exit(1);
        });

        db.once('open', () => {
            console.log("Connected to mongo");
            fulfill(true);
        });
    });

};
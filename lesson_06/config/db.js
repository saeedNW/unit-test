const mongoose = require("mongoose");


exports.DBConnection = async () => {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            mongoose.connect(`mongodb://${process.env.MONGODB_TEST_URL}`).then(
                (conn) => {
                    resolve(conn);
                },
            ).catch((err) => {
                reject(err);
            });
        } else {
            mongoose.connect(`mongodb://${process.env.MONGODB_URL}`).then(
                (conn) => {
                    resolve(conn);
                }
            ).catch((err) => {
                reject(err);
            });
        }
    });
}

exports.close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}
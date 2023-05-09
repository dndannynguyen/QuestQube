const mongoose = require('mongoose');
const app = require('./app');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`${process.env.MONGO_URI}}`);
    console.log('Connected to MongoDB');

    app.listen(process.env.PORT || 3000, () => {
        console.log('Listening to port...')
    })
}
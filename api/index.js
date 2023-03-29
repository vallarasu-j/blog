const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = 5000;

const mongoose = require("mongoose");

const mongoDB = "mongodb://localhost:27017/blog";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}



const publicRoutes = require('./src/routes/publicRoutes');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use('/server/api', publicRoutes)
app.use('/server/api', postRoutes);
app.use('/server/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}
);
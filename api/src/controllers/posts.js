const mongoose = require('mongoose');

const db = mongoose.connection;

const { authUser } = require('../controllers/auth');

const posts1 = [
    {
        postUrl: "https://source.unsplash.com/random",
        title: "Blog 1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nisl nunc eget nisl.",
        date: "16th March, 2023",
        author: {
            name: "John Doe",
        },
    },
    {
        postUrl: "https://source.unsplash.com/random",
        title: "Blog 2",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nisl nunc eget nisl. Sed euismod, nunc ut aliquam ultricies, nunc nisl aliquam mauris, eget aliquam nisl nunc eget nisl.",
        date: "16th March, 2023",
        author: {
            name: "John Doe",
        },
    },
];


const getPosts = async (req, res) => {

    const posts = await db.collection('posts').find().toArray()

    res.status(200).send(posts);

}

const postFeeds = async (req, res) => {

    const { postUrl, title, desc, date, author } = req.body;


    const user = await authUser(req, res);

    const newPost = {
        _id : `${user._id}_${Math.floor(Math.random() * 1000000000)}`,
        postUrl:"https://i.pravatar.cc/300",
        title,
        desc,
        date : new Date(),
        author : user?.name
    };

    db.collection('posts').insertOne(newPost, (err, result) => {
        if (err) {
            res.status(500).send('Error posting');
        } else {
            res.status(200).send(
                {
                    "status": 1,
                    "class": "success",
                    "message": "Post successful",
                }
            );
        }

    }
    );


}




module.exports = {
    getPosts,
    postFeeds
}
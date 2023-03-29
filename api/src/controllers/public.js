

const home = (req, res, next) => {

    const userData = {
        name: 'John',
        age: 30,
        email: 'john@gmail.com',
        phone: '1234567890'
    }
    res.send({
        "status": 1,
        "class": "Success",
        "message": "Welcome to the home page",
        "payload": userData
    });
    next();
}


const about = (req, res, next) => {
    res.send('About page');
    next();
}

module.exports = {
    home,
    about
}
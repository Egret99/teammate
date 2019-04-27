const app = require('express')();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send({msg: "Hello"});
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
})
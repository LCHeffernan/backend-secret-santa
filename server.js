const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

//parse requests of content-type - application
app.use(express.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Secret Santa App" })
})

const db = require("./src/models/");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

require("./router/auth.routes")(app);
require("./router/user")(app);

const PORT = 3000;

const APP_PORT = PORT || 4000;

app.listen(APP_PORT, () => {
    console.log(`App is listening on port ${APP_PORT}`);
});

const initial = () => {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderator"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}
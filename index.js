const app = require("./src/app.js");

const PORT = 3000;

const APP_PORT = PORT || 4000;

app.listen(APP_PORT, () => {
    console.log(`App is listening on port ${APP_PORT}`);
});

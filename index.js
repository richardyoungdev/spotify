console.log("reading index.js!")

const Sequelize = require("sequelize");

const dbConnection = new Sequelize("postgres://localhost:5432/spotifyclone");

// create songs table
// models are Capital letter
const Song = dbConnection.define(`song`, {
    title: {
        type: Sequelize.STRING,  // strings max length is 255 characters
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lyrics: {
        type: Sequelize.TEXT, // allows string to be as long it wants!
        allowNull: true
    }
});

const myAsyncFn = async () => {
    await Song.sync() // sync --> either CONNECTS or CREATES the table the model represents

    // you can add WHERE clauses
    const songs = await Song.findAll();

    console.log(songs);
    console.log(songs[0]);
    console.log(songs[0].title);
    console.log(songs[1]);
};

myAsyncFn();


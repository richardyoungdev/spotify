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

    //another way to create a new row!!
    // const newSong = new Song({
    //     title: "Hello",
    //     duration: 7*60,
    //     lyrics: "Jazma knows these"
    // });

    // await newSong.save();

    // another way to create a new row!!! this uses .create(), which is new and save combined.
    const newSong = Song.create({
        title: "Hotel California",
        duration: 4.5 * 60,
        lyrics: "Welcome to the hotel california"
    });

    // you can add WHERE clauses
    const songs = await Song.findAll({
        where: {
            title: "Yesterday"
        }
    });

    // console.log(songs);
    // console.log(songs[0]);
    console.log("songs[0].title value is:",songs[0].title);
    // console.log(songs[1]);


};

myAsyncFn();


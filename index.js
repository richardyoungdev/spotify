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

// create an Album table. Use singular here.
const Album = dbConnection.define("album",{
    coverUrl: {
        type: Sequelize.STRING(1000),
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.DATE,
        allowNull: false
    }

});

const Artist = dbConnection.define("artist", {
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    country: {
        type: Sequelize.STRING()
    },
    bio: {
        type: Sequelize.TEXT
    }
});

// belongsTo() is most commonly used association method
// belongsTo() creates an 'albumId' on your songs table.
// Song in this is known as the "source"
// Album in this is known as the "target"
// the "source" gets a foreign to the "target"
Song.belongsTo(Album);

// hasMany - create an 'albumId' on your songs table.
Album.hasMany(Song);

// belongsTo() creates an 'artistId' on your album table.
// Album is the source, which gets the foreign to the "target"
// There are many albums to an artist.
// Therefore, it can also be... Artist.hasMany(Album)
// Album.belongsTo(Artist);

// through: is naming the table.
Album.belongsToMany(Artist, {through: "album_to_artist"});
Artist.belongsToMany(Album, {through: "album_to_artist"});

const myAsyncFn = async () => {
    // await Song.sync() // sync --> either CONNECTS or CREATES the table the model represents
    // That will sync every table that’s connected as a model.
    await dbConnection.sync({force: true})
    // force:true creates new table each time. works best with seed.sql


    // //another way to create a new row!!
    // const newSong = new Song({
    //     title: "Hello",
    //     duration: 7*60,
    //     lyrics: "Jazma knows these"
    // });

    // await newSong.save();

    // // another way to create a new row!!! this uses .create(), which is new and save combined.
    // const otherSong = Song.create({
    //     title: "Hotel California",
    //     duration: 4.5 * 60,
    //     lyrics: "Welcome to the hotel california"
    // });

    const beatlesSong = await Song.create({
        title: "Yesterday",
        duration: 200
    })

    const beatlesAlbumHelp = await Album.create({
        name: "Help",
        year: "1967",
    });

    const beatlesAlbumAbby = await Album.create({
        name: "Abbey Road",
        year: "1969",
    });  

    const beatlesArtist = await Artist.create({
        name: "Beatles",
    })

    const richieArtist = await Artist.create({
        name: "Richie"
    })

    await beatlesAlbumHelp.addArtist(beatlesArtist)
    await beatlesAlbumAbby.addArtist(beatlesArtist)
    await beatlesAlbumAbby.addArtist(richieArtist)


    const albumWithTheirArtists = await Album.findAll({
        include: [Artist]
    });

    console.log(albumWithTheirArtists[1].artists[0].name)

    // assign beatles song to beatles album based on id
    // await beatlesSong.setAlbum(beatlesAlbum.id)

    // you can add WHERE clauses
    // const songs = await Song.findAll({
    //     where: {
    //         title: "Yesterday"
    //     }
    // });

    // console.log(songs);
    // console.log(songs[0]);
    // console.log("songs[0].title value is:",songs[0].title);
    // console.log(songs[1]);


};

myAsyncFn();


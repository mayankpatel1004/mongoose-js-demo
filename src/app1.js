const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/createnewdb")
.then(() => console.log("Connection Successful......"))
.catch((err) => console.log(err));

// playlistSchema = p small because this is object or instance
const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim: true,
        //lowercase: true,
        uppercase: true,
        minlength:[2, "minimum 2letters"],
        maxlength:10
    },
    ctype : {
        type : String,
        enum: ["frontend","Back End","database"]
    },
    videos : {
        type : Number,
        validate(value) {
            if(value < 0) {
                throw new Error("videos count should not be negative");
            }
        },
        // validate : {
        //     validator:function(value) {
        //         return value.length < 0
        //     },
        //     message: "Videos count should not be negative !!!"
        // }
    },
    author : String,
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});

// while define model, our class name should be in Pascal Case
// This will convert singular to Plural 
// This will create collections into database (Table in database)
const Playlist = new mongoose.model("Playlist", playlistSchema);


// Create or insert document //

const createDocument = async () => {
    try {

        const jsPlaylist = new Playlist({
            name: "Javascript",
            ctype : "Front End",
            videos : 90,
            author : "Mayank Patel",
            active : false
        });

        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            ctype: "Database",
            videos : 90,
            author : "Mayank Patel",
            active : false
        });

        const mongoosePlaylist = new Playlist({
            name: "Mongoose JS",
            ctype: "Database",
            videos : 90,
            author : "Mayank Patel",
            active : false
        });

        const expressPlaylist = new Playlist({
            name: "Express JS",
            ctype: "Back End",
            videos : 90,
            author : "Mayank Patel",
            active : false
        });

        const result = await Playlist.insertMany([jsPlaylist, mongoPlaylist, mongoosePlaylist, expressPlaylist]);
        console.log(result);    
    } catch (error) {
        console.log(error);
    }
}

//createDocument();

const getDocument = async () => {
    try {
        //const result = await Playlist.find({ctype: 'Front End'}).select({name:1,_id:0});
        const result = await Playlist.find({ctype: 'Front End'}).select({name:1,_id:0}).limit(1);
        console.log(result);    
    } catch (error) {
        console.log(error);
    }
}

//getDocument();


const getDocumentOperator = async () => {
    try {
        //const result = await Playlist.find({videos: {$gt : 70}}).select({name:1});
        //const result = await Playlist.find({videos: {$gte : 70}}).select({name:1});
        //const result = await Playlist.find({videos: {$lte : 70}}).select({name:1});
        //const result = await Playlist.find({ctype: {$in : ['Database','Front End']}}).select({name:1});
        const result = await Playlist.find({ctype: {$nin : ['Database','Front End']}}).select({name:1});
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

//getDocumentOperator();





const getDocumentByLogicalOperator = async () => {
    try {
        //const result = await Playlist.find({$or : [{ctype: 'Back End'},{author: 'Mayank Patel 3'}]}).select({name:1});
        const result = await Playlist.find({$and : [{ctype: 'Back End'},{author: 'Mayank Patel 3'}]}) .select({name:1});
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

//getDocumentByLogicalOperator();





const getDocumentByCounting = async () => {
    try {
        const result = await Playlist
        .find({$or : [{ctype: 'Back End'},{author: 'Mayank Patel 3'}]})
        .select({name:1})
        .countDocuments();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

//getDocumentByCounting();




const getDocumentBySorting = async () => {
    try {
        const result = await Playlist
        .find({$or : [{author: 'Mayank Patel'}]})
        .select({name:1})
        .sort({name:-1});
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

//getDocumentBySorting();




const updateDocuments = async (_id) => {
    try {
        const results = await Playlist.updateOne({_id},{
            $set : {
                name : "React JS",
                videos : 92
            }
        });
        console.log(results);
    } catch (error) {
        console.log(error);
    }
}

//updateDocuments("6157c590720afa715b697db7");



const updateDocumentsByFind = async (_id) => {
    try {
        const results = await Playlist.findByIdAndUpdate({_id},{
            $set : {
                name : "React JS 94",
                videos : 94
            }
        },{
            new :true
        });
        console.log(results);
    } catch (error) {
        console.log(error);
    }
}

//updateDocumentsByFind("6157c590720afa715b697db7");



const deleteOneDocument = async (_id) => {
    try {
        //const result = await Playlist.deleteOne({_id: _id});
        const result = await Playlist.findByIdAndDelete({_id: _id});
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

//deleteOneDocument("6157c6d459e26bda6fe540fe");


///************************ Validation on Mongoose Start *******************************//
const createValidDocument = async () => {
    try {

        
        const expressPlaylist = new Playlist({
            name: "Negative",
            ctype: "Back End",
            videos : 5,
            author : "Mayank Patel",
            active : false
        });

        const result = await Playlist.insertMany([expressPlaylist]);
        console.log(result);    
    } catch (error) {
        console.log(error);
    }
}
createValidDocument();
const mongoose = require("mongoose");
const validator = require("validator");

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
    },
    author : String,
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is inValid");
            }
        }
    },
    active : Boolean,
    date : {
        type : Date,
        default : Date.now
    }
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

///************************ Validation on Mongoose Start *******************************//
const createValidDocument = async () => {
    try {        
        const expressPlaylist = new Playlist({
            name: "Mike",
            ctype: "Back End",
            videos : 5,
            author : "Mayank Patel",
            email : "mayank@gmail.com",
            active : false
        });

        const result = await Playlist.insertMany([expressPlaylist]);
        console.log(result);    
    } catch (error) {
        console.log(error);
    }
}
createValidDocument();
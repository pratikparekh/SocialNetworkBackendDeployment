// const mongoose =require('mongoose');
// const uuidv1= require('uuid/v1');
// const crypto = require('crypto');
// const {ObjectId} = mongoose.Schema;
// const userSchema = new mongoose.Schema({
// 	name:{
// 		type:String,
// 		required:true,
// 		trim:true
// 	},

// 	email:{
// 		type:String,
// 		required:true,
// 		trim:true
// 	},

// 	hashed_password:{
// 		type:String,
// 		required:true
		
// 	},
// 	salt:String,
// 	created:{
// 		type:Date,
// 		default:Date.now

// 	},
// 	updated:Date,
// 	photo:{
// 		data:Buffer,
// 		contentType:String
// 	},
// 	about:{
// 		type:String,
// 		trim:true
// 	},
// 	following:[{type:ObjectId, ref:"User"}],	
// 	followers:[{type:ObjectId, ref:"User"}],
// 	resetPasswordLink: {
//         data: String,
//         default: ""
//     }	
	
// });


// userSchema.virtual('password')
// .set(function(password){
// 	this._password = password
// 	this.salt=uuidv1()
// 	this.hashed_password = this.encryptPassword(password)
// })
// .get(function () {

// 	return this._password 
// 	// body...
// })


// userSchema.methods={

// 	authenticate: function(plainText){
// 		return this.encryptPassword(plainText)== this.hashed_password
// 	},

// 	encryptPassword: function(password){
// 		if(!password) return "";
// 		try{

// 			return crypto.createHmac('sha1', this.salt)
//                    .update(password)
//                    .digest('hex');
// 		}
// 		catch(err){
// 			return ""
// 		}
// 	}	
// };

// module.exports = mongoose.model("User",userSchema)



const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }
});

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Keep in mind: virtual properties (password) don’t get persisted in the database.
 * They only exist logically and are not written to the document’s collection.
 */

// virtual field
userSchema
    .virtual("password")
    .set(function(password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptPassword()
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);


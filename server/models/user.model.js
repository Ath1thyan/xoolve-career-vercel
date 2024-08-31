import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['freelancer','recruiter'],
        required:true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:`https://avatar.iran.liara.run/public/boy`,
        },
        education: {
            type: Array,
            schema: {
                degree: String,
                institution: String,
                startDate: Date,
                endDate: Date
            },
            required: false,
            default: [],
            validate: [
                function(v) {
                    return v.length <= 5;
                },
            ]
        },
        experience: {
            type: Array,
            schema: {
                title: String,
                company: String,
                startDate: Date,
                endDate: Date,
                responsibilities: [String],
                achievements: [String],
            },
            required: false,
            default: [],
            validate: [
                function(v) {
                    return v.length <= 15;
                }
            ]
        }
    }
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema);
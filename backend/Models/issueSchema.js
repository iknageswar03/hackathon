const mongoose=require('mongoose');

const issueSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
},{
    timestamps:true
})


const Issue=mongoose.model('Issue',issueSchema);
module.exports=Issue;
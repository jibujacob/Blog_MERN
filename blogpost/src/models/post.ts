import mongoose from "mongoose";

interface PostAttrs{
    title:string;
    description:string;
    photo?:string;
    userId:string;
    categories?:Array<string>
}

interface PostModel extends mongoose.Model<PostDoc>{
    build(attrs:PostAttrs):PostDoc;
}

interface PostDoc extends mongoose.Document{
    title:string;
    description:string;
    photo?:string;
    userId:string;
    categories?:Array<string>
}

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
   description:{
    type:String,
    required:true,
    },
    photo:{
        type:String,
        required:false,
    },
    userId:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:false,
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps:true
});

postSchema.statics.build = (attrs: PostAttrs) =>{
    return new Post(attrs);
}

const Post = mongoose.model<PostDoc,PostModel>("Post",postSchema);

export {Post}
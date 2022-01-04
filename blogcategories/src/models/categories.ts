import mongoose from "mongoose";

interface CategoriesAttrs{
    name:string;
}

interface CategoriesModel extends mongoose.Model<CategoriesDoc>{
    build(attrs:CategoriesAttrs):CategoriesDoc;
}

interface CategoriesDoc extends mongoose.Document{
    name:string;
}

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
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

categoriesSchema.statics.build = (attrs: CategoriesAttrs) =>{
    return new Categories(attrs);
}

const Categories = mongoose.model<CategoriesDoc,CategoriesModel>("Categories",categoriesSchema);

export {Categories}
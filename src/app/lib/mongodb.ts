import mongoose from "mongoose";
interface MogooseGlobal{
    conn?:mongoose.Connection | null,
    promise?:Promise<mongoose.Connection> | null
}
const globalWithMongoose=globalThis as typeof globalThis & {mongooseGlobal:MogooseGlobal}
export async function dbconnect(){
    if(globalWithMongoose.mongooseGlobal?.conn)
        return globalWithMongoose.mongooseGlobal.conn
    if(!process.env.MONGO_URL)
        throw new Error ("Couldn't locate the MONGO_URL")
    globalWithMongoose.mongooseGlobal=globalWithMongoose.mongooseGlobal || {}

    globalWithMongoose.mongooseGlobal.promise=globalWithMongoose.mongooseGlobal.promise ||
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"stratusdb",
        autoIndex:true
    }).then((mongooseInstance)=>mongooseInstance.connection)
    globalWithMongoose.mongooseGlobal.conn= await (globalWithMongoose.mongooseGlobal.promise)
    console.log("🔗 MongoDB connected:", globalWithMongoose.mongooseGlobal.conn.readyState);
}
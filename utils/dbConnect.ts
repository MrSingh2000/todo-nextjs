import mongoose from "mongoose";
import * as data from "../env.json";

const mongoURI: string = data.MONGODB_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("DB connected!");
        })
        .catch((error: any) => {
            console.log("DB error: ", error);
        })
};

export default connectToMongo;
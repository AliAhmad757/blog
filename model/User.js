import { mongoose, models } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

const Users = models.user || mongoose.model("user", userSchema)
export default Users
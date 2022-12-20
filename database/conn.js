import mongoose from "mongoose"

const DB = process.env.DATABASE

// export default mongoose.connect(DB).then((res) => {
//     console.log("mongoose connection succesfully")
// }).catch((err) => console.log(err))

const connectMongo = async () => {
    try {
        const { connection } = await mongoose.connect(DB)
        if (connection.readyState == 1) {
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo
import mongoose from "mongoose"

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then()
    .catch((err) => console.log(err));

    
}

export default connectDatabase

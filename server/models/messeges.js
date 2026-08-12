import mongoose from "mongoose";
const { Schema } = mongoose;
const msg = new Schema({
    role: String,
    content: String
});
export default mongoose.model("messege", msg);
//# sourceMappingURL=messeges.js.map
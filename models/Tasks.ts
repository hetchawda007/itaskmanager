import mongoose from "mongoose";
const Schema = mongoose.Schema;
const taskschema = new Schema({
    username: {
        type: String,
        default: "het chawda",
        required: false,
    },
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    }
});

export default mongoose.models.Tasks || mongoose.model('Tasks', taskschema);
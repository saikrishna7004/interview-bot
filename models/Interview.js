import { Schema, model, models } from 'mongoose';

const interviewSchema = new Schema({
    topic: String,
    jobDescription: String,
    conversation: Array,
    feedback: Array,
    username: String
}, {
    timestamps: true
});

const Interview = models.Interview || model('Interview', interviewSchema);

export default Interview;

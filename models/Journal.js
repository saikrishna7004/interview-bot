import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
    journal: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Store the current date if not provided
    },
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);

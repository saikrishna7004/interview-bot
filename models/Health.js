import { Schema, model, models } from 'mongoose';

const healthSchema = new Schema({
    sleepTime: {
        type: String,
        required: true
    },
    wakeTime: {
        type: String,
        required: true
    },
    foodIntake: {
        type: String,
    },
    waterIntake: {
        type: Number,
    },
    additionalHealthData: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Health = models.Health || model('Health', healthSchema);

export default Health;

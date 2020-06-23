const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    model = mongoose.model.bind(mongoose),
    ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    status: { type: Object, default: { active: true, message: 'Your account is active' } },
    subscribed: { type: Boolean, default: false },
    roles: { type: Array, default: [4] },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    patronym: { type: String, required: true },
    img: { type: String, default: '' },
    age: { type: Number, required: false },
    sex: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    hash: { type: String, required: true },
    appointments: [{ type: ObjectId, ref: 'Appointment' }]
});

const User = model('User', userSchema);

module.exports = User;

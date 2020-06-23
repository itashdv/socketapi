const mongoose = require('mongoose');
const emails = require('../utils/emails');
const Account = require('../controllers/account');
const User = require('../models/user');

const Schema = mongoose.Schema,
    model = mongoose.model.bind(mongoose),
    ObjectId = mongoose.Schema.Types.ObjectId;

const appointmentSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    active: { type: Boolean, default: true },
    note: { type: String, default: 'Нет примечания' },
    date: { type: Date, required: true },
    dateConstructor: { type: Object, required: true },
    fingerprint: { type: String, unique: true, required: true },
    instructor: { type: ObjectId, ref: 'User', required: true },
    student: { type: ObjectId, ref: 'User' }
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
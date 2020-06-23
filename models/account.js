const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    model = mongoose.model.bind(mongoose),
    ObjectId = mongoose.Schema.Types.ObjectId;

const accountSchema = new Schema({
    uuid: { type: String, required: true },
    apiKey: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    address: { type: String, required: true },
    coords: { type: Object, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: Object, default: { active: true, message: 'Company is active' } },
    timezone: { type: String, default: 'Europe/Moscow' },
    user: { type: Object, required: true },
    slots: { type: Array, default: [] }
});

const Account = model('Account', accountSchema);

module.exports = Account;

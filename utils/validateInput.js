const validator = require('validator');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = {

	companyRegistration: data => {
		return new Promise((resolve, reject) => {
			const strArr = Object.values(data);
			strArr.map(el => {
				if (!el || typeof el !== 'string') {
					reject('Please provide all the required fields!');
					return;
				}
			});
			if (
	    	data.name.length > 100 ||
	    	data.description.length > 1000 ||
	    	data.address.length > 100 ||
	    	data.lastname.length > 100 ||
	    	data.firstname.length > 100 ||
	    	data.patronym.length > 100
	    ) {
	    	reject('Maximum limit of symbols exceeded!');
				return;
	    }
	    const phoneNumber = phoneUtil.parseAndKeepRawInput(data.phone, 'RU');
	    const userPhoneNumber = phoneUtil.parseAndKeepRawInput(data.userphone, 'RU');
	    const isValidPhoneNumber = phoneUtil.isValidNumberForRegion(phoneNumber, 'RU');
	    const isValidUserPhoneNumber = phoneUtil.isValidNumberForRegion(userPhoneNumber, 'RU');
	    if (!isValidPhoneNumber || !isValidUserPhoneNumber) {
	    	reject('Invalid phone number!');
				return;
	    }
	    if (!validator.isEmail(data.email) || !validator.isEmail(data.useremail)) {
	    	reject('Invalid email!');
				return;
	    }
			resolve(data);
			return;
		});
	}

};
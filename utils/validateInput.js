const validateInput = (type, data) => {
	switch(type) {
		case 'COMPANY_REGISTRATION':
			const {
				name,
				description,
				address,
				phone,
				email,
				firstname,
				lastname,
				patronym,
				userphone,
				useremail
			} = data;
			if (!name || !description || !address || !phone || !email || !firstname || !lastname || !patronym || !userphone || !useremail) {
				return { error: 'Введите все необходимые поля!' };
			} else {
				return { success: data };
			}
		default:
			break;
	}
};

module.exports = validateInput;
module.exports = {

	companyRegistration: data => {
		return new Promise((resolve, reject) => {
			const { name, description, address, phone, email, firstname, lastname, patronym, userphone, useremail } = data;
			if (!name || !description || !address || !phone || !email || !firstname || !lastname || !patronym || !userphone || !useremail) {
				reject('Введите все необходимые поля!');
			} else {
				resolve(data);
			}
		});
	}

};
let userInfo = {
	username: "JDoe",
	name: {
		first: "John",
		last: "Doe",
	},
	email: "jdoe99@gmail.com",
};

const output = document.querySelector("#output");
displayUserInfo();

function displayUserInfo() {
	userName.value = userInfo.username;
	firstName.value = userInfo.name.first;
	lastName.value = userInfo.name.last;
	email.value = userInfo.email;
}

function editMode(flag) {
	if (flag == true) {
		userName.removeAttribute("readonly");
		firstName.removeAttribute("readonly");
		lastName.removeAttribute("readonly");
		email.removeAttribute("readonly");
	} else {
		userName.setAttribute("readonly", true);
		firstName.setAttribute("readonly", true);
		lastName.setAttribute("readonly", true);
		email.setAttribute("readonly", true);
	}
}

function saveUserProfile() {
	userInfo = {
		username: userName.value,
		name: {
			first: firstName.value,
			last: lastName.value,
		},
		email: email.value,
	};

	displayUserInfo();
	editMode(false);
}

const awn = new AWN({
	position: "top-right",
	durations: {
		global: 2000,
	},
});

const fieldset = document.querySelector("fieldset");
const image = document.querySelector(".avatar img");
const username = document.querySelector("#username");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const edit = document.querySelector("#edit");

const id = getCookie("id");
const token = getCookie("token");

// Load the user's data
async function loadData() {
	try {
		// Fetch the user's data
		const response = await (
			await fetch(`https://code-comp.duckdns.org/api/users/${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
		).json();

		if (!response.success) {
			throw new Error(response.message);
		} else {
			awn.info(response.message);
			console.info(response);
		}

		const { user } = response;
		image.src = user.avatar;
		username.value = user.username || "";
		firstName.value = user.name.first || "";
		lastName.value = user.name.last || "";
		email.value = user.email || "";
	} catch (error) {
		awn.alert(error.message);
		console.error(error);
		setTimeout(() => (location.pathname = "/login"), 2000);
	}
}
loadData();

document.querySelector("form").addEventListener("submit", async event => {
	event.preventDefault();

	if (password.value !== confirmPassword.value) {
		confirmPassword.setCustomValidity("Passwords do not match");
		return;
	}

	const data = {
		avatar: image.src,
		username: username.value,
		name: {
			first: firstName.value,
			last: lastName.value,
		},
		email: email.value,
		password: password.value,
	};

	// Don't include empty fields
	for (const key in data) {
		if (data[key] === "") {
			delete data[key];
		}
	}

	try {
		// Update the user
		const response = await (
			await fetch(`https://code-comp.duckdns.org/api/users/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			})
		).json();
		if (!response.success) {
			throw new Error(response.message);
		} else {
			awn.info(response.message);
			console.info(response);
		}
	} catch (error) {
		awn.alert(error.message);
		console.error(error);
	} finally {
		// Toggle editing
		toggleEdit();
	}
});

document.addEventListener("change", ({ target }) => {
	if (target.matches(".avatar input")) {
		// Add the avatar to the image element
		const file = target.files[0];
		const reader = new FileReader();
		reader.addEventListener("load", event => {
			image.src = event.target.result;
		});
		reader.readAsDataURL(file);
	}
	if (target.matches("#password, #confirmPassword")) {
		// Reset the password validity
		confirmPassword.setCustomValidity("");
	}
	if (target.matches(":invalid")) {
		// Show the error message
		awn.alert(target.validationMessage);
	}
});

document.addEventListener("input", ({ target }) => {
	if (target.matches(":invalid")) {
		target.style.animation = "shake 250ms ease-in-out alternate";
		target.addEventListener("animationend", () => {
			target.style.animation = "";
		});
	}
});

// Enable editing the profile
document.querySelector("#edit").addEventListener("click", event => {
	event.preventDefault();
	toggleEdit();
});

function toggleEdit() {
	if (edit.textContent === "Edit") {
		edit.textContent = "Cancel";
		fieldset.disabled = false;
		username.focus();
	} else {
		edit.textContent = "Edit";
		fieldset.disabled = true;
		loadData();
	}
}

// Utility to get a cookie
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}

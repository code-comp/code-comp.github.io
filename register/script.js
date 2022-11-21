const awn = new AWN({
	position: "top-right",
	durations: {
		global: 2000,
	},
});

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

document.querySelector("form").addEventListener("submit", async event => {
	event.preventDefault();

	if (password.value !== confirmPassword.value) {
		confirmPassword.setCustomValidity("Passwords do not match");
		return;
	}

	try {
		// Create a new user
		const response = await (
			await fetch(`https://code-comp.duckdns.org/api/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([
					{
						name: {
							first: firstName.value,
							last: lastName.value,
						},
						username: username.value,
						email: email.value,
						password: password.value,
					},
				]),
			})
		).json();

		if (!response.success) {
			throw new Error(response.message);
		} else {
			console.info(response);
		}

		setTimeout(() => (location.pathname = "/"), 2000);
	} catch (error) {
		awn.alert(error.message);
		console.error(error);
	}
});

document.addEventListener("change", ({ target }) => {
	if (target.matches("#username")) {
		// Reset the validity
		username.setCustomValidity("");
		// Provide a more specific error message
		if (target.validity.patternMismatch) {
			target.setCustomValidity(
				"Must be between 3 and 20 characters and contain only letters, numbers, underscores, periods, and dashes.",
			);
		}
	}
	if (target.matches("#password, #confirmPassword")) {
		// Reset the password validity
		password.setCustomValidity("");
		confirmPassword.setCustomValidity("");
		// Provide a more specific error message
		if (target.validity.patternMismatch) {
			target.setCustomValidity(
				"Must be between 8 and 32 characters and contain at least one uppercase and lowercase letter, number, and special character.",
			);
		}
	}
	if (target.matches(":invalid")) {
		// Show the error message
		awn.alert(target.validationMessage);
	}
});


const awn = new AWN({
	position: "top-right",
	durations: {
		global: 2000,
	},
});

const username = document.querySelector("#username");
const password = document.querySelector("#password");

document.querySelector("form").addEventListener("submit", async event => {
	event.preventDefault();

	try {
		// Authentication request
		const response = await (
			await fetch(`https://code-comp.duckdns.org/api/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username.value,
					password: password.value,
				}),
			})
		).json();

		if (!response.success) {
			throw new Error(response.message);
		}
		awn.info(response.message);
		console.info(response);

		document.cookie = `id=${response.id}; Same-Site=None; Path=/`;
		document.cookie = `token=${response.token}; Same-Site=None; Path=/`;
		setTimeout(() => (location.pathname = "/"), 2000);
	} catch (error) {
		awn.alert(error.message);
		console.error(error);
	}
});

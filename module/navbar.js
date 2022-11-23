import { getCookie } from "./utils.js";

const profile = document.querySelector(".pages [data-page='profile']");
const image = profile.querySelector("img");
const id = getCookie("id");
const token = getCookie("token");

if (id) {
	try {
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
		}

		const { user } = response;
		image.src = user?.avatar ?? "";
		profile.style.display = "block";
	} catch (error) {
		console.error(error);
	}
}

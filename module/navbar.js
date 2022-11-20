import { getCookie } from "./utils.js";

const image = document.querySelector("#profile");
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
	} catch (error) {
		console.error(error);
	}
}

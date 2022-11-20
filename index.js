import "./module/navbar.js";

if (location.pathname === "/") {
	if (document.readyState === "loading") {
		addEventListener("DOMContentLoaded", () => {
			import("./module/hero.js");
		});
	} else {
		import("./module/hero.js");
	}
}

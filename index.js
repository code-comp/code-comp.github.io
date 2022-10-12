import "./module/navbar.js";

if (location.pathname === "/") {
	import("./module/hero.js");
}

AOS.init({
	duration: 1500,
});

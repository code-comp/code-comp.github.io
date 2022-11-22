import "./module/navbar.js";

if (location.pathname === "/") {
	import("./module/hero.js");

	AOS.init({
		duration: 1500,
	});
}

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-VJV5SD78TZ");

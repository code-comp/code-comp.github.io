import "./module/navbar.js";

if (location.pathname === "/" || location.pathname === "/index.html") {
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

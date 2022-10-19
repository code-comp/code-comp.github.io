const userInfo = {
	username: "klabelle",
	name: {
		first: "Kyle",
		last: "Labelle",
	},
	email: "klabe099@uottawa.ca",
};

const output = document.querySelector("#output");

output.innerHTML =
	"Username: " +
	userInfo.username +
	"<br>First Name: " +
	userInfo.name.first +
	"<br>Last Name: " +
	userInfo.name.last +
	"<br>Email Address: " +
	userInfo.email;

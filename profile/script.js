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
	"<br>Username: " +
	userInfo.username +
	"<br><br>First Name: " +
	userInfo.name.first +
	"<br><br>Last Name: " +
	userInfo.name.last +
	"<br><br>Email Address: " +
	userInfo.email;

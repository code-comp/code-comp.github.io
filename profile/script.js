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

function openFormUsername() {
	document.getElementById("username-popup").style.display = "block";
}
	  
function closeFormUsername() {
	document.getElementById("username-popup").style.display = "none";
}

function openFormEmail() {
	document.getElementById("email-popup").style.display = "block";
}
	  
function closeFormEmail() {
	document.getElementById("email-popup").style.display = "none";
}

function openFormFname() {
	document.getElementById("fname-popup").style.display = "block";
}
	  
function closeFormFname() {
	document.getElementById("fname-popup").style.display = "none";
}

function openFormLname() {
	document.getElementById("lname-popup").style.display = "block";
}
	  
function closeFormLname() {
	document.getElementById("lname-popup").style.display = "none";
}


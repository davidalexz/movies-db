// function validation() {
// 	var name = document.getElementById("name").value;
// 	var password = document.getElementById("password").value;
// 	var error_message = document.getElementById("error_message");
// 	var text;

// 	error_message.style.padding = "10px";

// 	if(name.length <6) {
// 		text = "Please Enter Valid Username";
// 		error_message.innerHTML = text ;
// 		return false;
// 	}

// 	if(password.length < 8) {
// 		text = "Please Enter A Stronger Password";
// 		error_message.innerHTML = text ;
// 		return false;
// 	}

// var data = {
// 	username: name,
// 	password: password
// }

// var options =  {
// 		method: 'POST', // *GET, POST, PUT, DELETE, etc.
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		  // 'Content-Type': 'application/x-www-form-urlencoded',
// 		},
// 		body: JSON.stringify(data) // body data type must match "Content-Type" header
// 	}

// fetch('https://movies-api-siit.herokuapp.com/auth/register', options)
//   .then((response) => {
//     console.log(JSON.stringify( response ) )
//   })
//   .then((data) => {
//     console.log(data);
//   });

//  fetch('https://movies-api-siit.herokuapp.com/movies')
// .then(function(res){ return res.json(); })
// .then(function(data){ alert( JSON.stringify( data ) ) })
// 	text = "You have registered!";
// 	error_message.innerHTML = text ;
// 	return true;

// }

function login() {
	var lusername = document.getElementById("lusername").value;
	var lpassword = document.getElementById("lpassword").value;

	var error_message1 = document.getElementById("error_message1");
	var text;

	error_message1.style.padding = "10px";

	let data = {
		username: lusername,
		password: lpassword
	};

	let options = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	};

	async function loginUser() {
		const response = await fetch("https://movies-api-siit.herokuapp.com/auth/login", options);
		const datas = await response.json();

		if (response.status === 200) {
			userMessage.innerHTML = "You have registered";
		} else if (response.status === 409) {
			userMessage.innerHTML = "Username already existing";
		}
		// console.log(datas);
		const { accessToken } = datas;
		// console.log(accessToken);
		sessionStorage.setItem("accessToken", accessToken);
		form.reset();
		removeUserMessage(error_message1);
	}

	if (checkInputs(lusername, lpassword)) {
		loginUser();
	}

	function checkInputs(lusername, lpassword) {
		message = document.getElementById("error_message1");
		let isFormValid = true;
		if (!lusername || !lpassword) {
			message.innerHTML = "All fields must be completed!";
			isFormValid = !isFormValid;
			resetForm();
		} else if (lpassword.length < 6) {
			message.innerHTML = "Password too short";
			isFormValid = false;
			resetForm();
		}

		if (lusername.length < 6) {
			text = "Please Enter A Valid Username";
			error_message1.innerHTML = text;
			return false;
		}

		if (lpassword.length < 6) {
			text = "Please Enter A Stronger Password";
			error_message1.innerHTML = text;
			return false;
		}

		text = "You have signed up!";
		error_message1.innerHTML = text;

		return true;
	}
}

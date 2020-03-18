
function validation() {
	let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeat-password").value;
	let userMessage = document.getElementById("user-message");
	let form = document.getElementsByClassName("register-form")[0];
	userMessage.style.padding = "10px";
	
	let data = {
		username: name,
		password: password
	}

	let options = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

		async function registerUser(){
			const response = await fetch('https://movies-api-siit.herokuapp.com/auth/register', options)
			const datas = await response.json();

			if(response.status === 200){
				userMessage.innerHTML = "You have registered";
			}else if(response.status === 409){
				userMessage.innerHTML = 'Username already existing';
			}
			// console.log(datas);
			const {accessToken} = datas;
			// console.log(accessToken);
			sessionStorage.setItem('accessToken', accessToken);
			form.reset();
			removeUserMessage(userMessage);
		}

		if(checkInputs(name, password, repeatPassword)){
			registerUser();
		}
}

function checkInputs(userName, userPassword, userRepeatPassword){
	message = document.getElementById("user-message");
	let isFormValid = true;
	if(!userName || !userPassword || !userRepeatPassword){
		message.innerHTML = "All fields must be completed!"
		isFormValid = !isFormValid;
		resetForm();
	}else if(userPassword.length < 6 || userRepeatPassword.length < 6){
		message.innerHTML = "Password too short";
		isFormValid = false;
		resetForm();
	}

	if(userPassword !== userRepeatPassword){
		isFormValid = false;
		document.getElementById("user-message").innerHTML = "The passwords do not match";
		resetForm();
	}

	function resetForm(){
		if(isFormValid === false){
			document.getElementsByClassName("register-form")[0].reset();
			const message = document.getElementById("user-message");
			removeUserMessage(message);
			return; 
		}
	}

	return isFormValid;
}

function removeUserMessage(message){
	setTimeout(function () { 
		message.innerHTML = "";
	}, 3000)
}

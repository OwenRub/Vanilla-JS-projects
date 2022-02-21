const status = [{
	inner: "Invalid Email",
	color: "red"
},{
	inner: "Valid Email",
	color: "green"
}];

const validateUser = data => {
	let result = String(data)
	  .toLowerCase()
	  .match(
	  	  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  	  ) === null ? false : true;
	notify(result);
}

const notify = flag => {
	let msg = document.getElementById('user-status');
	msg.innerHTML = status[Number(flag)].inner;
	msg.style.color = status[Number(flag)].color;
}

document.getElementById('log-in-form').addEventListener('focus', event => {
	event.target.style.background = 'white';
}, true);
document.getElementById('log-in-form').addEventListener('blur', event => {
	event.target.style.background = '#e3e3e3';
}, true);
document.getElementById('loginBtn').addEventListener('click', event => {
	document.getElementById('content').className = "log-in-container";
});
document.getElementById('cancel').addEventListener('click', event => {
	document.getElementById('content').className = "log-in-container hidden";
});
document.getElementById('user').addEventListener('keyup', event => {
		validateUser(document.getElementById('user').value)
});
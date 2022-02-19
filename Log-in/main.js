document.getElementById('log-in-form').addEventListener('focus', event => {
	event.target.style.background = 'white';
}, true);
document.getElementById('log-in-form').addEventListener('blur', event => {
	event.target.style.background = '#e3e3e3';
}, true);
document.getElementById('loginBtn').addEventListener('click', event => {
	document.getElementById('content').className = "log-in-container";
})
document.getElementById('cancel').addEventListener('click', event => {
	document.getElementById('content').className = "log-in-container hidden";
})
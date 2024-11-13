function redirectToFormB(){
    window.location.href = "taskB.html";
}

function taskB(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const url = `form_result.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&age=${encodeURIComponent(age)}`;
    window.location.href = url;
}

function redirectToFormC(){
    window.location.href = "taskC.html";
}

function taskC(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    let error = "";
    let valid = true;

    if (name.length < 3) {
        valid = false;
        error += "name_too_short_should_be_longer_than_3_characters AND ";
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        valid = false;
        error  += "invalid_email_format AND ";
    }

    if (age < 18 || age > 120) {
        valid = false;
        error += "invalid_age_should_be_between_18_and_120 AND "
    }

    if (valid) {
        const url = `form_result.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&age=${encodeURIComponent(age)}`;
        window.location.href = url;

    }
    else{
        const url = `form_error.html?error=${encodeURIComponent(error)}`;
        window.location.href = url;
    }


}

function redirectToFormD(){
    window.location.href = "taskD.html";
}

function taskD() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;

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

    const p_regex = /^\d{3}-\d{3}-\d{3}$/;

    if (!p_regex.test(phone)) {
        valid = false;
        error += "invalid_phone_number_should_be_like_111-222-333"
    }

    if (valid) {
        let id ="";

        id += name.toUpperCase().charAt(0);

        id += email.split('@')[0].charAt(0);
        id += email.split('.')[1].charAt(0);

        id += "-"+age+"-";

        id += phone.split("-")[0].charAt(0);
        id += phone.split("-")[1].charAt(1);
        id += phone.split("-")[2].charAt(2);

        let date = Date.now().toString();

        id += '-'+date.charAt(date.length-1);
        id += date.charAt(date.length-2);

        let url = `id_generation.html?id=${encodeURIComponent(id)}`;
        window.location.href = url;

    }
    else{
        let url = `form_error.html?error=${encodeURIComponent(error)}`;
        window.location.href = url;
    }


}

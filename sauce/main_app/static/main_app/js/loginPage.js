function change_auth_method() {
    var input = document.getElementById("email_field");
    var label = document.getElementById("email_field_label");
    var button = document.getElementById("change-button");
    if(input.name == "email") {
        input.name = "phone_number";
        input.type = 'tel';
        input.pattern = "8[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}";
        input.placeholder = "89007001010";
        label.innerHTML = "Телефон";
        button.innerHTML = "Авторизоваться по почте";

    } else if(input.name == "phone_number") {
        input.name = "email";
        input.type = 'email';
        input.removeAttribute("pattern");
        input.removeAttribute("placeholder");
        label.innerHTML = "Email";
        button.innerHTML = "Авторизоваться по номеру телефона";
    }
}
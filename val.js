function valName() {
  const field = document.getElementById("name").value;
  const regex = /^([a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+\s[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+\s?)+$/u;
  let error = "Invalid input";
  if (!field) {
    error = "Must Complete"
    document.getElementById("errName").innerHTML = error;
    document.getElementById("errName").style.display = 'inline';
  } else if (!regex.test(field)) {
    error = "Invalid Name";
    document.getElementById("errName").innerHTML = error;
    document.getElementById("errName").style.display = 'inline';
  } else {
    document.getElementById("errName").innerHTML = error;
    document.getElementById("errName").style.display = 'none';
  }
}

function valEmail () {
  const field = document.getElementById("email").value;
  const regex = /\w*\@\w*\.[a-z]{3}/;
  let error = "Invalid input";
  if (!field) {
    error = "Must Complete"
    document.getElementById("errEmail").innerHTML = error;
    document.getElementById("errEmail").style.display = 'inline';
  } else if (!regex.test(field)) {
    error = "Invalid Email address";
    document.getElementById("errEmail").innerHTML = error;
    document.getElementById("errEmail").style.display = 'inline';
  } else {
    document.getElementById("errEmail").innerHTML = error;
    document.getElementById("errEmail").style.display = 'none';
  }
}
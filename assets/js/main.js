const logform = document.querySelector("#log-form");
const regform = document.querySelector("#reg-form");
logform.addEventListener("submit", handlelogSubmit);
regform.addEventListener("submit", handleregSubmit);

// IsEmpty
function isEmpty(value) {
  var isEmptyObject = function (a) {
    if (typeof a.length === "undefined") {
      // it's an Object, not an Array
      var hasNonempty = Object.keys(a).some(function nonEmpty(element) {
        return !isEmpty(a[element]);
      });
      return hasNonempty ? false : isEmptyObject(Object.keys(a));
    }

    return !a.some(function nonEmpty(element) {
      // check if array is really not empty as JS thinks
      return !isEmpty(element); // at least one element should be non-empty
    });
  };
  return (
    value == false ||
    typeof value === "undefined" ||
    value == null ||
    (typeof value === "object" && isEmptyObject(value))
  );
}

function isEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

// SetError
function setError(inputel, msg) {
  const formgroup = inputel.parentElement;
  const formerror = formgroup.querySelector(".form-error--feedback");
  if (!formgroup.classList.contains("error")) {
    formgroup.classList.add("error");
    formerror.innerHTML = msg;
  }
}

// Clear Error
function setErrorClear(inputel) {
  const formgroup = inputel.parentElement;
  const formerror = formgroup.querySelector(".form-error--feedback");
  if (formgroup.classList.contains("error")) {
    formgroup.classList.remove("error");
    formerror.innerHTML = null;
  }
}

const emptycheck = (el) => {
  if (isEmpty(el.value)) {
    setError(el, "All fields are Required.");
    return false;
  } else {
    setErrorClear(el);
    return true;
  }
};

const emailcheck = (el) => {
  if (!isEmail(el.value)) {
    setError(el, "Inavlid Email Address.");
    return false;
  } else {
    setErrorClear(el);
    return true;
  }
};

const matchPassword = (pass1, pass2) => {
  if (pass1.value === pass2.value) {
    setErrorClear(pass1);
    return true;
  } else {
    setError(pass1, "Password do not match.");
    return false;
  }
};

//  Handle Login Validation
function loginValidation() {
  const logusername = document.querySelector("#log-username");
  const logpassword = document.querySelector("#log-password");
  // Empty Check
  emptycheck(logusername);
  emptycheck(logpassword);
  if (emptycheck(logusername) && emptycheck(logpassword)) {
    return true;
  } else {
    return false;
  }
}
//  Handle Register Validation
function regValidation() {
  const regusername = document.querySelector("#reg-username");
  const regpassword = document.querySelector("#reg-password");
  const regemail = document.querySelector("#reg-email");
  const confirm_password = document.querySelector("#confirm_password");
  // Empty Check
  let validuser = emptycheck(regusername);
  let validpass = emptycheck(regpassword);
  let validemail = emptycheck(regemail);
  let validcpassword = emptycheck(confirm_password);
  if (validemail) {
    emailcheck(regemail);
  }
  if (validcpassword) {
    matchPassword(regpassword, confirm_password);
  }

  if (
    validuser &&
    validpass &&
    validemail &&
    validcpassword &&
    validemailAddress
  ) {
    return true;
  } else {
    return false;
  }
}

// Handle Login Submit
async function handlelogSubmit(e) {
  e.preventDefault();
  // handle Login validation
  let valid = await loginValidation();
  if (valid === true) {
    console.log("LOGIN SUBMIT");
  }
}

// Handle Register Submit
async function handleregSubmit(e) {
  e.preventDefault();
  let valid = await regValidation();
  if (valid === true) {
    console.log("REGISTER SUBMIT");
  }
}

const valid = ({fullName, userName, email, password, confirm_password}) => {
    const err = {}
    
    if(!fullName){
        err.fullName = "Please Enter your fullname."
    }else if(fullName.length > 25){
        err.fullName = "Fullname is up to 25 letters only."
    }

    if(!userName){
        err.userName = "Please Enter your username."
    }else if(fullName.replace(/ /s, '').length > 25){
        err.userName = "username is too long."
    }

    if(!email){
        err.email = "Please Enter your email"
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect!"
    }

    if(!password){
        err.password = "Please Enter your password"
    }else if(password < 6){
        err.fullName = "Password must be atleast 6 letters!"
    }
    if(password !== confirm_password){
        err.confirm_password = "Confirm password not equal"
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

export default valid;
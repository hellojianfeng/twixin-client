const validator = require("validator");

export class User {
  mobile: string;
  email: string;
  password: string;
  isValidMobile() {
    return validator.isNumeric(this.mobile);
  }
  isValidEmail() {
    return validator.isEmail(this.email);
  }
}
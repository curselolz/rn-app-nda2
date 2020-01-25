const regExps = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^[0-9]\d{10}$/,
};

export default validate = (value, type) => {
  if ( value === undefined ) {
    return false
  } else {
    switch (type) {
      case 'email':
        return regExps.email.test(value.toLowerCase());
      case 'password':
        return value.length < 8 ? false : true;
      case 'phone': {
        return regExps.phone.test(value);
      }
        
      default:
        break;
    }
  }
};

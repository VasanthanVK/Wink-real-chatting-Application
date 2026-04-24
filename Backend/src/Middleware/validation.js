export const validationSchema = {
  Name: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: "Length b/w 3 to 15 character",
    },
    isString: {
      errorMessage: "Name must be string fromat ",
    },
  },
  Bio: {
    notEmpty: {
      errorMessage: "Bio cannot be empty",
    },
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: "Bio must be between 5 and 100 characters",
    },
  },
  Email: {
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
    matches: {
      options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: "Email format is invalid",
    },
  },
  Password: {
    notEmpty: {
      errorMessage: "password have be must",
    },
    matches: {
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      errorMessage:
        "use strong password like uppercase,lowercase,number,symbol",
    },
  },
  Phone: {
    notEmpty: {
      errorMessage: "Phone number is required",
    },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: "Phone number must be 10 digits",
    },
    isNumeric: {
      errorMessage: "Phone number must contain only digits",
    },
    trim: true,
  },
};

export const updateValidationSchema = {
  Name: {
    optional: true,
    isLength: { options: { min: 3, max: 15 }, errorMessage: "Length b/w 3 to 15 character" },
    isString: { errorMessage: "Name must be string format" },
  },  
  Bio: {
    optional: true,
    isLength: { options: { min: 5, max: 100 }, errorMessage: "Bio must be between 5 and 100 characters" },  
  }
}
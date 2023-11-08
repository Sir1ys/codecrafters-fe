import { validate } from "validate.js";

const validateEmail = (id, value) => {
  const contraints = {
    presence: { allowEmpty: false },
    email: {},
  };

  if (value !== "") {
    contraints.email = true;
  }

  const result = validate({ [id]: value }, { [id]: contraints });

  return result && result[id];
};

const validatePassword = (id, value) => {
  const contraints = {
    presence: { allowEmpty: false },
  };

  if (value !== "") {
    contraints.length = {
      minimum: 6,
      message: "must be atleast 6 characters long",
    };
  }

  const result = validate({ [id]: value }, { [id]: contraints });

  return result && result[id];
};

export const validateString = (id, value) => {
  const contraints = {
    presence: { allowEmpty: false },
  };

  const result = validate({ [id]: value }, { [id]: contraints });

  return result && result[id];
};

export const validateInput = (inputId, inputValue) => {
  if (inputId === "email") {
    return validateEmail(inputId, inputValue);
  } else if (inputId === "password") {
    return validatePassword(inputId, inputValue);
  } else if (inputId === "username") {
    return validateString(inputId, inputValue);
  }
};

export const reducer = (state, action) => {
  const { validationResult, inputId } = action;

  let firstValidationResult = validationResult;

  if (validationResult) {
    firstValidationResult = validationResult[0];
  }

  const updatedValidities = {
    ...state.inputValidities,
    [inputId]: firstValidationResult,
  };

  let updatedFormIsValid = true;

  for (const key in updatedValidities) {
    if (updatedValidities[key] !== undefined) {
      updatedFormIsValid = false;
      break;
    }
  }

  return {
    inputValidities: updatedValidities,
    formIsValid: updatedFormIsValid,
  };
};

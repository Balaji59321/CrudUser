export const initialValue = {
  profile: {
    name: "",
    mail: "",
    phone: "",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE":
      return { ...state, profile: action.value };
    default:
      return state;
  }
};

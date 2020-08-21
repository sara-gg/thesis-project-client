interface RootState {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  gender: string;
  address: string;
  isAuthenticated: boolean;
  title: string;
  description: string;
  images: string[];
  location: string;
  price: number;
  quantity: number;
  height: number;
  width: number;
  depth: number;
  materials: string;
}

const initialState: RootState = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  birthdate: "",
  gender: "",
  address: "",
  isAuthenticated: false,
  title: "",
  description: "",
  images: [] as string[],
  location: "",
  price: 0,
  quantity: 0,
  height: 0,
  width: 0,
  depth: 0,
  materials: "",
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_REGISTER_DETAILS":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_NEW_PRODUCT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;

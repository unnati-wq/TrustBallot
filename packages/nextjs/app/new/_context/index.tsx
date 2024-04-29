import { createContext, useReducer } from "react";

interface NewVotingState {
  name: string;
  dateEnd: string;
  description: string;
  addresses: string[];
  options: string[];
}

interface Action {
  type: string;
  payload: any;
}

const initialState: NewVotingState = {
  name: "",
  dateEnd: "",
  description: "",
  addresses: [],
  options: [],
};

export const NewVotingStateContext = createContext<{
  state: NewVotingState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: NewVotingState, action: Action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_DATE_END":
      return { ...state, dateEnd: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "REMOVE_ADDRESS":
      return { ...state, addresses: state.addresses.filter(addr => addr !== action.payload) };
    case "ADD_OPTION":
      return { ...state, options: [...state.options, action.payload] };
    default:
      return state;
  }
};

export const NewVotingStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <NewVotingStateContext.Provider value={{ state, dispatch }}>{children}</NewVotingStateContext.Provider>;
};

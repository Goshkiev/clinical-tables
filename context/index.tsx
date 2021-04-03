import { useState, useEffect, useReducer, createContext } from "react";
import { search } from "./reducers/search";

interface IState {
  searchedData: [];
}
interface IContextProps {
  state: IState;
  dispatch: ({ type }: { type: string }) => void;
}

// initial state
const initialState = {
  searchedData: [],
};

// create context
const Context = createContext({} as IContextProps);

// combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(search), initialState);
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };

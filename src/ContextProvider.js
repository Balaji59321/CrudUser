import React from "react";
import { useReducer, useContext } from "react";

export const Context = React.createContext();

function ContextProvider({ reducer, initialValue, children }) {
  return (
    <Context.Provider value={useReducer(reducer, initialValue)}>
      {children}
    </Context.Provider>
  );
}
export default ContextProvider;

export const useContextProvider = () => useContext(Context);

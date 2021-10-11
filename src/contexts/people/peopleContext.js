import React, { createContext, useContext, useReducer } from 'react';

/* State */
import initialState from './peopleState.js';

/* Reducer */
import sidebarReducer from './peopleReducer';

const SidebarContext = createContext();

export const SidebarProvider = (props) => {
  const [sidebarState, sidebarDispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={{sidebarState, sidebarDispatch}}>
      {props.children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext);

import React, { createContext, useContext, useReducer } from 'react';

/* State */
import initialState from './sidebarState.js';

/* Reducer */
import sidebarReducer from './sidebarReducer';

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

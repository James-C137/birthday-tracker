/* Reducers */
import {
  toggleSidebar,
} from './sidebarReducers.js';

const sidebarReducer = (state, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      toggleSidebar(newState);
      break;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  return newState;
}

export default sidebarReducer;

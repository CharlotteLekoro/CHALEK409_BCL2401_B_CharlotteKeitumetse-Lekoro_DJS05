function counter(state = 0, action) {
  switch (
    action.type //decides how to update the state based on the action that was dispatched.
  ) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default: //When the action type does not match the statements in the switch block, it executes and returns to default state
      return state;
  }
}
// function a new store that manages the state of the application using a reducer function.
function createStore(reducer) {
  let state; //holds the current state of the store
  let listeners = []; //holds function that will be called whenever the state changes.

  // Get the current state
  const getState = () => state; //returns current state of the store

  // Dispatch an action to update the state
  const dispatch = (action) => {
    //used to updte the state by sending an action to reducer
    state = reducer(state, action); //
    listeners.forEach((listener) => listener());
  };

 

 
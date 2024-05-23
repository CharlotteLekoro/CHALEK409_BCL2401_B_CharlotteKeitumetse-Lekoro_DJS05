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
  // Subscribe to state changes
  const subscribe = (listener) => {
    //allows parts of application to register functions that should be called whenever the state changes
    listeners.push(listener);
    // Return an unsubscribe function
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize the state by dispatching an empty action
  dispatch({});

  return { getState, dispatch, subscribe }; // returns the store API with getState, dispatch, subscribe methods
}
// Create the store with the counter reducer
let store = createStore(counter);

// Subscribe to state changes and log the new state to the console
store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Example dispatches to test the store
store.dispatch({ type: 'INCREMENT' }); // State changed: 1
store.dispatch({ type: 'INCREMENT' }); // State changed: 2
store.dispatch({ type: 'DECREMENT' }); // State changed: 1
store.dispatch({ type: 'RESET' });     // State changed: 0

// Scenario Checks
console.log('Initial state:', store.getState()); // Scenario 1: Initial State Verification
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
console.log('After increment:', store.getState()); // Scenario 2: Incrementing the Counter
store.dispatch({ type: 'DECREMENT' });
console.log('After decrement:', store.getState()); // Scenario 3: Decrementing the Counter
store.dispatch({ type: 'RESET' });
console.log('After reset:', store.getState()); // Scenario 4: Resetting the Counter
/*
!                   REDUX 

(1)  https://redux.js.org/

Basically we have two kind of state:
      a) component level state
      b) application state (global state)

/ Component level state has to do with a specific component.
E.g: a slider or a drop down.
You may have a piece of components state, which is essentially just JavaScript object with some key value pairs.

You may have something called open, which could be either true or false, and depending on that true or false value, the menu would display as opened or closed.

That's just a simple example of component level state.
And that's not what we would have in Redux.

/ Redux is for application or global state.
E.g: Products, because our products we gonna want to use and multiple components or just access, maybe update products, add products, delete,...
? You want them available to all of our components.

Some other e.g we might have in our global state is the authenticated user.
So when we login, we want to have access to that users data, that will be held in the state.
The shopping cart items, orders, ...... that would be in the global state.

/ The way that state is changed is through reducers or reducer function.
And it basically just a function that accept actions.
And they are responsible for manipulating and passing the state down to components.

/ Actions are just objects that represent the intention to change a piece of state.

/ We also have action creators, which are functions that will dispatch or fire off those actions.
E.g, we may have an action creator function called getProducts(), and in that action creator,
we make a fetch request to the backend to get data using axios for example.
And then we get that data back and then we dispatch an action to the reducer and we attach a payload to it. ANd that payload will have the fetched data.

In reducer, we can assign that payload data to the state and we can pass it down to any components that 
ask for it. We can have multiple components that ask for the same piece of state.

/ Think of state as like a cloud hovering over your application.
When we need something to happen, like we want to click a button and fetch some data from the server and
then display it. We have to create an action or action creator to dispatch a specific action to the reducer and then the reducer passes it down to the component.

! Attention:
Redux is not specifically attached to react. You can use redux on its own. You can use it with other frameworks too. We gonna use a package called "react-redux" that connects the 2 together.
                            --------------------------------------

/ (1) Create a Redux store

* npm i redux react-redux redux-thunk redux-devtools-extension

Redux a state manager 

? redux-thunk
(a piece of middleware) allows us in our action creators, allows us to make asynchronous requests because we gonna have to talk to our server from those action creators.

? redux-devtools-extension
Because redux-devtools do not work by default.
You have to add a piece of code to set it up.
*/

/*   create /src/store.js  *

This is where we connect all of our reducers and any middleware.

? combineReducers 
We gonna have a bunch of reducers and each is gonna handle a certain piece of functionality.

? applyMiddleware
So we can apply any middleware such as thunk.

? composeWithDevTools
To be able to use redux-devtools extension

*/
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({})

const initialState = {} // If we want something to be loaded when the redux store loads initially,we put in here as initial state

const middleware = [ thunk ]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

/*
The way we implement this into our application is through a provider.
That provider comes from 'react-redux'

go to /src/index.js and do these changes
*/
import { Provider } from 'react-redux'
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
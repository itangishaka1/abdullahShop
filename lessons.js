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

? A pattern will be:
    a) create the constant
    b) reducer
    c) action
    d) fire off in the component
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

/*
------------------------------------------
/ (2) Product List Reducer and Action

Create /src/reducers

Each resource of our app will have a reducer file such as products.

? create /src/reducers/productReducers.js
We gonna have #nt reducer functions in here which will all be related to products
*/

/*   src/reducers/productReducers.js 
To handle the state for the product list which we see on the homepage.

? Reducer takes in 2 things:
    a) initial state 
    b) action

When we create an action reducer, we gonna dispatch an action to this reducer (i.e productListReducer)
"action" will be an object that has a "type".
And the type may also contain the payload.
So if we are getting the data , the payload will have the data that we fetched from the server.

We want to evaluate the type that is in the action object, so we use a switch for that.

In all our cases, we return a piece of the state.
We gonna set a loading: true,  because when we make the request, we want the component to know that it's currently fetching( so it's currently loading)

If we get a success request,  we will send the data in the payload,
if not we will send the error in the payload.

We will always have the default which will be the initial state. 
*/

export const productListReducer = (state = { products: [] }, action) => {
  switch(action.type) {
      case 'PRODUCT_LIST_REQUEST':
          return { loading: true, products: [] }
      case 'PRODUCT_LIST_SUCCESS':
          return { loading:false, products: action.payload }
      case 'PRODUCT_LIST_FAIL':
          return { loading:false, error: action.payload}
      default:
          return state            
  }
}

/*
In order to use this reducer, we have to add it to our store.
*/
// store.js 
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
  // This is important because 'productList' is what is gonna show as a piece of the state.
  productList: productListReducer,
})

const initialState = {}

const middleware = [ thunk ]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

/*
        ----- CONSTANTS ------

Typically, we will puth these string ('PRODUCT_LIST_REQUEST', 'PRODUCT_LIST_SUCCESS', 'PRODUCT_LIST_FAIL' ) in a variable which is a constant.

Create /src/constants/productConstants.js
*/

//productConstants.js
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL'

/*
And we bring those constant into our productReducers.js like:
*/
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading:false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading:false, error: action.payload}
        default:
            return state            
    }
}

/*
/  (3)    action

create /src/actions/productActions.js

Any action that has to do with the product will go in here.

We bring the constants into our action file.
This action will do what we did in our /src/pages/Home.js : Fetching data

Now, Instead of fetching data from Home.js, we gonna do that from this action and we gonna dispatch actions to the reducer. 

Think the functions here in productActions.js file as action creators, and the actual action like PRODUCT_LIST_REQUEST we dispatch back to the reducer.

In here, we want to make an asynchronous request.
This is where redux thunk comes in.
What Redux thunk allows us to do is add a function within a function.
*   export const listProducts = () => async (dispatch) => {}

*/

import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {

    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('http://localhost:5100/api/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,

      /*
      Here, we want to try to get whatever the error massage is, so that we can get our custom backend errors and have them in our frontend state.
      error.response: a generic error message 
      error.response.data.message: our custom error message
      */ 
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}


/*
/  (3)   Bringing Redux State Into Home.js  - useDispatch and useSelecor

Now we already setup our product 
     a) constants in /src/constants/productConstants.js
     b) productListReducer in /src/reducers/productReducers.js 
        which handles the listing of products in our state,
     c) listProducts action in /src/actions/productActions.js
     This need to be fired off.

And where we want to fire that off is gonna be in Home.jsx

In /src/pages/Home.jsx

What we were doing before was bringing in axios,
making request directly from this component. We do not want to do that anymore.

remove:
*    import axios from 'axios'

all the code in useEffect:
*    const fetchProducts = async () => {
*      const { data } = await axios.get('http://localhost:5100/api/products')
*      setProducts(data)
*    }
*    fetchProducts()

We do not need to set products as our local state anymore, remove:
*    const [products, setProducts] = useState([])    

To dispatch our list products action, we have to bring that in from 'react-redux'
And we want 2 things:
    a) useDispatch() that will be used to dispatch or call action
    b) useSelector() to select parts of the state.
      We gonna want the product list part of the state.

We bring in the product list 
*    import { listProducts } from '../actions/productActions'      

And where we want to fire off this listProducts is in the useEffect().
       
*/
import { useDispatch, useSelector } from 'react-redux' 
import { listProducts } from '../actions/productActions' 

const Home = () => {
  const dispatch = useDispatch() 

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

    return (
      <div>
        <p>Our jsx here</p>
      </div>
    )
}

/*
! SUmmary

Any time you want to add a piece of functionality, make a new request ....

(1) start with constants
(2) reducer
(3) Whenever we create a new reducer, we have to add it to our store.js
(4) create an action
(5) Now go to the component and use your action there

---------------------------- 


*/
import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5100/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty,
        }
    })

    /*
    Once we dispatch this, we want to save it in local storage.
    We use local storage API (the setItem()) and save this as cartItems.

    We want save the entire cart,and this where we use getState().
    the getState().cart.cartItems) gives us a JSON, so we have make it a string using JSON.stringfy()
    because we can only save strings in local storage. And Once we take it out we will use JSON.parse() to
    parse it back to JavaScript object.
    */
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    /*
    ! We save it to local storage here, but where do we get it to fill the state ?
    We do that in our store.js
    Remember we have there const initialState = {}
    go there  then
    */
}

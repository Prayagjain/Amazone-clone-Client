import { configureStore } from "@reduxjs/toolkit";
import  productSlice from "./slice/ProductSlice";
import cartSlice from "./slice/CartCounter"

const store = configureStore({
    reducer:{
        products:productSlice,
        cart:cartSlice
    }
});

export default store
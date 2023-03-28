import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchProductsData = createAsyncThunk(
    'fetchProducts',
    async () => {
        const data = await fetch("https://e-commerce-clone.onrender.com/getproductsdata",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const res = await data.json();
        return res.data
    }
  )

const productSlice = createSlice({
    name:"products",
    initialState:[],
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProductsData.fulfilled, (state, action) => {
          // Add user to the state array
          state[0]=action.payload
        })
      },
})

export default productSlice.reducer ;

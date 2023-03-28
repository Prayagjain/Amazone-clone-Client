import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:"cart",
    initialState:[0],
    reducers:{
        fState(state,action){
            state[0] = action.payload;
        },
        emptyCount(state,action){
            state[0]=0
        },
    }
})

export const {fState,emptyCount} = cartSlice.actions ;
export default cartSlice.reducer ;

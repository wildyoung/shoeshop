import { configureStore, createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        addCount(state, action) {
            const index = state.findIndex(item => item.id === action.payload);
            state[index].count += 1;
        },
        subtractCount(state, action) {
            const index = state.findIndex(item => item.id === action.payload);
            if (state[index].count > 0) {
                state[index].count -= 1;
            }
        }
    }
})

export const { addCount, subtractCount } = cartSlice.actions

export default configureStore({
  reducer: { 
    cart: cartSlice.reducer
  }
}) 
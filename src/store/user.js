import { createSlice } from '@reduxjs/toolkit';

const initialUserState = [];

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        addTable(state, action) {
            const newQueue = action.payload;
            const existingItem = state.filter((item)=>item.queueRestaurantInfo.id === newQueue.queueRestaurantInfo.id).find((item)=> item.queueTime.toString() === newQueue.queueTime.toString());

            if(!existingItem){
                state.push(newQueue);
            }else{
                existingItem.queueNumOfTable = newQueue.queueNumOfTable;
            }
        },
        removeTable(state, action) {
            const newQueue = action.payload;
            state.filter((item)=>item.queueRestaurantInfo.id === newQueue.queueRestaurantInfo.id).filter((item)=> item.queueTime.toString() !== newQueue.queueTime.toString())
        },
        replaceQueue(state, action){
            state = action.payload;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
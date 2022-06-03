import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { userInterface } from '../../types/reduxTypes';

const userState:userInterface = {
    name: '',
    avatar: ''
}

const userReducer = createSlice({
 name: 'userReducer',
 initialState : userState,
 reducers : {
     setUserName (state, action) {
        state.name = action.payload
     },
     setUserAvatar (state, action) {
         state.avatar = action.payload
     }
 }
})

export const { setUserName, setUserAvatar } = userReducer.actions;
export default userReducer.reducer;
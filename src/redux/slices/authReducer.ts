import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { authState } from '../../types/reduxTypes';

const initState :authState = {
    autorized : false
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState : initState,
    reducers: {
         setAutorized (state, action) {
               state.autorized = action.payload
         }
    }
})

export const { setAutorized } = authReducer.actions;
export const isAutorized = (state:RootState) => state.auth.autorized;

export default authReducer.reducer;
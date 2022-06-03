import { configureStore } from '@reduxjs/toolkit';

// slices
import authReducer from './slices/authReducer';
import userReducer from './slices/userReducer';
import messageReducer from './slices/messagesReducer'

const store = configureStore({
    reducer: {
       auth:authReducer,
       user:userReducer,
       messages: messageReducer
    }
})

export type RootState = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
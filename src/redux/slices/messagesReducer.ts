import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { allMesages } from '../../types/reduxTypes';

const initState:allMesages = {
    messages : [],
    isMessageShown: false,
    talkingTo : '',
    needToUpdate: false,
    isMessageEditing: false,
    editedMessage : {
        messageFrom : '',
        messageTo:  '',
        message:  '',
        date : '',
        time:  '',
    },
}

const messageReducer = createSlice({
    name : 'messageReducer',
    initialState : initState,
    reducers : {
         setMessagesActive (state, action) {
             state.isMessageShown = action.payload
         },
         setCompanion (state, action) {
            state.talkingTo = action.payload
         },
         setMessages (state, action) {
             state.messages = action.payload
         },
         setUpdate (state, action) {
             state.needToUpdate = action.payload
         },
         setEditing (state, action) {
            state.isMessageEditing = action.payload
         },
         setEditedMessage (state, action) {
            state.editedMessage = action.payload
         },
    }
})

export const { setMessagesActive, setCompanion, setMessages, setUpdate, setEditing, setEditedMessage } = messageReducer.actions;

export default messageReducer.reducer;

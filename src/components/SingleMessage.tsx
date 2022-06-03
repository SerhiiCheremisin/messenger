import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { deleteMessage , editMassage } from '../services/api/api';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { setUpdate, setEditing, setEditedMessage } from '../redux/slices/messagesReducer';
import { message } from '../types/reduxTypes';
import { AppDispatch, RootState } from '../redux/store';

const useStyles = makeStyles( (theme) => ({
 singleMessage : {
  border: '1px solid red',
  borderRadius: '15px',
  padding: "5px",
  cursor: 'pointer',
  width:'30%',
  position: 'relative',
  transition: '.5s ease',

  '&:hover' : {
    border: '1px solid #0b5d09',
    boxShadow: '2px 2px 5px 7px rgba(0,0,0,0.75)',
  },
},
singleMessageList : {
  display: 'flex',
  flexDirection: 'column',
},
li: {
 listStyle: 'none',
},
iconBox : {
 position: 'absolute',
 right: 5,
 top: 40,
},
iconSelf : {
transition: '.7s ease',

"&:hover" : {
  color: '#0b5d09',
},
},
}))

interface SingleMessageProps {
    user: string,
    message: message,
    deleteItemMassage: Function
}

const SingleMessage = ( { message, user, deleteItemMassage } : SingleMessageProps ):JSX.Element => {

  const classes = useStyles();
  const dispatch:AppDispatch = useDispatch();


  const messagePosition = message.messageFrom === user ? '0' : '70%';
  const activeBorderLeft = message.messageFrom === user ? '2px solid #cbe9fc' : '';
  const activeBorderRight = message.messageFrom === user ? '' : '2px solid #cbe9fc'

  const messageInlineStyle = {
    marginLeft : messagePosition,
    borderLeft: activeBorderLeft,
    borderRight: activeBorderRight,

  }

  const editMessage = ():void => {
    dispatch(setEditedMessage(message))
    dispatch(setEditing(true))
  }

  return (
      <Box style={messageInlineStyle} className={classes.singleMessage}>
        <ul className={classes.singleMessageList}>
          <Box className={classes.iconBox}>
             <EditIcon className={classes.iconSelf} onClick={() => editMessage()}/> 
             <CloseIcon className={classes.iconSelf} onClick={() => deleteItemMassage(message._id)}/>
          </Box>
          <li className={classes.li}><strong>{message.message}</strong></li>
          <li className={classes.li}>{message.date}</li>
          <li className={classes.li}>{message.time}</li>
        </ul>  
      </Box>
  )
}

export default SingleMessage;
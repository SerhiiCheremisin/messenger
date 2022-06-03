import React, {useState,useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { editMassage } from '../services/api/api';
import { message } from '../types/reduxTypes';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setEditing, setUpdate } from '../redux/slices/messagesReducer';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';

const useStyles = makeStyles({
 root : {
     width: '100%',
     height: '100vh',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     position: 'fixed',
     top : 0,
     left: 0,
     backgroundColor: 'black',
     opacity: '.9',
     zIndex: 999,
 },
 form : {
   display: 'flex',
   flexDirection: 'column',
   width: '30%',
   backgroundColor: 'white',
   gap: '10px',
   padding: '15px',
   border: '5px solid red',

 },
 closeIcon : {
   color: 'red',

   '&:hover' : {
       cursor: 'pointer',
   },
 },
})


const EditMessageModal = ():JSX.Element => {

    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const [messageItem, setMessageItem] = useState<string>('')
    const editedMessage = useSelector((state:RootState) => state.messages.editedMessage);

    useEffect(() => {
        setMessageItem(editedMessage.message)
    }, [])


const formHandler = (e:React.FormEvent<HTMLFormElement>):void => {
  e.preventDefault();
  if (messageItem === ''){
      alert('You should not left this field empty');
      return
  }
  editMassage({message: messageItem},editedMessage._id || '0');
  dispatch(setEditing(false));
  dispatch(setUpdate(true));
} 
   
  return (
    <Box className={classes.root}>
        <form className={classes.form} action="#" onSubmit={(e) => formHandler(e)}>
          <Input type="text" id="edit-message" placeholder="Edit message" value={messageItem} onChange={(e) => setMessageItem(e.target.value)} />
          <Button type='submit' variant="outlined" startIcon={<EditIcon />}>
             Edit message
          </Button>
          <Button variant="text" onClick={() => dispatch(setEditing(false))}><CloseIcon className={classes.closeIcon}/></Button>
        </form>
    </Box>
  )
}

export default EditMessageModal;
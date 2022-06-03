import React, {useEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setMessagesActive, setCompanion } from '../redux/slices/messagesReducer';
import UsersAvatar from '../components/UsersAvatar';

const useStyles = makeStyles({
  root : {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 10%',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    backgroundColor: 'grey',
    cursor: 'pointer',
    transition: '.5s ease',
    marginBottom: '10px',

    '&:hover' : {
       backgroundColor: '#f9f3e9',
    }
  }
})

export interface FriendItemProps {
  name: string,
  avatar?: string,
  id?: number,
  _id?: string
}

const FieldItem = ( { name, id, avatar } :FriendItemProps) => {
  
    const classes =  useStyles();
    const dispatch:AppDispatch = useDispatch();
 
    const talkTo = useSelector((state:RootState) => state.messages.talkingTo); 
    const isActive = talkTo === name ? 
    {backgroundColor : '#ebcb94'} 
    :
    {}
    const chatActiveHandler = () => {
      dispatch(setCompanion(name));
      dispatch(setMessagesActive(true));
    }

    const imageHandler = () => {
      if (avatar !== undefined) {
        return avatar
      }
      return ''
    }
  

  return (
    <Box style={isActive} onClick = {chatActiveHandler} className={classes.root}>
      {name} 
      <UsersAvatar altName = {`avatar by ${name}`}  userName ={name} imageURL = {imageHandler()} />
    </Box>
  )
}


export default FieldItem;
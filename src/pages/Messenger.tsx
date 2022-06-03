import React, {useEffect, useState} from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { message } from '../types/reduxTypes';
import { setMessagesToBack, addUser, getUsers } from '../services/api/api';
import { setMessages, setUpdate } from '../redux/slices/messagesReducer';
import { setUserName } from '../redux/slices/userReducer';
import { useNavigate } from 'react-router-dom';
import { FriendItemProps } from '../components/FieldItem';
import { setAutorized } from '../redux/slices/authReducer';

//components
import FieldItem from '../components/FieldItem';
import MessageItem from '../components/MessageItem';
import SimpleForm from '../components/SimpleForm';
import UsersAvatar from '../components/UsersAvatar';


const useStyles = makeStyles( (theme) => ({
 root : {
  display: 'flex',
  justifyContent: 'center',
  width : '100%',
  height: '100vh',
 },
 friends : {
  width: '20%',
  backgroundColor: '#d6d2d2',
 },
 name : {
  width: '100%',
  height: '10%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '15px 10%',
  alignContent: 'center',
  cursor: 'pointer',
 },
 messages : {
  width: '80%',
  height: '100vh',
  backgroundColor: '#b7a896',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
 },
 messagesWrapper: {
  overflow: 'scroll',
  height: '90vh',
  
  '&::-webkit-scrollbar' : {
    display: 'none',
  },

 },
 formWrapper: {
   height: '10vh',
   width: '100%',
   backgroundColor: '#b7a896',
   display: 'flex',
   justifyContent: 'center',
   position: 'absolute',
   bottom: 0,
 },
}))

const Messenger = ():JSX.Element => {
  const classes = useStyles();
  const dispatch:AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('messageName')){
      getUsers().then(data => {
        setFriendsList(data);
        setAutorized(true);
        dispatch(setUserName(localStorage.getItem('messageName'))); 
      }) 
      return
    }
    navigate('/login'); 
  },[])

  const [message, setMessage] = useState<string>('');
  const [friendsName, setFriendsName] = useState<string>('');
  const [friendsList, setFriendsList] = useState<FriendItemProps[]>([])
  
  const messages = useSelector((state:RootState) => state.messages.messages);
  const user = useSelector((state:RootState) => state.user.name);
  const mainAvatar = useSelector((state:RootState) => state.user.avatar);
  const isMessagesShown = useSelector((state:RootState) => state.messages.isMessageShown);
  const companion = useSelector((state:RootState) => state.messages.talkingTo);

  const formHander = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === '') {
      return
    }
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const newMassage:message = {
      messageFrom : user,
      messageTo: companion,
      message: message,
      date: currentDate,
      time: currentTime,
    }
    setMessagesToBack(newMassage).then((data:any) => 
    dispatch(setUpdate(true))
    );
    setMessage('') 
  }

  const friendLIstHandler = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    if (friendsName === ''){
      alert('Enter the name')
      return
    }
    const tempList = [...friendsList];
    const tempObject:FriendItemProps = {
      name: friendsName,
    }
    tempList.push(tempObject);
    setFriendsList(tempList);
    addUser(tempObject);
    setFriendsName('');
  }


  const mainAvatarRender = ():string => {
   if (mainAvatar === undefined) {
     return ''
   }
   return mainAvatar
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.friends}>
        <Box className={classes.name}>{user}
        <UsersAvatar userName = {user} imageURL = {mainAvatarRender()} altName = {`avatar by ${user}`} />
        </Box>
         {
          friendsList.length !== 0 && friendsList.filter((friend:FriendItemProps) => friend.name.toLowerCase() !== user.toLowerCase())
          .map((el:FriendItemProps) => <FieldItem key = {el._id} name = {el.name} id = {el.id} avatar={el.avatar}/>)
         }
          <Box sx={{position: 'absolute', bottom: 0}}>
           <SimpleForm formHandler = {friendLIstHandler} inputHandler = {setFriendsName} inputValue = {friendsName} buttonValue = 'Add friend' label='Enter friends name'
             formAdditionalStyle = {{justifyContent : 'center', width: '100%', marginLeft: '14px'}}></SimpleForm>
          </Box> 
        </Box>
      <Box className={classes.messages}>
         <Box className={classes.messagesWrapper}>
              { isMessagesShown && <MessageItem user={user} companion={companion} />}
         </Box>
         <Box className={classes.formWrapper}>
            { isMessagesShown && <SimpleForm formHandler = {formHander} inputHandler = {setMessage} inputValue = {message} buttonValue = 'Add message' label='Your message' /> }
       </Box>
      </Box>
    </Box>
  )
}

export default Messenger;

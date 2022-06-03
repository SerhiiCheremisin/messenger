import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import { getUsers, getAllMessages } from '../services/api/api';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { message } from '../types/reduxTypes';
import SingleMessage from '../components/SingleMessage';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { setMessages, setUpdate } from '../redux/slices/messagesReducer';
import { deleteMessage , editMassage } from '../services/api/api';
import EditMessageModal from './EditMessageModal';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import CircularProgress from '@mui/material/CircularProgress';

interface MessageItemProps {
    user: string,
    companion : string
}

const useStyles = makeStyles({
 list: {
   display: 'flex',
   padding: '1%',
   flexDirection: 'column',
   gap: '20px',
   position: 'relative',
 },
 arrow: {
  cursor: 'pointer',
  position: 'fixed',
  left: '50%',
  top: '20px',
  '&:hover': {
    color: 'red',
  }
 }
})

const MessageItem = ( {user, companion} : MessageItemProps ):JSX.Element => {

const messages = useSelector((state:RootState) => state.messages.messages);
const updateIsNeeded = useSelector((state:RootState) => state.messages.needToUpdate);
const editingIsActive = useSelector((state:RootState) => state.messages.isMessageEditing);
const coTalker = useSelector((state:RootState) => state.messages.talkingTo);

const [arrowIsShown, setIsArrowShown] = useState<boolean>(false);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [userList, setUserList] = useState<[]>([]);
const [twoManMassages, setTwoManMassages] = useState<message[]>([]);

const listEnd = useRef<HTMLDivElement>(null);
const listBeginning = useRef<HTMLDivElement>(null);
const list = useRef<HTMLDivElement>(null);

const classes = useStyles();

const dispatch:AppDispatch = useDispatch();

const scrollTo = (div:HTMLDivElement | null):void => {
  if (div !== null){
    div.scrollIntoView({ behavior: 'smooth' });
  }
}

const setDialog = ():void => { 
  const myMassages = messages.filter(item => item.messageFrom === user && item.messageTo === companion);
  const companionMassage = messages.filter(item => item.messageFrom === companion && item.messageTo === user);
  const everyone = messages.filter(item => item.messageTo === 'Everyone');
  const combinedState = [...myMassages, ...companionMassage, ...everyone];
  setTwoManMassages(combinedState);
}

const deleteItemMassage = (id:string):void => {
  const filteredArray = twoManMassages.slice().filter((item:message) => item._id !== id);
  dispatch(setMessages(filteredArray));
  deleteMessage(id);
}

    useEffect(() => {
        getUsers().then(data => {
            setUserList(data);
            setIsLoading(false);
        })
        getAllMessages().then(data => {
          dispatch(setMessages(data));
        })
    },[])

    useLayoutEffect(() => {
     if (list.current !== null){
      if (list.current?.scrollHeight > 900){
        setIsArrowShown(true);
        return
      }
      setIsArrowShown(false);
     }
    })

    useEffect(() => {
      scrollTo(listEnd.current);
    })

  useEffect(() => {
    setDialog();
  },[coTalker]) 

    useEffect(() => {
     if (updateIsNeeded) {
      getAllMessages().then(data => {
        dispatch(setMessages(data));
      })
      dispatch(setUpdate(false)); 
     }
    },[updateIsNeeded])

   useEffect(() => {
    setDialog();
   },[messages]) 

   useEffect(() => {
    for (const [key, value] of Object.entries(userList)){
        if (key === companion){
          dispatch(setMessages(value));
        }
      }
      setDialog();
  },[userList])


  if (isLoading){
    return(
        <CircularProgress/>
    )
    }
  if (twoManMassages.length === 0) {
   return(
     <h2>The history is empty, text your first message now!</h2>
   )
  } 
    return (
   <Box ref={list} className={classes.list}>
     <div ref={listBeginning}></div>
     {editingIsActive && <EditMessageModal/>}
     {twoManMassages.slice().sort((a:any,b:any) => a.date-b.date).map((el:message) => {
      return(
        <SingleMessage key={el._id} deleteItemMassage = {deleteItemMassage} message = {el}  user={user}/>
      )
    })}
    <div ref={listEnd}></div> 
    {arrowIsShown && <ArrowCircleUpIcon className={classes.arrow} fontSize="large" onClick={() => scrollTo(listBeginning.current)}/>}
   </Box> 
  )
}


export default MessageItem;
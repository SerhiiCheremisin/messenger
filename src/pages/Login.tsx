import React, {useEffect, useState} from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../redux/slices/userReducer';
import { setAutorized } from '../redux/slices/authReducer';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles({
 root : {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: '#bcffba',
  width: '100%',
  height: '100vh',
 },
 form : {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '15px',
 }
})

const Login = ():JSX.Element =>  {
  useEffect(() => {
  const request = async () => {
    const request = await fetch('http://localhost:5000/messages');
    const respond = await request.json()
    return respond
  }
   request().then(data => console.log(data))
  }, [])
   
  const [name, setName] = useState<string>(''); 
  const navigator = useNavigate();
  const dispatch:AppDispatch = useDispatch();

  const formHandler = (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if (name === '') {
     alert('This field should not be empty');
     return
   }
   dispatch(setUserName(name));
   dispatch(setAutorized(true));
   localStorage.setItem('messageName', `${name}`)
   navigator('/messenger');
  }

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <h2>You should enter your name to use messsenger</h2>
     <form className={classes.form} onSubmit={(e) => formHandler(e)} action="#">
      <TextField value={name} onChange={e => setName(e.target.value)} id="outlined-basic" label="Your name" variant="outlined" />
      <Button type='submit' variant="contained">Confirm</Button>
     </form>
    </Box>
  )
}

export default Login;

import React, { useState, useEffect } from 'react'
import Input from '@mui/material/Input';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CloseIcon from '@mui/icons-material/Close';
import { postAvatar } from '../services/api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IAvatarData } from '../types/commonTypes';
import { setUserAvatar } from '../redux/slices/userReducer';


const useStyles = makeStyles({
    form : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 999,
    width: '80%',
    height: '90%',
    border: '5px solid orange',
    position: 'absolute',
    top: 0,
    left: '20%'
    },
    photoAdder : {
     visibility: 'hidden',
     width: 0
    },
    label : {
      cursor: 'pointer',
    },
    btn: {
      height: 'auto'
    }

})

interface AddAvatarFormProps {
    avatarAdder : Function
}


const AddAvatarForm = ( { avatarAdder } : AddAvatarFormProps):JSX.Element => {

    const classes = useStyles();

    const [avatar, setAvatar] = useState<any>(null);
    const [isPhotoUploaded, setIsPhotoUploaded] = useState<boolean>(false)

    const userName = useSelector((state: RootState) => state.user.name);

    useEffect(() => {
      console.log(`Avatar has changed current valuse is: ${avatar}`)
    }, [avatar])
    
    const uploadHandler = (e:any) => {
       if (e.target.files[0] !== null) {
        setAvatar(e.target.files[0])
        setIsPhotoUploaded(true)
       }
    }

    const formHandler = (e:React.FormEvent<HTMLFormElement>):void => {
      e.preventDefault();
      if (avatar === null) {
        alert('You should add a photo first')
        return
      }
      const data = new FormData()
      data.append('file', avatar)
      const requestBody : IAvatarData = {
        avatar: data,
        name: userName
      }
      setUserAvatar(avatar.name);
      postAvatar(requestBody);
      avatarAdder(false);
    }

  return (
    <form method='post' action='#' className={classes.form} onSubmit={(e) =>formHandler(e) }>
      {isPhotoUploaded && <div>Photo uploaded succesfully</div>}
     <label className={classes.label} htmlFor="photo"><DriveFolderUploadIcon/></label>  
     <Input onChange={(e) => uploadHandler(e)} className={classes.photoAdder} id='photo' type='file' name='picture'/> 
     <Button className={classes.btn} type='submit' variant="contained">Add avatar</Button>
     <Button onClick = {() =>avatarAdder(false) }><CloseIcon/></Button>
    </form>
  )
}


export default AddAvatarForm;
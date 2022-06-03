import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Button from '@mui/material/Button';
import AddAvatarForm from './AddAvatarForm';

interface UsersAvatarProps {
    altName: string,
    imageURL : string,
    userName: string,
    _id?:string
}

const UsersAvatar = ( { altName, imageURL, userName } : UsersAvatarProps ):JSX.Element => {

  const activeUser = useSelector((state: RootState) => state.user.name);
  const [isAvatarAdderShown, setIsAvatarAdderShown] = useState<boolean>(false);

  const isAvatarNeededToAdd = ():JSX.Element => {
    if (!!imageURL === false) {
      const returnLogic = activeUser === userName ? <Button onClick={() => avatarAdder(true)}  variant="outlined">Add Avatar</Button> : <></>
      return returnLogic
    }
    return <></>
  }

  const avatarRender = !!imageURL === false ? '../../backend/public/Question_Mark.png' : `${imageURL}`

  const avatarAdder = (bool: boolean):void => {
    setIsAvatarAdderShown(bool)
  }

  return (
    <>
      {isAvatarNeededToAdd()}
      {isAvatarAdderShown === true ? <AddAvatarForm avatarAdder = {avatarAdder} /> : <></>}
      <Avatar alt={`Avatar of ${altName}`} src={avatarRender} />
    </>
  )
}

export default UsersAvatar;

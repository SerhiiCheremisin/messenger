import axios from "axios";
import { IAvatarData } from '../../types/commonTypes';

const messagesPage :string = 'http://localhost:5000/messages';
const usersPage :string = 'http://localhost:5000/users';
const imagesPage :string = 'http://localhost:5000/images';
const avatar :string = 'http://localhost:5000/upload'; 

export const addUser = async(user:object) => {
  try {
    const request = await fetch(usersPage,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  } 
  catch (error) {
    console.log(error)
  }
}

export const getUsers = async() => {
  try {
      const request = await fetch(usersPage,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const respond = await request.json()
      return respond
  } 
  catch (error) {
    console.log(error)
  }
}

export const getAllMessages = async () => {
  try {
  const request = await fetch(messagesPage)
  const respond = await request.json()
  return respond
  } 
  catch (error) {
    console.log(error)
  }
}

export const setMessagesToBack = async (message:object) => {
   try {
    const request = await fetch(messagesPage,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
   }
   catch (error) {
     console.log(error)
   }
}

export const deleteMessage = async (id:string) => {
  try {
    fetch(`${messagesPage}/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.log(error)
  }
}

export const editMassage = async (message:object, id:string) => {
   try {
     const request = await fetch(`${messagesPage}/${id}`,{
       method: 'PATCH',
       headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
     })
   } catch (error) {
    console.log(error)
   }
}

export const postAvatar = (body:IAvatarData) => {
  try {
    axios.post(`${avatar}`, body.avatar);
  } catch (error) {
    console.log(error)
  }
}

export const updateAvatar = (id : string) => {
   
}
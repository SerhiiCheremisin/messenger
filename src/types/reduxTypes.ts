export interface authState {
    autorized : boolean
}

export interface userInterface {
    avatar? : string,
    name: string,
    _id?: string
}

export interface message {
   messageFrom : string,
   messageTo: string,
   message: string,
   date :string,
   time: string,
   _id?: string
}

export interface allMesages {
    messages : message[],
    isMessageShown: boolean,
    talkingTo : string,
    needToUpdate: boolean,
    isMessageEditing: boolean,
    editedMessage : message
}




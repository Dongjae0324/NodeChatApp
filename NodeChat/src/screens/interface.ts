export interface PersonData {
    profileImage: string; 
    id: string, 
    name: string,
    comment: string, 
}


export interface PersonProps {
    person: PersonData
}


export interface Message {
    title: string, 
    type: string, 
    user: string,
    chat: string
}

export interface ChatRoomData { 
    title: string,
    owner: string,
}

export interface ChatProps { 
    chat: ChatRoomData,
    intoChatRoom(props:object): any
}





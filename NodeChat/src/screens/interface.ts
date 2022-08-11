export interface PersonData {
    profileImage: string; 
    id: string, 
    name: string,
    comment: string, 
    backgroudImage: string
}


export interface PersonProps {
    person: PersonData
}


export interface Message {
    id: string,
    content: string,
    createdAt: number
}

export interface ChatData { 
    ChatRoomId: string,
    User: [PersonData]
    lastMessage: Message
}

export interface ChatProps { 
    chat: ChatData
}
export type PersonData = {
  profileImage: string;
  id: string;
  pw: string;
  name: string;
  comment: string;
};

export type PersonProps = {
  person: PersonData;
};

export type Message = {
  title: string;
  type: string;
  user: string;
  chat: string;
};

export type ChatRoomData = {
  title: string;
  owner: string;
};

export type ChatProps = {
  chat: ChatRoomData;
  intoChatRoom(props: object): any;
};

export type User = {
    id:  string,
    name: string, 
    profileImage: string, 
    comment: string,
  }
  
export type AppState = {
    loggedIn: boolean,
    loggedUser : User
  }

//type for Redux State
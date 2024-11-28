export type currentUserType = {
    _id:string,
    userName:string,
    userEmail:string,
    password?:string,
    profilePic?: string
}

export type ErrorType = {
    message?: string;
    statusCode?: string;
    success?: string;
}

export type SingleUserType = {
    username:string;
    email:string;
    _id:string
    
}
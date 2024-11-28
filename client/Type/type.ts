export type currentUserType={
    username?:string;
    email?:string;
    profilePicture?: string;
    password?:string;
    _id?:string;
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
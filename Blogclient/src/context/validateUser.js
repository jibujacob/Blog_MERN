import axios from "axios";
export const validateUser = async (user,setAccess)=>{
    const currentUser = await axios.get("/api/users/currentUser");
    let access = false;
    console.log("currentUser.data",currentUser.data);
    console.log("user.user",user.user);
    if(user.user && currentUser.data && (currentUser.data.currentUser.id === id)){
        access=true
    }
    
    return access
}
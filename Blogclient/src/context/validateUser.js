import axios from "axios";
export const validateUser = async ({id})=>{
    const currentUser = await axios.get("/api/users/currentUser");
    let access = false;

    if(id && currentUser.data && (currentUser.data.currentUser.id === id)){
        access=true
    }
    
    return access
}
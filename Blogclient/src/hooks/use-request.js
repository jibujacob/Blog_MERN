import { useState } from "react";
import axios from "axios";

export const useRequest = ({url,method,body,onSuccess,onError}) => {
    const [errors,setErrors] = useState(null);

    const doRequest = async () => {
        setErrors(null)
        try {
            const response = await axios[method](url,
                {
                    ...body
                });

            if(onSuccess){
                onSuccess(response.data);
            }
            
            return response.data;
        } catch (error) {
            if(onSuccess){
                onError(error.response.data.errors)
            }
            setErrors(error.response.data.errors);
        }
    }

    return {doRequest,errors}
}
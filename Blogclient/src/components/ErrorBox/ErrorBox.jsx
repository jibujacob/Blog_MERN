import React from 'react';
import "./ErrorBox.css";

const ErrorBox = ({errors}) => {
    return (
        <div className="errorBoxDiv">
            <h4 className="errorBoxTitle">Ooops...</h4>
            <ul className="errorBoxList">
                {errors.map((error,index)=>{
                      return <li className="errorBoxListItem" key={index}>{error.message}</li>
                    }    
                )}
            </ul>
        </div>
    )
}

export default ErrorBox

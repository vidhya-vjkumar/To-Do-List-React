import React from "react";
import logo from '../Images/pfp.jpg'

function User(){
    return(
        <div className="User">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="info">
                <p>Vidhya Vijayakumar</p>
                <a href='#'>Logout</a>
            </div>
        </div>
    )
}


export default User
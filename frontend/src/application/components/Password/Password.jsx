import React from 'react'
import { useState } from 'react';
const Password = ({user}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    let userId = user.authuser_id;
    
    const handleSubmit = async (e) =>{
        if(user.password === oldPassword){
            if(password === confPassword){
                try {
                    const body = {password};
                    const response = fetch(`/password/${userId}`, {
                      method: "POST",
                      headers: {"Content-Type": "application/json"},
                      body: JSON.stringify(body)
                    })
                    window.location.href = "http://localhost:3000/logout";
                    alert("Done");
                    
                  } catch (err) {
                    console.log(err.message);
                  } 
            }else alert("Passwords do not match");
        }else alert("Wrong old password");  
        
    }

    return (
        <>
        <h1 className="d-flex justify-content-center mt-3 text-secondary">Change password</h1>
        <div className="d-flex justify-content-center mt-3 " >
            <form onSubmit={handleSubmit}>
                <div className="form-group ">
                    <label className="col-form-label-lg row">Old password</label>
                    <input className="form-control-lg" type="password" name="oldPassword" id="oldPassword" 
                    onChange={e => setOldPassword(e.target.value)} 
                    required/>
                </div>
                <div className="form-group ">
                    <label className="col-form-label-lg row">New password</label>
                    <input className="form-control-lg" type="password" name="password" id="password" 
                    onChange={e => setPassword(e.target.value)}
                    required/>
                </div>
                <div className="form-group ">
                    <label className="col-form-label-lg row">Confirm Password</label>
                    <input className="form-control-lg" type="password" name="confPassword" id="password" 
                    onChange={e => setConfPassword(e.target.value)}
                    required/>
                </div>
                    <button type="submit" className="btn btn-outline-primary mt-3 btn-lg">Save changes</button>
            </form>
        </div></>
    )
}

export default Password

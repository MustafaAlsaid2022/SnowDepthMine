import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

axios.defaults.withCredentials = true;
 const Login = () => {
     
    let history = useHistory();
    const[user , setUser] = useState({
        email : "" ,
        password : "" ,
       
    });
    const[messageObject , setmessageObject] = useState({

        message : "" ,
       
    });
    const{email , password } = user ;

    const{ message } = messageObject ;

    const onInputChange = (e) =>
    {
        setUser({...user,[e.target.name] : e.target.value})
    };

    
    
    const onSubmit = async (event) => {
        event.preventDefault();
        await  axios.post("/users/login",user)    
        .then(function (response) {
            // handle success   
            console.log(response.config.data);          
            setmessageObject(response.data);
            
            if(response.status === 202)  history.push("/sensors-list");
            
          })
        .catch(function (error) {
            console.log(error);
          });
          
          //
    };
    
    var someStyle = {
        width: "30em",
       
    };
    var someStyle1 = {
        color: "red"
      }
    return (
        <>
        <h2 style = {{textAlign:'center'}}>Log In</h2>
        <div style= {{display: 'flex',
            justifyContent: 'center',
            marginTop:'2%'}}>
            
            <form onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                <label for="email">Email:</label>
                <input 
                style={someStyle}
                value={email} 
                onChange = {(event) => onInputChange(event)} 
                type="email" className="form-control" name="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                <label for="pwd">Password:</label>
                <input
                style={someStyle}
                value={password} 
                onChange = {(event) => onInputChange(event)} 
                type="password" className="form-control" name="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={someStyle}>Submit</button>
                <hr/>
                <div style={someStyle1}><b>{message}</b></div>
            </form>
        </div>
        </>
    )
}
export default Login
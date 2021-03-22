import React, {useEffect, useState} from "react";
import {useCookies, withCookies} from 'react-cookie';
import "bootstrap/dist/css/bootstrap.css";

import { Link } from "react-router-dom";
import axios from "axios";


function MyAccount(props) {
  const [cookies, setCookie] = useCookies(['userLoggedIn']);
  const [loggedIn, setLoggedIn] = useState(props?.userLoggedIn);
  useEffect(() => {
      setLoggedIn(props?.userLoggedIn)
  }, [props?.userLoggedIn]) // T

  const handleLogOut = async() => {
    await  axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, '')
      .then(response => {
        setCookie('userLoggedIn', false);
      }).catch(function (error) {
        console.log(error);
        setCookie('userLoggedIn', false);
      });
  }
  return (<div>
                {loggedIn === 'true' ?
                  (<Link to={"/"} className="nav-link" onClick={handleLogOut}>
                    LogOut
                  </Link>)
                  :
                  (<Link to={"/login"} className="nav-link">
                    Login
                  </Link>)
                }
                  </div>
      );
}

export default withCookies(MyAccount);

import "./AuthCompany.css";
import { Button , TextField } from '@mui/material'
import React , { useRef} from "react";

import { auth, provider } from '../firebase/firebaseConfig'
import { signInWithPopup } from "firebase/auth";
import DataService from '../firebase/firebaseOperations';

import {useDispatch , useSelector} from 'react-redux';
import {setActiveUser , selectUsername} from "../userSlice"
import { useHistory } from "react-router-dom";

function AuthCompany() {

  const Companyname = useRef();
  const ContactMail = useRef();
  const Name = useRef();

  const dispatch = useDispatch();
  let navigate = useHistory();



  const login = (e)=>{
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then(async (result) => {

        const user = result.user;
        const reguser = user.email.split("@");

        //console.log(user);

        try {
            const exist = await DataService.getData("company",reguser[0]);
        
            if (exist._document === null) {
                window.alert("No Company Account exist for this Email");
            }else{
                console.log(exist);
                dispatch(setActiveUser({email: reguser[0] , companyname : exist?._document?.data?.value?.mapValue?.fields?.companyname?.stringValue , img :  exist?._document?.data?.value?.mapValue?.fields?.img?.stringValue}));
                navigate.push('/Compdash');
            }
        } catch (e) {
            console.error("Error occured");
        }

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;

    });
}

  const register = (e)=>{
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then(async (result) => {

        const user = result.user;
        const reguser = user.email.split("@");

        //console.log(user);

        try {
            const exist = await DataService.getData("company",reguser[0]);
            console.log(exist)
            if (exist._document === null) {
                dispatch(setActiveUser({email: reguser[0] , companyname : Companyname.current.value , img : user.photoURL}));
               
                await DataService.addData("company", reguser[0],{ name : Name.current.value ,contact : ContactMail.current.value , companyname : Companyname.current.value  ,  img: user.photoURL, email: user.email });
                navigate.push('/Compdash');
            }else{
                window.alert("user already registered")
            }
        } catch (e) {
            console.error("Error occured");
        }

    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
    });
  }

 
  return <div className="AuthCompany">
   
  <div className="AuthCompany_Wrapper">
      <div className="AuthCompany_Wrapper_Left">
          <div className="AuthCompany_Form perfect-center">
              <h1 className="Login_Header">Company Login<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKBt5uxxKfWsZZFmWOOtKcD5cNXa8rnQfv5w&usqp=CAU" width={60}></img></h1>
              <p className="Login_Header_Foot">Log in to see Changes  in Your Profile</p>
              <button className="Google_Sign_In_Company" onClick={login}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7oFUuwinXSQQ3a40nL5YBiDQpZn9b54a3g&usqp=CAU"></img>Sign in With Google</button>
              <div className="Signup_Header">
                   <div className="Signup_Header_Text">
                       <hr style={{display:"inline-block", width:"14vh"}} />
                       <div className="Signup_Header_Text_Word">
                        Register Here
                       </div>
                       <hr style={{display:"inline-block", width:"14vh"}} />
                   </div>
              </div>
              <div className="Signup_Form">
                    <form onSubmit={register}>
                        <TextField id="outlined-basic" label="Company Name" style={{width:"20vw"}} variant="outlined" inputRef={Companyname} required/>
                        <hr className="myline"></hr>
                        <TextField id="outlined-basic" label="Your Name" style={{width:"20vw"}} variant="outlined" inputRef={Name} required/>
                        <hr className="myline"></hr>
                        <TextField id="outlined-basic" type="email" label="Contact Email" style={{width:"20vw"}} variant="outlined" inputRef={ContactMail} required/>
                        <hr className="myline"></hr>
                        <Button variant="outlined" style={{width:"20vw"}} type="submit"> Sign Up</Button>
                    </form>
              </div>
          </div>
      </div>
      <div className="AuthCompany_Wrapper_Right">
        <img className="AuthCompany_Right_Img perfect-center" src="https://www.kindpng.com/picc/m/273-2738804_php-login-and-authentication-login-hd-png-download.png"></img>
       </div>
  </div>
</div>;
}

export default AuthCompany;

import "./Auth.css";
import { Button, TextField } from '@mui/material'
import React, { useRef } from "react";
import { auth, provider } from '../firebase/firebaseConfig'
import { signInWithPopup } from "firebase/auth";
import DataService from '../firebase/firebaseOperations'
import { useDispatch, useSelector } from 'react-redux';
import { selectUsername, setActiveUser } from "../userSlice"
import { useHistory } from "react-router-dom";

function Auth() {

    const dispatch = useDispatch();
    const val2 = useSelector(selectUsername);
    const firstname = useRef();
    const history = useHistory();
    const lastname = useRef();
    const login = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then(async (result) => {

                const user = result.user;
                const reguser = user.email.split("@");

                console.log(user);

                try {
                    const exist = await DataService.getData("user", reguser[0]);

                    if (exist._document === null) {
                        window.alert("No user exist for this Email");
                    } else {
                        dispatch(setActiveUser({ email: user.email, username: reguser[0] }));
                        history.push("/dash")
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

    const register = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then(async (result) => {

                const user = result.user;
                const reguser = user.email.split("@");

                console.log(user);

                try {
                    const exist = await DataService.getData("user", reguser[0]);
                    console.log(exist)
                    if (exist._document === null) {
                        dispatch(setActiveUser({ email: user.email, username: reguser[0] }));
                        await DataService.addData("user", reguser[0], { Name: firstname.current.value + " " + lastname.current.value, img: user.photoURL, email: user.email });
                    } else {
                        window.alert("user already registered");
                        history.push("/dash")
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

    return (
        <>
            <div className="Auth">
                <div className="Auth_Wrapper">
                    <div className="Auth_Wrapper_Left">
                        <div className="Auth_Form perfect-center">
                            <h1 className="Login_Header">Login<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKBt5uxxKfWsZZFmWOOtKcD5cNXa8rnQfv5w&usqp=CAU" width={40}></img></h1>
                            <p className="Login_Header_Foot">Log in to see Changes  in Your Profile</p>
                            <button className="Google_Sign_In_Company" onClick={login}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7oFUuwinXSQQ3a40nL5YBiDQpZn9b54a3g&usqp=CAU"></img>Sign in With Google</button>
                            <div className="Signup_Header">
                                <div className="Signup_Header_Text">
                                    <hr style={{ display: "inline-block", width: "70px" }} />
                                    <div className="Signup_Header_Text_Word">
                                        New Users Register Here
                                    </div>
                                    <hr style={{ display: "inline-block", width: "70px" }} />
                                </div>
                            </div>
                            <div className="Signup_Form">
                                <form onSubmit={register}>
                                    <TextField id="outlined-basic" label="First Name" style={{ width: "20vw" }} variant="outlined" inputRef={firstname} required />
                                    <hr className="myline"></hr>
                                    <TextField id="outlined-basic" label="Last Name" style={{ width: "20vw" }} variant="outlined" inputRef={lastname} required />
                                    <hr className="myline"></hr>
                                    <Button variant="outlined" style={{ width: "20vw" }} type="submit"> Sign Up</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="Auth_Wrapper_Right">
                        <img className="Auth_Right_Img perfect-center" src="https://www.kindpng.com/picc/m/273-2738804_php-login-and-authentication-login-hd-png-download.png"></img>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;

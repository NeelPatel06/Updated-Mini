import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import "./Signin.css"
import whatsapp from "../images/whatsapp1.png"
import { Button, Card, CardContent } from '@mui/material';
import google from "../images/google.png"
import {signInWithPopup} from "firebase/auth"
import {auth,database,googleProvider} from "../firebase"
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {

   const navigate = useNavigate()


    const addUser = async ()=>{
        const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
        try{
            await setDoc(userDoc,{
                id:auth.currentUser?.uid,
                username:auth.currentUser?.displayName,
                profile_image:auth.currentUser?.photoURL
            })
        }catch(err){
            console.error(err)
        }
    }

    const googleSignin = async()=>{
        try{
            await signInWithPopup(auth,googleProvider)
            addUser()
            navigate("/main")
        }catch(err){
            console.error(err)
        }
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ height: "2300px", backgroundColor: "#808080" }}>
                <Toolbar>
                    <div className='nav-content'>
                        <img className='logo' src={whatsapp} />
                        <h3 className='title'></h3>
                    </div>
                    <Card className='box'>
                            <CardContent className='signin-card'>
                                <div className='description' style={{ textAlign: 'center' }}>
                                    <h2><b>Please click on the image to continue to chat 👉</b></h2>
                                </div>
                                <div onClick={googleSignin} className='signin-btn'>
                                    <img className='google' src={google}/>
                                </div>
                             </CardContent>
                    </Card>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
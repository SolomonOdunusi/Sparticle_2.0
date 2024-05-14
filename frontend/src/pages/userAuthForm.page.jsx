import React, { useRef } from 'react'
import InputBox from '../components/input.component';
import google from '../imgs/google.png'
import { Link, Navigate } from 'react-router-dom';
import PageAnimation from '../common/page-animation';
import {Toaster, toast} from 'react-hot-toast';
import axios from 'axios';
import { storeSession } from '../common/session';
import { useContext } from 'react';
import { userContext } from '../App';

const UserAuthForm = ({type}) => {

    const formRef = useRef();
    const url = import.meta.env.VITE_SERVER_DOMAIN;

    let { userAuth: {access_token}, setUserAuth } = useContext(userContext);

    console.log(access_token)

    const handleUserAuth = (serverRoute, formData) => {
        console.log(url + serverRoute, formData)
        axios.post(url + serverRoute, formData)

        // Success handling
        .then(({ data }) => {
            storeSession("user", JSON.stringify(data))
            setUserAuth(data)

            toast.success("Welcome back to Sparticle!")
        })
        // Error handling
        .catch(({response}) => {
            // toast.error(response.data.error)
            toast.error("An error occurred, please try again")
        });
    //     // axios {
    //     //     response: {
    //     //         data: {
    //     //             message
    //     //         }
    //     //     }
    //     // }

    }

    // Handle the submission of the form
    const handleSubmit = (e) => {
        // To prevent from sending the form without validation
        e.preventDefault();

        let serverRoute = type == "Sign In" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        let form = new FormData(formRef.current)

        let formData = {}


        // Iterate through the form fullname, email and password
        for (let [key, value] of form.entries()){
            formData[key] = value;
        }

        console.log(formData)

        let {fullname, email, password} = formData;

// // Validate the data
        if (fullname) {
            if (fullname.length < 3) {
                return toast.error("Full Name must be at least 3 letters long")
            }
        }                
        if (!email.length) {
            return toast.error("Email is required")
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long")
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email must be valid")
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password must contain at least one number, one uppercase and one lowercase letter")
        }

        handleUserAuth(serverRoute, formData)

    }
  return (
    access_token ?
    <Navigate to="/" />
    :
    <PageAnimation keyValue={type}>
        <section className='h-cover flex items-center justify-center'>
            <Toaster />
            <form ref={formRef} className='w-[80%] max-w[400px]'>
                <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                    {type == "Sign In" ? "Welcome back Y'all" : "Join us today"}
                </h1>
                {
                    type != "Sign In" ? 
                    <InputBox
                        name="fullname"
                        type="text"
                        placeholder="Full Name"
                        icon="fi-rr-user" />

                    : ""
                }
                <InputBox
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon="fi-rr-envelopes"
                    />
                <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-rr-lock"
                    />

                <button
                    className='btn-trns rounded-md center mt-16' type='submit' onClick={handleSubmit}>
                        {type}
                </button>

                <div className='or-separator'>
                    <hr className='line-div'/>
                    <p>or</p>
                    <hr className='line-div'/>
                </div>

                <button className='btn-trns rounded-full flex justify-center items-center gap-4 w-[70%] center'>
                    <img src={google} alt="google" className='w-5'/>
                    Continue with Google
                </button>

                {
                    type == "Sign In" ?
                    <p className='mt-6 text-dark-grey text-center text-xl'>
                        Don't have an account?
                        <Link to="/signup" className='underline text-black ml-1'>Sign up here</Link>
                    </p>
                    :
                    <p className='mt-6 text-dark-grey text-center text-xl'>
                        Already have an account?
                        <Link to="/signin" className='underline text-black ml-1'>Sign in here</Link>
                    </p>
                }

            </form>

        </section>
    </PageAnimation>
  )
}

export default UserAuthForm;
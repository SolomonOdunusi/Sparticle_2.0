import React from 'react'
import InputBox from '../components/input.component';
import google from '../imgs/google.png'
import { Link } from 'react-router-dom';
import PageAnimation from '../common/page-animation';

const UserAuthForm = ({type}) => {
  return (
    <PageAnimation keyValue={type}>
        <section className='h-cover flex items-center justify-center'>
            <form action="" className='w-[80%] max-w[400px]'>
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
                    className='btn-trns rounded-md center mt-16' type='submit'>
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
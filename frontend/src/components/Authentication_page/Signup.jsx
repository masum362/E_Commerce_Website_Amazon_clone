import React, { useEffect, useState } from 'react';
import './signup.css'
import logo from '../../assets/amazon_logo.png'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ScaleLoader } from 'react-spinners';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsloading(true);
        }, 1000);
    }, [])

    const [user, setUser] = useState({});

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            cpassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!').max(30, 'Must be 30 characters or less'),
            email: Yup.string().required('Required!').email("Enter a valid email address"),
            mobile: Yup.number().required('required!').positive('Number must be positive').min(10, "must be 10 characters"),
            password: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required('Required!'),
            cpassword: Yup.string().min(6, "Too Short!").max(20, "Too Long!").required('Required!').oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: async (values) => {
            await axios.post("http://localhost:3002/register", values).then(res => {
                console.log(res.status)
                if (res.status === 201) {
                    toast.success('Registration Successfull!', {
                        position: "top-right",
                    })
                }

            }).catch(err => { 
                if(err.response.status==409 || err.response.status===501 || err.response.status===403){
                    toast.warning('Something Went Wrong', {
                        position: "top-right",
                    })
                }
             });
        },

    })

    return (
        <section >
            {isloading && <div className='sign_container'>
                <div className="sign_header">
                    <img src={logo} alt="" />
                </div>
                <div className="sign_form">
                    <form onSubmit={formik.handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className="form_data">
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} />
                            {formik.touched.name && formik.errors.name ? (
                                <div>{formik.errors.name}</div>
                            ) : null}
                        </div>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form_data">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" name='mobile' id='mobile' value={formik.values.mobile} onChange={formik.handleChange} />
                            {formik.touched.mobile && formik.errors.mobile ? (
                                <div>{formik.errors.mobile}</div>
                            ) : null}
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' value={formik.values.password} placeholder='at least 6 char' onChange={formik.handleChange} />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="form_data">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" name='cpassword' id='cpassword' value={formik.values.cpassword} onChange={formik.handleChange} />
                            {formik.touched.cpassword && formik.errors.cpassword ? (
                                <div>{formik.errors.cpassword}</div>
                            ) : null}
                        </div>

                        <button type='submit' className='signin_btn'>Continue</button>
                    </form>
                    <div className="signin_info">
                        <p>Already Have An Account?</p>
                        <Link to={'/signin'}>Log In</Link>
                    </div>

                </div>


            </div>}

            {!isloading && <ScaleLoader

                color={"#000"}
                size={150}
                style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
                aria-label="Loading Spinner"
                data-testid="loader" />}

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />

        </section>
    )
}

export default Signup
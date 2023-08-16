import React, { useContext, useEffect, useState } from 'react';
import './signup.css';
import logo from '../../assets/amazon_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LoginContext } from '../context/AccountContext';


const Signin = () => {
    const { account, setAccount } = useContext(LoginContext)
    const navigate = useNavigate();

    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsloading(true);
        }, 1000);
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email("Enter a valid email address"),
            password: Yup.string().min(6, "At least 6 char").max(20, 'Must be 20 characters or less').required('Required'),
        }),
        onSubmit: async (values) => {
            await axios.post('http://localhost:3002/login', values, { withCredentials: true }).then(res => {
                if (res.status== 201) {
                    setAccount(res.data)
                    formik.resetForm();
                    navigate('/')
                    toast.warning("login successfully")
                }
                else{
                    toast.warning("invalid details")
                }
            }).catch(err => {
                toast.warning("invalid details")
                   
            })
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
                        <h1>Sign In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' id='password' value={formik.values.password} placeholder='at least 6 char' onChange={formik.handleChange} />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button type='submit' className='signin_btn'>Sign In</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New To Amazon?</p>
                    <Link to={'/signup'}><button>Create Your Amazon Account</button></Link>
                </div>


            </div>}

            {!isloading && <ScaleLoader
                color={"#000"}
                size={150}
                style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
                aria-label="Loading Spinner"
                data-testid="loader"
            />}
            <ToastContainer />
        </section>
    )
}

export default Signin
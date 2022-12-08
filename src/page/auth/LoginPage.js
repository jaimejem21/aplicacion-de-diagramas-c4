import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import imagenLogin from '../../assets/image/login.svg';
import { authContext } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';

const LoginPage = () => {

    const { login } = useContext(authContext);

    const { value, HandleInputChange } = useForm({ email: "", password: "" });
    const [error, seterror] = useState("");
    const { email, password } = value;

    const HandleLoginSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, (err) => {
            seterror(err ? "Error en la validacion !!!" : "");
        });
    }

    return (

        <div className='bg-custom container-fluid vh100 d-flex justify-content-center align-items-center'>

            <div className='card-auth shadow d-flex  justify-content-center align-items-center'>
                <img src={imagenLogin} className='img-medium' alt="login" />
            </div>

            <div className='card-auth  shadow d-flex justify-content-center align-items-center'>

                <form
                    className='row m-0  img-medium rounded'
                    onSubmit={HandleLoginSubmit}
                >

                    <h4 className='text-center'>Login</h4>

                    <div className='col-12 col-md-10 mx-auto my-2'>
                        <input
                            name='email'
                            value={email}
                            onChange={HandleInputChange}
                            type='email'
                            className='form-control'
                            required
                            placeholder='email...'
                        />
                    </div>

                    <div className='col-12 col-md-10 mx-auto my-2'>
                        <input
                            name='password'
                            value={password}
                            onChange={HandleInputChange}
                            type='password'
                            className='form-control'
                            required
                            placeholder='password...'
                        />
                    </div>

                    <div className='col-md-10 mx-auto my-2'>
                        <Link to={'/register'} className='text-white'>create new account?</Link>
                    </div>

                    {
                        (error.length !== 0) &&

                        <div className='text-center text-warning'>
                            <small>{error}</small>
                        </div>

                    }

                    <div className='col-md-10 mx-auto my-2'>
                        <button className='btn btn-primary'>
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default LoginPage

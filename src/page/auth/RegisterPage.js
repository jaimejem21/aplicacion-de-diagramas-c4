import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import imagenRegister from '../../assets/image/register.svg';
import { authContext } from '../../context/authContext';
import { useForm } from '../../hooks/useForm';

const RegisterPage = () => {


    const { createUser } = useContext(authContext);

    const { value, HandleInputChange } = useForm({
        name: "",
        email: "",
        password: ""
    });

    const [error, seterror] = useState("");

    const { name, email, password } = value;

    const HandleRegisterSubmit = async (e) => {

        e.preventDefault();
        await createUser(name, email, password, (err) => {
            seterror(err ? "Error en la validacion de los datos !!!" : "");
        });
    }

    return (
        <div className='bg-custom container-fluid vh100 d-flex justify-content-center align-items-center'>

            <div className='card-auth shadow d-flex  justify-content-center align-items-center'>
                <img src={imagenRegister} className='img-medium' alt="register" />
            </div>

            <div className='card-auth  shadow d-flex justify-content-center align-items-center'>

                <form
                    className='row m-0  img-medium rounded'
                    onSubmit={HandleRegisterSubmit}
                >

                    <h4 className='text-center'>Register</h4>


                    <div className='col-12 col-md-10 mx-auto my-2'>
                        <input
                            name='name'
                            value={name}
                            onChange={HandleInputChange}
                            type='text'
                            className='form-control'
                            required
                            placeholder='name...'
                        />
                    </div>

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
                        <Link to={'/login'} className='text-white '>sing In</Link>
                    </div>

                    {
                        (error.length !== 0) &&

                        <div className='text-center text-warning'>
                            <small>{error}</small>
                        </div>
                    }

                    <div className='col-md-10 mx-auto my-2'>
                        <button className='btn btn-primary'>
                            Register
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterPage

import React, { useCallback, useContext, useEffect } from 'react'
import { authContext } from '../../context/authContext';
import socketContext from '../../context/socketContext';
import { useLoadSala } from '../../hooks/useLoadSala';
import { CreateSala } from './CreateSala';
import List from './List';
import { useForm } from '../../hooks/useForm';
import { useHistory } from 'react-router-dom';
import { apiDiagrama } from '../../api/apiDiagrama';

const HomePage = () => {

    const history = useHistory();
    const { online, socket } = useContext(socketContext);
    const { auth, logout } = useContext(authContext);
    const { id } = auth;
    const { salas, agregar, eliminar, update } = useLoadSala(id);

    const { value, HandleInputChange } = useForm({
        idSala: ""
    });

    const { idSala } = value;

    const HandleLogout = () => {
        logout();
    }

    const SetUserSala = useCallback(async (idSala) => {

        const res = await apiDiagrama(`/sala/setUsuario/${idSala}`, "PUT", { idUser: id });

        if (!res.ok) {
            console.log("Error al agregar el usuario");
            return;
        }

        history.replace(`/board/${idSala}`);

    }, [history, id]);

    const HandleSolicitudSala = (e) => {
        e.preventDefault();
        socket.emit('solicitud-sala', { idSala, nameUser: auth.name, idUser: id });
    }


    useEffect(() => {

        socket.on('respuesta-solicitud', (args) => {

            const { active, denegado, idSala } = args;

            if (!active) {
                alert("La sala no esta activa!!!");
                return;
            }

            if (denegado) {
                alert("El anfitrion a denegado la solicitud!!!");
                return;
            }

            SetUserSala(idSala);
        })

        return () => {
            socket.removeAllListeners("respuesta-solicitud");
        }

    }, [socket,SetUserSala]);




    return (

        <div className='vh100 bg-content'>

            <header className='bg-dark text-white container-fluid'>
                <div className='row p-1'>
                    <div className='col-md-11'>
                        <h1 className='my-1  text-center'>C4 Diagramas</h1>
                    </div>
                    <div className='col-md-1 text-center justify-content-center d-flex align-items-center'>
                        <p onClick={HandleLogout} className='text-white-50 pointer'>logout</p>
                    </div>
                </div>
            </header>

            {
                online
                    ? <small className='text-center d-block text-primary'>online</small>
                    : <small className='text-center d-block text-danger'>offline</small>
            }


            <section className='container-fluid mt-2'>

                <div className='row'>

                    <List data={salas} eliminar={eliminar} idUser={id} update={update} />

                    <div className='col-md-3 p-1 justify-content-start d-flex flex-column '>

                        <div className='border rounded my-1 bg-white shadow p-2'>

                            <h5 className='text-center'>Unirse a Sala</h5>

                            <form
                                className='container-fluid row  m-0'
                                onSubmit={HandleSolicitudSala}
                            >
                                <div className='col-md-10 mx-auto my-1'>
                                    <input
                                        type='text'
                                        name={"idSala"}
                                        onChange={HandleInputChange}
                                        value={idSala}
                                        placeholder='idSala'
                                        className='form-control'
                                    />
                                </div>
                                <div className='col-md-10 mx-auto my-2'>
                                    <button className='btn btn-primary'>solicitar</button>
                                </div>
                            </form>

                        </div>

                        <CreateSala agregar={agregar} idUser={id} />

                    </div>

                </div>

            </section>

        </div>
    );
}

export default HomePage

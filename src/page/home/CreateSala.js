import React from 'react'
import { apiDiagrama } from '../../api/apiDiagrama';
import { useForm } from '../../hooks/useForm'

export const CreateSala = (props) => {

    const { agregar, idUser: anfitrion } = props;

    const { value, HandleInputChange, reset } = useForm({
        name: ""
    });

    const { name } = value;

    const HandleCreateSubmit = async (e) => {
        e.preventDefault();

        let res = await apiDiagrama("/sala/create", "POST", { anfitrion, name });
        if (!res.ok) {
            console.log(`Error al crear la sala:${res.message}`);
            return;
        }
        agregar(res.data);
        reset();
    }


    return (
        <div className='border rounded my-1 bg-white shadow p-2'>

            <h5 className='text-center'>Crear una Sala</h5>

            <form
                className='container-fluid row  m-0'
                onSubmit={HandleCreateSubmit}
            >
                <div className='col-md-10 mx-auto my-1'>
                    <input
                        name="name"
                        value={name}
                        onChange={HandleInputChange}
                        type='text'
                        placeholder='name'
                        className='form-control'
                    />
                </div>
                <div className='col-md-10 mx-auto my-2'>
                    <button className='btn btn-primary'>crear</button>
                </div>
            </form>

        </div>
    )
}

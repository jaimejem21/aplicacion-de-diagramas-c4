import React from 'react'
import { Link } from 'react-router-dom';
import { apiDiagrama } from '../../api/apiDiagrama';

const List = (props) => {

    const { data, eliminar, idUser: anfitrion, update } = props;

    const HandleClickEliminar = async (idSala) => {
        const res = await apiDiagrama(`/sala/delete/${idSala}`, "DELETE", { anfitrion });
        if (!res.ok) {
            console.warn("Error al eliminar la sala:" + res.message);
            return;
        }
        eliminar(idSala);
    }

    const HandleActiveSala = async (idSala) => {

        await apiDiagrama(`/sala/active/${idSala}`, "PUT", { anfitrion, active: true });
        update(idSala, { active: true });

    }

    return (
        <div className='col-md-9 p-1 section overflow-auto'>
            <div className='container-fluid'>
                <table className='text-black-50 table table-striped text-center text-white'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>estado</th>
                            <th>eliminar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((sala) => (
                                <tr key={sala._id}>
                                    <th>{sala._id}</th>
                                    <th>{sala.name}</th>
                                    {
                                        sala.active
                                            ? <th><Link to={`/board/${sala._id}`} className='btn btn-success'>ir a sala</Link></th>
                                            : <th><button onClick={(e) => HandleActiveSala(sala._id)} className='btn btn-primary'>activate</button></th>
                                    }
                                    <th>
                                        <button onClick={(e) => HandleClickEliminar(sala._id)} className='btn btn-danger'>eliminar</button>
                                    </th>
                                </tr>

                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List

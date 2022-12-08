import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import imPerson from '../assets/image/person.png';
import imContainer from '../assets/image/container.png';
import imDB from '../assets/image/DB.png';
import imFlecha from '../assets/image/flecha.png';
import imsystExtern from '../assets/image/swext.png';
import imComponent from '../assets/image/component.png';


const Sidebar = (props) => {

    const { show, HandleTypeModal, HandleTypeDiagram } = props
    const [nivel, setnivel] = useState("Container");

    const HandleChange = (e) => {
        HandleTypeDiagram(e.target.value);
        setnivel(e.target.value);
    }

    return (
        <div className="flex-shrink-0 p-3 bg-dark vh100 sidebar" style={show ? { left: "0" } : { left: "-300px" }}>

            <Link to={"/"} className='d-block text-center text-decoration-none fs-4 text-white pointer'>C4 Diagramas</Link>

            <hr className='border border-white' />

            <select className="form-select" defaultValue={"Container"} onChange={HandleChange} >
                <option value="Container" >Container C4</option>
                <option value="Component">Componente C4</option>
            </select>


            {
                (nivel === "Container")
                    ?
                    <ul className="list-unstyled ps-0 my-3 content-sidebar overflow-auto sidebar-scroll">

                        <li className='my-1 text-center'>
                            <small className='text-white'>Person</small>
                            <p onClick={() => HandleTypeModal("person")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imPerson} height={30} alt={"person"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>Container</small>
                            <p onClick={() => HandleTypeModal("container")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imContainer} height={30} alt={"container"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>System_Ext</small>
                            <p onClick={() => HandleTypeModal("system_extern")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imsystExtern} height={30} alt={"system_extern"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>containerDB</small>
                            <p onClick={() => HandleTypeModal("containerDB")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imDB} height={30} alt={"containerDB"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>DrawRelation</small>
                            <p onClick={() => HandleTypeModal("Relation")} className='text-decoration-none d-block p-2 text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imFlecha} height={20} alt={"Relation"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <p onClick={() => HandleTypeModal("SystemBoundary")} className='text-decoration-none d-block p-2 text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <small className='text-white'>DrawSystemBoundary</small>
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <p onClick={() => HandleTypeModal("Eliminar")} className='text-decoration-none d-block p-2 text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <small className='text-white'>Eliminar</small>
                            </p>
                        </li>

                    </ul>
                    :
                    <ul className="list-unstyled ps-0 my-3">

                        <li className='my-1 text-center'>
                            <small className='text-white'>Container</small>
                            <p onClick={() => HandleTypeModal("container")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imContainer} height={30} alt={"container"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>containerDB</small>
                            <p onClick={() => HandleTypeModal("containerDB")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imDB} height={30} alt={"containerDB"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>System_Ext</small>
                            <p onClick={() => HandleTypeModal("system_extern")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imsystExtern} height={30} alt={"system_extern"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <small className='text-white'>Component</small>
                            <p onClick={() => HandleTypeModal("component")} className='text-decoration-none d-block  text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imComponent} height={30} alt={"component"} />
                            </p>
                        </li>


                        <li className='my-1 text-center'>
                            <small className='text-white'>DrawRelation</small>
                            <p onClick={() => HandleTypeModal("Relation")} className='text-decoration-none d-block p-2 text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <img src={imFlecha} height={20} alt={"Relation"} />
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <p onClick={() => HandleTypeModal("SystemBoundary")} className='text-decoration-none d-block p-2 text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <small className='text-white'>DrawSystemBoundary</small>
                            </p>
                        </li>

                        <li className='my-1 text-center'>
                            <p onClick={() => HandleTypeModal("Eliminar")} className='text-decoration-none d-block p-2 text-center text-white pointer' data-bs-toggle="modal" data-bs-target="#modal-create">
                                <small className='text-white'>Eliminar</small>
                            </p>
                        </li>

                    </ul>
            }

        </div>
    )
}

export default Sidebar

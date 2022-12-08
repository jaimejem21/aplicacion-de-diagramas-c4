import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import pako from 'pako';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal'
import { textEncode } from '../../helpers/helpers'
import { useSala } from '../../hooks/useSala';
import { apiDiagrama } from '../../api/apiDiagrama';
import socketContext from '../../context/socketContext';
import { useDiagrama } from '../../hooks/useDiagrama';

const BoardPage = () => {

    const history = useHistory();
    const { socket } = useContext(socketContext);
    const [showbar, setShowbar] = useState(false);
    const [typeModal, setTypeModal] = useState("load");
    const [typeDiagram, settypeDiagram] = useState("Container");
    const { executeDraw } = useDiagrama();
    const { sala, error, isAnfitrion, validate } = useSala();

    //Save DB
    const [sourceDiagram, setsourceDiagram] = useState("");
    const [sourceRel, setSourceRel] = useState([]);

    const refImage = useRef();

    const HandleTypeModal = (type) => {
        setTypeModal(type);
    }

    const HandleTypeDiagram = (type) => {
        settypeDiagram(type);
    }

    const FinalizarRoom = async () => {

        const res = await apiDiagrama(`/sala/finalize/${sala._id}`);
        if (!res.ok) {
            console.log("Error no se pudo cerrar la sala");
            return;
        }
        // Finalizar sala
        socket.emit("finalizar-sala", { idSala: sala._id });
        history.replace('/');
    }

    //Button Dowload
    const HandleClickDowload = () => {
        try {
            fetch(refImage.current.src)
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = "DiagramaC4";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                });

        } catch (errr) {
            alert("Nose pudo descargar la imagen!!!");
        }
    }

    //Button Borrar
    const HandleBorraBoard = () => {
        setsourceDiagram("");
        setSourceRel([]);
        DrawDiagram();
        socket.emit("borrar-board", { idSala: sala._id });
    }

    const DrawDiagram = useCallback((element = "", SystemBoundary = null) => {

        let source = `@startuml\n!include C4_${typeDiagram}.puml\n`;

        if (SystemBoundary) {

            const { id, title } = SystemBoundary;

            setsourceDiagram((sourceD) => {

                let DrawSystem_Boundary = `System_Boundary(${id},"${title}"){\n` + sourceD + `}\n`;
                source += DrawSystem_Boundary;
                source += "@enduml";

                let data = textEncode(source);
                let compressed = pako.deflate(data, { level: 9, to: 'string' });
                let result = btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
                refImage.current.src = `https://kroki.io/plantuml/svg/${result}`;

                return DrawSystem_Boundary;
            })

            return;
        }


        setsourceDiagram((sourceD) => {

            source += sourceD;
            source += element;

            source += "@enduml";

            let data = textEncode(source);
            let compressed = pako.deflate(data, { level: 9, to: 'string' });
            let result = btoa(compressed).replace(/\+/g, '-').replace(/\//g, '_');
            refImage.current.src = `https://kroki.io/plantuml/svg/${result}`;

            return sourceD + element
        });

    }, [typeDiagram]);

    // Save Data Board
    const HandleSaveBoard = async () => {
        const res = await apiDiagrama(`/sala/setData/${sala._id}`, "POST", { board: sourceDiagram, links: sourceRel });
        if (!res.ok) {
            alert("No se pudo guardar la data !!!");
            return;
        }
        alert("Se guardo los datos de la pizarra !!!")
    }


    // Solicitud Anfitrion [On]
    useEffect(() => {

        socket.on('solicitud-anfitrion', (args) => {
            const { idUser, message, idSala } = args;
            if (window.confirm(message)) {
                socket.emit('solicitud-aceptada', { idUser, idSala });
            } else {
                socket.emit('solicitud-denegada', { idUser, idSala });
            }
        });

        return () => {
            socket.removeAllListeners("solicitud-anfitrion");
        }

    }, [socket])


    // Agregar ala sala join para que escuchen events [emit]
    useEffect(() => {

        (sala) && socket.emit('agregar-sala', { idSala: sala._id })

    }, [socket, sala]);


    //Close Sala [On]
    useEffect(() => {

        socket.on('close-sala', (args) => {
            socket.emit('leave-sala', args);
            history.replace("/");
        });

        return () => {
            socket.removeAllListeners("close-sala");
        }

    }, [socket, history]);


    //Borrar Board [On]
    useEffect(() => {

        socket.on("borrar-board-client", () => {
            setsourceDiagram("");
            setSourceRel([]);
            DrawDiagram();
        });

        return () => {
            socket.removeAllListeners("borrar-board-client");
        }

    }, [socket, DrawDiagram]);

    // Draw Figure [On]

    useEffect(() => {

        socket.on("draw-figure-sala", (args) => {

            // params[0] :id
            const { element, params, idElement } = args;

            if (idElement) {
                setSourceRel((rel) => [...rel, idElement]);
            }

            if (element === "DrawSystemBoundary") {
                const [id, title] = params;
                DrawDiagram("", { id, title });
                return;
            }

            DrawDiagram(executeDraw(element, params));

        });

        return () => {
            socket.removeAllListeners("draw-figure-sala");
        }

    }, [socket, executeDraw, DrawDiagram]);


    // Ejecuta cuado se cambia typeDiagram
    // Se carga los datos guardados de la sala 

    useEffect(() => {

        if (sala && refImage.current) {
            setsourceDiagram(sala.board);
            setSourceRel(sala.links);
            DrawDiagram();
        }

    }, [sala, DrawDiagram]);

    // Eliminar element [On]

    useEffect(() => {

        socket.on("eliminar-element-client", (args) => {

            const { idElement } = args;

            let regexFind = new RegExp(`\\S*${idElement}\\S*\n`, "gi");
            let regexCierre = new RegExp(`}\n`, "gi");

            if (idElement.includes('limit')) {

                setsourceDiagram((dataSource) => {

                    let res = dataSource.replace(regexFind, "");
                    res = res.replace(regexCierre, "")
                    return res;

                });

            } else {

                setsourceDiagram((dataSource) => {

                    let res = dataSource.replace(regexFind, "");
                    return res;

                });

            }

            // Eliminando id 
            setSourceRel((ArrayIds) => {
                let idFilters = ArrayIds.filter((idRel) => idRel !== idElement);
                return idFilters;
            });

            // Params por Defecto
            DrawDiagram();

        })

        return () => {
            socket.removeAllListeners("eliminar-element-client");
        }

    }, [socket, DrawDiagram]);

    if (validate) {
        return <h5 className='text-center'>Cargando !!!</h5>
    }

    if (error.length > 0) {
        return <h5 className='text-center'>{error}</h5>
    }

    return (

        <>
            <Sidebar
                show={showbar}
                HandleTypeModal={HandleTypeModal}
                HandleTypeDiagram={HandleTypeDiagram}
            />

            <div className='container-fluid'>

                <header className='row border'>
                    <div className='col-md-11'>
                        <h2 className='text-center'>C4 Diagramas</h2>
                    </div>
                    <div className='col-md-1 text-center my-auto'>
                        <FontAwesomeIcon
                            icon={faBars}
                            className='pointer'
                            onClick={() => setShowbar(!showbar)}
                        />
                    </div>
                </header>

                <section className='row mt-3'>

                    <div className='col-12 col-md-10 mx-auto shadow board text-center'>
                        <img ref={refImage} src={"x"} alt={"C4 diagramas"} className={(sourceRel.length) > 2 ? "h-100" : ""} />
                    </div>

                    <div className='col-12 col-md-10 mx-auto p-2'>
                        {
                            (isAnfitrion)
                                ?
                                <>
                                    <button onClick={HandleSaveBoard} className='btn btn-primary mx-1'>Guardar</button>
                                    <button onClick={HandleBorraBoard} className='btn btn-danger mx-1'>Borrar</button>
                                    <button onClick={HandleClickDowload} className='btn btn-success mx-1'>Imprimir</button>
                                    <button onClick={FinalizarRoom} className='btn btn-dark mx-1'>Finalizar reunion</button>
                                </>
                                : <button onClick={HandleClickDowload} className='btn btn-success mx-1'>Imprimir</button>
                        }
                    </div>

                </section>

                <Modal type={typeModal} DrawDiagram={DrawDiagram} setSourceRel={setSourceRel} sourceRel={sourceRel} setsourceDiagram={setsourceDiagram} />

            </div>
        </>
    )
}

export default BoardPage

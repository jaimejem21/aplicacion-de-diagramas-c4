import React, { useContext } from 'react'
import { useParams } from 'react-router';
import socketContext from '../context/socketContext';
import { useForm } from '../hooks/useForm';

export const FormDelete = (props) => {

    const { idsala } = useParams();
    const { socket } = useContext(socketContext);
    const { sourceRel, setsourceDiagram, DrawDiagram, setSourceRel } = props;

    const { value, HandleInputChange, reset } = useForm({
        eliminar: "option"
    });

    const { eliminar } = value;

    const HandleClikSubmit = (e) => {
        e.preventDefault();

        let regexFind = new RegExp(`\\S*${eliminar}\\S*\n`, "gi");
        let regexCierre = new RegExp(`}\n`, "gi");

        if (eliminar.includes('limit')) {

            setsourceDiagram((dataSource) => {

                let res = dataSource.replace(regexFind, "");
                res = res.replace(regexCierre, "")
                console.log(res);
                return res;

            });

        } else {

            setsourceDiagram((dataSource) => {

                let res = dataSource.replace(regexFind, "");
                console.log(res);
                return res;

            });

        }

        // Eliminando id 
        setSourceRel((ArrayIds) => {
            let idFilters = ArrayIds.filter((idRel) => idRel !== eliminar);
            return idFilters;
        });

        // Params por Defecto
        DrawDiagram();

        socket.emit("eliminar-element", {
            idsala,
            idElement: eliminar
        });

        reset();
    }

    return (
        <form onSubmit={HandleClikSubmit}>
            <div className='my-2'>
                <select name={"eliminar"} className="form-select" defaultValue={eliminar} onChange={HandleInputChange}>

                    <option value="option">Option</option>

                    {
                        sourceRel.map((rel) => (
                            <option key={rel} value={rel}>{rel}</option>
                        ))
                    }

                </select>
            </div>

            <div className='my-2'>
                <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary mx-1" data-bs-dismiss="modal" >Eliminar</button>
            </div>
        </form>
    )

}

import React, { useContext } from 'react'
import { useParams } from 'react-router';
import socketContext from '../context/socketContext';
import { useForm } from '../hooks/useForm';

export const FormSystemBoundary = (props) => {

    //@params : id, title

    const { DrawDiagram, setSourceRel } = props;
    const { socket } = useContext(socketContext);
    const { idsala } = useParams();

    const { value, HandleInputChange, reset } = useForm({
        id: "",
        title: "",
    });

    const { id, title } = value;

    const HandleClikSubmit = (e) => {

        e.preventDefault();

        let limit = "limit" + id;

        setSourceRel((rels) => [...rels, limit]);

        DrawDiagram("", { id: limit, title });

        socket.emit("draw-figure", {
            idsala,
            element: "DrawSystemBoundary",
            params: [limit, title],
            idElement: limit
        });

        reset();

    }

    return (
        <form onSubmit={HandleClikSubmit}>

            <div className='my-2'>
                <input
                    type='text'
                    placeholder='idName'
                    className='form-control'
                    value={id}
                    name="id"
                    onChange={HandleInputChange}
                />
            </div>
            <div className='my-2'>
                <input
                    type='text'
                    placeholder='title'
                    className='form-control'
                    value={title}
                    name="title"
                    onChange={HandleInputChange}
                />
            </div>

            <div className='my-2'>
                <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-primary mx-1" data-bs-dismiss="modal" >Save</button>
            </div>

        </form>
    )

}

import React, { useContext } from 'react'
import { useParams } from 'react-router';
import socketContext from '../context/socketContext';
import { useForm } from '../hooks/useForm';

export const FormSystemExtern = (props) => {
    //@params : id, title, description

    const { DrawSystemExtern, DrawDiagram, setSourceRel } = props;
    const { socket } = useContext(socketContext);
    const { idsala } = useParams();

    const { value, HandleInputChange, reset } = useForm({
        id: "",
        title: "",
        description: ""
    });

    const { id, title, description } = value;

    const HandleClikSubmit = (e) => {
        e.preventDefault();

        setSourceRel((rels) => [...rels, id]);

        DrawDiagram(DrawSystemExtern(id, title, description));

        socket.emit("draw-figure", {
            idsala,
            element: "DrawSystemExtern",
            params: [id, title, description],
            idElement: id
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
                <input
                    type='text'
                    placeholder='description'
                    className='form-control'
                    value={description}
                    name="description"
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

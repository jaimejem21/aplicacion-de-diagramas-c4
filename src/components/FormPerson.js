import React, { useContext } from 'react'
import { useForm } from '../hooks/useForm';
import { socketContext } from '../context/socketContext';
import { useParams } from 'react-router';

const FormPerson = (props) => {

    //@params : id, title, description

    const { DrawPerson, DrawDiagram, setSourceRel } = props;
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

        DrawDiagram(DrawPerson(id, title, description));

        socket.emit("draw-figure", {
            idsala,
            element: "DrawPerson",
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

export default FormPerson

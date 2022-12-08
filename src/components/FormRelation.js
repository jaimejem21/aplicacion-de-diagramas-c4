import React, { useContext } from 'react'
import { useParams } from 'react-router';
import socketContext from '../context/socketContext';
import { useForm } from '../hooks/useForm';


export const FormRelation = (props) => {

    // @params startId, endId, tecnologia

    const { DrawRelation, DrawDiagram, sourceRel } = props;
    const { socket } = useContext(socketContext);
    const { idsala } = useParams();

    const { value, HandleInputChange, reset } = useForm({
        start: "option",
        end: "option",
        comment: ""
    });

    const { start, end, comment } = value;

    const HandleClikSubmit = (e) => {
        e.preventDefault();
        DrawDiagram(DrawRelation(start, end, comment));

        socket.emit("draw-figure", {
            idsala,
            element: "DrawRelation",
            params: [start, end, comment],
            idElement: null
        });

        reset();
    }

    return (
        <form onSubmit={HandleClikSubmit}>
            <div className='my-2'>
                <select name={"start"} className="form-select" defaultValue={start} onChange={HandleInputChange}>

                    <option value="option">Option</option>

                    {
                        sourceRel.map((rel) => (
                            <option key={rel} value={rel}>{rel}</option>
                        ))
                    }

                </select>
            </div>
            <div className='my-2'>
                <select name={"end"} className="form-select" defaultValue={end} onChange={HandleInputChange}>

                    <option value="option">Option</option>

                    {
                        sourceRel.map((rel) => (
                            <option key={rel} value={rel}>{rel}</option>
                        ))
                    }

                </select>
            </div>

            <div className='my-2'>
                <input
                    type='text'
                    placeholder='comment'
                    className='form-control'
                    value={comment}
                    name="comment"
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

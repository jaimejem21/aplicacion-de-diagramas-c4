
import { useState } from 'react'

export const useForm = (initialState) => {

    const [value, setValue] = useState(initialState);

    const HandleInputChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const reset = () => {
        setValue(initialState);
    }

    return {
        value,
        HandleInputChange,
        reset
    }
}

import { useState } from "react"

export const useForm = (initialState) => {
    const [formState, setFormState] = useState(initialState);

    const reset = () => {
        setFormState(initialState);
    }

    const handleInputChange = ({target: {name, value}}) => {
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return {formState, handleInputChange, reset}
}
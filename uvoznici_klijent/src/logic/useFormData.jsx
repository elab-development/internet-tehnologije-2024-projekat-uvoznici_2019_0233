import React from "react";

const useFormData = (initialData) => {

    const [formData, setFormData] = React.useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return {
        formData,
        handleChange
    };
}

export default useFormData;

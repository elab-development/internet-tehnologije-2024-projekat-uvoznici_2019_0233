import React from 'react';
import Title from "../components/Title";
import {Button, Form, Row} from "react-bootstrap";
import useFormData from "../logic/useFormData";
import axiosInstance from "../logic/axiosInstance";

const ChatBot = () => {

    const {formData, handleChange} = useFormData({
        product_name: "",
        origin_country: "",
        price: ""
    })

    const [aiResponse, setAiResponse] = React.useState("");

    const estimate = (e) => {
        e.preventDefault();

        axiosInstance.post('/estimate', formData).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setAiResponse(data.data.ai_response);
                } else {
                    setAiResponse("Estimation failed. Please try again.");
                }
            }
        ).catch(
            (error) => {
                console.error("Error during estimation:", error);
                alert("An error occurred during estimation. Please try again later.");
            }
        )


    }

    return (
        <div>
            <Title title="Chat bot" subtitle="You can chat with our chat bot to determine estimated costs"/>

            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formProductName">
                        <Form.Label column="lg">Product name</Form.Label>
                        <Form.Control name="product_name" onChange={handleChange} type="text" placeholder="Enter product name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formOriginCountry">
                        <Form.Label column="lg">Origin country</Form.Label>
                        <Form.Control name="origin_country" onChange={handleChange} type="text" placeholder="Enter origin country" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label column="lg">Price</Form.Label>
                        <Form.Control name="price" onChange={handleChange} type="number" placeholder="Enter price" />
                    </Form.Group>

                    <hr/>

                    <Button variant="primary" type="submit" onClick={estimate}>
                        Estimate
                    </Button>
                </Form>
            </Row>

            <Row className="mb-5 mt-5">
                {
                    aiResponse && (
                        <div className="mt-4 p-5 border rounded" style={{backgroundColor: "#f8f9fa"}}>
                            <h5>AI Response:</h5>
                            <p>{aiResponse}</p>
                        </div>
                    )
                }
            </Row>
        </div>
    );
};

export default ChatBot;

import React from 'react';
import Title from "../components/Title";
import {Button, Form} from "react-bootstrap";
import {BiLogIn} from "react-icons/bi";
import useFormData from "../logic/useFormData";
import axiosInstance from "../logic/axiosInstance";

const Login = () => {

    const [showLogin, setShowLogin] = React.useState(true);
    const [message, setMessage] = React.useState("");

    const {formData, handleChange} = useFormData({
        email: "",
        password: "",
        name: ""
    });

    const login = (e) => {
        e.preventDefault();
        axiosInstance.post('/login', {
            email: formData.email,
            password: formData.password
        }).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    window.sessionStorage.setItem('token', data.data.token);
                    window.sessionStorage.setItem('user', JSON.stringify(data.data.user));
                    window.location.href = '/';
                } else {
                    setMessage(data.message || "Login failed. Please try again.");
                }
            }
        ).catch(
            (error) => {
                console.error("Error during login:", error);
                setMessage("An error occurred during login. Please try again later.");
            }
        );
    }

    const register = (e) => {
        e.preventDefault();
        axiosInstance.post('/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setMessage("Registration successful. You can now login.");
                    setShowLogin(true);
                } else {
                    setMessage(data.message || "Registration failed. Please try again.");
                }
            }
        ).catch(
            (error) => {
                console.error("Error during registration:", error);
                setMessage("An error occurred during registration. Please try again later.");
            }
        );
    }

    const title = showLogin ? "Login page" : "Register page";

    return (
        <>
            <Title title={title} subtitle={message}/>

            {
                showLogin && (
                    <div className="p-3">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label column="lg">Email address</Form.Label>
                                <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label column="lg">Password</Form.Label>
                                <Form.Control name="password" onChange={handleChange}  type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    Do not have an account? <Button variant="link" onClick={() => setShowLogin(false)}>Register</Button>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={login}>
                                <BiLogIn/> Login
                            </Button>
                        </Form>
                    </div>
                )
            }

            {
                !showLogin && (
                    <div className="p-3">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label column="lg">Use first and last name</Form.Label>
                                <Form.Control name="name" onChange={handleChange} type="text" placeholder="Enter name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label column="lg">Email address</Form.Label>
                                <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label column="lg">Password</Form.Label>
                                <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    Already have an account? <Button variant="link" onClick={() => setShowLogin(true)}>Login</Button>
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={register}>
                                <BiLogIn/> Register
                            </Button>
                        </Form>
                    </div>
                )
            }

        </>
    );
};

export default Login;

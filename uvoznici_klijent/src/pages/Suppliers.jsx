import React from 'react';
import Title from "../components/Title";
import {Col, Form, Row} from "react-bootstrap";
import axiosInstance from "../logic/axiosInstance";

const Suppliers = () => {

    const [suppliers, setSuppliers] = React.useState([]);

    const searchOnChange = (e) => {
        let searchText = e.target.value;
        axiosInstance.get('/suppliers/search/?query=' + searchText).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setSuppliers(data.data);
                }
            }
        ).catch(
            (error) => {
                console.error("Error searching suppliers:", error);
            }
        );
    }

    return (
        <div>
            <Title title="Supliers" subtitle="You can search our suppliers by name, contact person or address"/>

            <Row>
                <Col md={12} className="p-5">
                    <Form>
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Label column="lg">Search</Form.Label>
                            <Form.Control name="search" onChange={searchOnChange} type="text" placeholder="Enter search text" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="p-5">
                    <table className="table table-responsive">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Person</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            suppliers.map((supplier) => (
                                <tr key={supplier.id}>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.contact_person}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.email}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    );
};

export default Suppliers;

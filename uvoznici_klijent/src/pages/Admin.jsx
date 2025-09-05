import React, {useEffect} from 'react';
import Title from "../components/Title";
import {Row, Table} from "react-bootstrap";
import axiosInstance from "../logic/axiosInstance";
import {FaTrash} from "react-icons/fa";

const Admin = () => {

    const [link, setLink] = React.useState("/paginate");
    const [items, setItems] = React.useState([]);
    const [buttons, setButtons] = React.useState([]);

    useEffect(() => {
        axiosInstance.get(link).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setItems(data.data.data);
                    setButtons(data.data.links);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching paginated data:", error);
            }
        )
    }, [link]);

    return (
        <>
            <Title title="Admin Dashboard" subtitle="Welcome to the admin dashboard." />

            <Row>
                <Table hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items && items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={
                                        () => {
                                            if (window.confirm("Are you sure you want to delete this item?")) {
                                                axiosInstance.delete('/import-items/' + item.id).then(
                                                    (response) => {
                                                        console.log(response);
                                                        const data = response.data;
                                                        if (data.success === true) {
                                                            alert("Item deleted successfully.");
                                                            setLink('/paginate');
                                                        } else {
                                                            alert("Failed to delete item.");
                                                        }
                                                    }
                                                ).catch(
                                                    (error) => {
                                                        console.error("Error deleting item:", error);
                                                        alert("An error occurred while deleting the item.");
                                                    }
                                                );
                                            }
                                        }
                                    }><FaTrash/> Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center">
                    {
                        buttons && buttons.map((button, index) => (
                            <button
                                key={index}
                                className={"btn m-1 " + (button.active ? "btn-primary" : "btn-outline-primary")}
                                onClick={() => {
                                    if (button.url) {
                                        setLink(button.url.replace('http://localhost:8000/api', '') );
                                    }
                                }}
                                dangerouslySetInnerHTML={{__html: button.label}}
                            >
                            </button>
                        ))
                    }
                </div>
            </Row>
        </>
    );
};

export default Admin;

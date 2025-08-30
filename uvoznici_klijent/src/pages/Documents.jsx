import React, {useEffect} from 'react';
import Title from "../components/Title";
import axiosInstance from "../logic/axiosInstance";
import {Col, Form, Row, Table} from "react-bootstrap";
import useFormData from "../logic/useFormData";

const Documents = () => {

    const [myImports, setMyImports] = React.useState([]);
    const [chosenImport, setChosenImport] = React.useState(null);
    const [documents, setDocuments] = React.useState([]);
    const [importItems, setImportItems] = React.useState([]);
    const [suppliers, setSuppliers] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [chosenProduct, setChosenProduct] = React.useState(null);
    const [forceUpdate, setForceUpdate] = React.useState(false);
    const [file, setFile] = React.useState(null);

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const {formData, handleChange} = useFormData({
        supplier_id: 1,
        product_id: 1,
        quantity: 0,
        document_name: "",
        document_type: ""
    });

    const addImport = (e) => {
        e.preventDefault();
        axiosInstance.post('/imports', {
            supplier_id: formData.supplier_id,
            user_id: user.id
        }).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setForceUpdate(!forceUpdate);
                }
            }
        ).catch(
            (error) => {
                console.error("Error adding import:", error);
            }
        );
    }

    const addImportItem = (e) => {
        e.preventDefault();
        if (!chosenImport) {
            alert("Please select an import first.");
            return;
        }
        axiosInstance.post('/import-items', {
            product_id: formData.product_id,
            quantity: formData.quantity,
            price: chosenProduct ? chosenProduct.price : 0,
            import_id: chosenImport.id
        }).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setForceUpdate(!forceUpdate);
                }
            }
        ).catch(
            (error) => {
                console.error("Error adding import item:", error);
            }
        );
    }

    const addImportDocument = (e) => {
        e.preventDefault();
        if (!chosenImport) {
            alert("Please select an import first.");
            return;
        }
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const form = new FormData();
        form.append('document_name', formData.document_name);
        form.append('document_type', formData.document_type);
        form.append('import_id', chosenImport.id);
        form.append('file', file);

        axiosInstance.post('/documents', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setForceUpdate(!forceUpdate);
                }
            }
        ).catch(
            (error) => {
                console.error("Error adding import document:", error);
            }
        );
    }

    useEffect(() => {
        axiosInstance.get('/users/' + user.id +'/imports').then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setMyImports(data.data);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching user imports:", error);
            }
        )
    }, [forceUpdate]);

    useEffect(() => {
        axiosInstance.get('/suppliers').then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setSuppliers(data.data);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching suppliers:", error);
            }
        )
    }, []);

    useEffect(() => {
        //imports/{import_id}/import-items

        if (chosenImport) {
            axiosInstance.get('/imports/' + chosenImport.id + '/import-items').then(
                (response) => {
                    console.log(response);
                    const data = response.data;
                    if (data.success === true) {
                        setImportItems(data.data);
                    }
                }
            ).catch(
                (error) => {
                    console.error("Error fetching import items:", error);
                }
            )
        }

    }, [chosenImport, forceUpdate]);

    useEffect(() => {
        if (chosenImport) {
            axiosInstance.get('/imports/' + chosenImport.id + '/documents').then(
                (response) => {
                    console.log(response);
                    const data = response.data;
                    if (data.success === true) {
                        setDocuments(data.data);
                    }
                }
            ).catch(
                (error) => {
                    console.error("Error fetching import documents:", error);
                }
            )
        }
    }, [chosenImport, forceUpdate]);

    useEffect(() => {
        axiosInstance.get('/products').then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setProducts(data.data);
                    if (data.data.length > 0) {
                        setChosenProduct(data.data[0]);
                    }
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching products:", error);
            }
        )
    }, []);

    return (
        <>
            <Title title="Documents Page" subtitle="Manage your documents and imports here" />

            <Row>
                <Col md={8}>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Import ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Supplier name</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            myImports.map((imp) => (
                                <tr key={imp.id} className={chosenImport && chosenImport.id === imp.id ? 'table-primary' : ''}>
                                    <td>{imp.id}</td>
                                    <td>{new Date(imp.import_date).toLocaleDateString()}</td>
                                    <td>{imp.status}</td>
                                    <td>{imp.supplier ? imp.supplier.name : 'N/A'}</td>
                                    <td>{imp.total_value}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info me-2" onClick={() => {
                                            setChosenImport(imp);
                                        }}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col md={4}>
                    <h3>Insert new import</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSupplier">
                            <Form.Label column="lg">Supplier</Form.Label>
                            <Form.Select name="supplier_id"  onChange={handleChange} defaultValue={formData.supplier_id} >
                                {
                                    suppliers.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>

                        <button type="submit" className="btn btn-primary" onClick={addImport}>Add Import</button>
                    </Form>
                </Col>
            </Row>


            <Row>
                {
                    chosenImport && (
                        <>
                            <Col md={6}>
                                <h3>Import items</h3>

                                <Table hover responsive>
                                    <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Product name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        importItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.product ? item.product.name : 'N/A'}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                                <td>{item.price * item.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                                <hr/>
                                <h3>Add new item</h3>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formProduct">
                                        <Form.Label column="lg">Products</Form.Label>
                                        <Form.Select name="productId"  onChange={(e) => {
                                            const prodId = e.target.value;
                                            formData.product_id = prodId;
                                            const prod = products.find(p => p.id === parseInt(prodId));
                                            setChosenProduct(prod);
                                        }} defaultValue={formData.product_id} >
                                            {
                                                products.map((product) => (
                                                    <option key={product.id} value={product.id}>{product.name}({product.price})</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formQuantity">
                                        <Form.Label column="lg">Quantity</Form.Label>
                                        <Form.Control name="quantity" onChange={handleChange} type="number" placeholder="Enter quantity" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formUnitPrice">
                                        <Form.Label column="lg">Total Price</Form.Label>
                                        <Form.Control type="number" value={chosenProduct ? chosenProduct.price * formData.quantity : 0} readOnly />
                                    </Form.Group>

                                    <hr/>
                                    <button type="submit" className="btn btn-primary" onClick={
                                        addImportItem
                                    } >Add Item</button>


                                </Form>

                            </Col>
                            <Col md={6}>
                                <h3>Import documents</h3>
                                <Table hover responsive>
                                    <thead>
                                    <tr>
                                        <th>Document ID</th>
                                        <th>Document name</th>
                                        <th>Type</th>
                                        <th>View File</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        documents.map((doc) => (
                                            <tr key={doc.id}>
                                                <td>{doc.id}</td>
                                                <td>{doc.document_name}</td>
                                                <td>{doc.document_type}</td>
                                                <td><a href={doc.file_path} target="_blank" rel="noopener noreferrer">{doc.document_name}</a></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                                <hr/>
                                <h3>Add new document</h3>
                                <Form>

                                    <Form.Group className="mb-3" controlId="fomrDocumentName">
                                        <Form.Label column="lg">Document Name</Form.Label>
                                        <Form.Control name="document_name" onChange={handleChange} type="text" placeholder="Enter document name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="fomrDocumentType">
                                        <Form.Label column="lg">Document Type</Form.Label>
                                        <Form.Control name="document_type" onChange={handleChange} type="text" placeholder="Enter document type" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formFile">
                                        <Form.Label column="lg">Upload File</Form.Label>
                                        <Form.Control name="file" onChange={(e) => {
                                            setFile(e.target.files[0]);
                                        }} type="file" />
                                    </Form.Group>

                                    <hr/>
                                    <button type="submit" className="btn btn-primary" onClick={
                                        addImportDocument
                                    } >Add Document</button>


                                </Form>
                            </Col>
                        </>
                    )
                }
            </Row>
        </>
    );
};

export default Documents;

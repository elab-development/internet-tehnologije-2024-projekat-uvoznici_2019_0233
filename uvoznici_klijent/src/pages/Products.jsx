import React, {useEffect} from 'react';
import Title from "../components/Title";
import axiosInstance from "../logic/axiosInstance";
import {Row} from "react-bootstrap";

const Products = () => {

    const [categories, setCategories] = React.useState([]);
    const [chosenCategory, setChosenCategory] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const variants = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];


    useEffect(() => {
        axiosInstance.get('/products/categories').then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setCategories(data.data);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching categories:", error);
            }
        )
    }, []);

    useEffect(() => {
        axiosInstance.get('/products/search/?category=' + chosenCategory).then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    setProducts(data.data);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching products by category:", error);
            }
        )


    }, [chosenCategory]);


    return (
        <div>
            <Title title="Products" subtitle="You can search our products by category"/>

            <Row>
                <div className="search-container d-flex flex-wrap justify-content-center">
                    <div className="m-2">
                        <button
                            className={"btn btn-" + variants[Math.floor(Math.random() * variants.length)]}
                            onClick={() => setChosenCategory("")}
                        >
                            All Categories
                        </button>
                    </div>
                {
                    categories.map((category, index) => (
                        <div key={index} className="m-2">
                            <button
                                className={"btn btn-" + variants[Math.floor(Math.random() * variants.length)]}
                                onClick={() => setChosenCategory(category.category)}
                            >
                                {category.category}
                            </button>
                        </div>
                    ))
                }
                </div>
            </Row>

            <Row className="mb-5">
                <div className="products-container d-flex flex-wrap justify-content-center">
                    {
                        products.map((product) => (
                            <div key={product.id} className="card m-2" style={{width: '18rem'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                    <p className="card-text"><strong>Unit:</strong> {product.unit}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Row>

        </div>
    );
};

export default Products;

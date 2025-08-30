import React, {useEffect} from 'react';
import Title from "../components/Title";
import axiosInstance from "../logic/axiosInstance";
import {Col, Row} from "react-bootstrap";
import {Chart} from "react-google-charts";

const Home = () => {

    const [categoryChartData, setCategoryChartData] = React.useState([]);
    const [importChartData, setImportChartData] = React.useState([]);

    const [customsUsers, setCustomsUsers] = React.useState([]);

    const options = {
        title: "Products per Category",
    };

    const mapStatusToColor = {
        "pending": "#FF9800",
        "completed": "#4CAF50",
        "canceled": "#F44336"
    }

    useEffect(() => {
        axiosInstance.get('/products-per-category').then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.success === true) {
                    let chartData = [];
                    chartData.push([
                        "Category",
                        "Number of Products"
                    ]);

                    for (let i = 0; i < data.data.length; i++) {
                        chartData.push([
                            data.data[i].category,
                            data.data[i].total
                        ]);
                    }

                    setCategoryChartData(chartData);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching products per category:", error);
            }
        )
    }, []);

    useEffect(() => {
        axiosInstance.get('/imports-per-status').then(
            (response) => {

                let dataChart = [];
                dataChart.push([
                    "Status",
                    "Number of Imports",
                    { role: "style" }
                ]);

                console.log(response);
                const data = response.data;
                if (data.success === true) {

                    for (let i = 0; i < data.data.length; i++) {
                        dataChart.push([
                            data.data[i].status,
                            data.data[i].count,
                            mapStatusToColor[data.data[i].status] || "blue"
                        ]);
                    }

                    setImportChartData(dataChart);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching products per category:", error);
            }
        )
    }, []);

    useEffect(() => {
        //https://randomuser.me/api/?results=4
        axiosInstance.get('https://randomuser.me/api/?results=4').then(
            (response) => {
                console.log(response);
                const data = response.data;
                if (data.results) {
                    let results = data.results;
                    let users = [];

                    for (let i = 0; i < results.length; i++) {
                        users.push({
                            name: results[i].name.first + " " + results[i].name.last,
                            email: results[i].email,
                            phone: results[i].phone,
                            picture: results[i].picture.thumbnail
                        })
                    }

                    console.log(users);

                    setCustomsUsers(users);
                }
            }
        ).catch(
            (error) => {
                console.error("Error fetching random users:", error);
            }
        )
    }, []);


    return (
        <div>
            <Title title="Welcome" subtitle="Here you can dive deep into world of suppliers and imports. Hope you find it well!"/>
            <Row>
                <Col md={6}>
                    <Chart
                        chartType="PieChart"
                        data={categoryChartData}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                    />
                </Col>
                <Col md={6}>
                    <Chart chartType="ColumnChart" width="100%" height="100%" data={importChartData} />
                </Col>
            </Row>

            <Row>
                <Col md={12} className="mt-5">
                    <h3>Black list of custom workers</h3>
                </Col>
                {
                    customsUsers.length > 0 && (
                        <>
                            {
                                customsUsers.map((user, index) => (
                                    <Col md={3} key={index}>
                                        <div className="card">
                                            <div className="card-body text-center">
                                                <img src={user.picture} alt="User" className="rounded-circle mb-3" />
                                                <h5 className="card-title">{user.name}</h5>
                                                <p className="card-text">{user.email}</p>
                                                <p className="card-text">{user.phone}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            }
                        </>
                    )
                }
            </Row>
        </div>
    );
};

export default Home;

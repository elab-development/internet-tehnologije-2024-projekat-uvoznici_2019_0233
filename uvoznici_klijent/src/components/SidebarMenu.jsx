import React from 'react';
import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {BiBot, BiChart, BiFile, BiHome, BiScan, BiSolidTruck, BiStar} from "react-icons/bi";
import {GiBigGear} from "react-icons/gi";

const SidebarMenu = () => {

    const token = window.sessionStorage.getItem('token');

    const user = token ? JSON.parse(window.sessionStorage.getItem('user')) : null;

    const admin = user ? user.role === 'admin' : false;

    return (
        <>
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/"/>}> <BiHome /> Home</MenuItem>
                    <MenuItem component={<Link to="/suppliers" />}> <BiSolidTruck/> Suppliers</MenuItem>
                    <MenuItem component={<Link to="/products" />}> <BiStar/>  Products</MenuItem>
                    {
                        token && (
                            <>
                                <MenuItem component={<Link to="/documents" />}> <BiFile/> Documents</MenuItem>
                                <MenuItem component={<Link to="/chat" />}> <BiBot /> Chat bot</MenuItem>
                            </>
                        )
                    }

                    {
                        admin && (
                            <MenuItem component={<Link to="/admin" />}> <BiChart /> Admin</MenuItem>
                        )
                    }

                    {
                        token && (
                            <>
                                <MenuItem component={
                                    <Link to="/admin"  onClick={
                                        (e) => {
                                            e.preventDefault();
                                            window.sessionStorage.removeItem('token');
                                            window.sessionStorage.removeItem('user');
                                            window.location.href = '/';
                                        }
                                    } />
                                }><GiBigGear/> Logout</MenuItem>
                            </>
                        )
                    }

                    {
                        !token && (
                            <MenuItem component={<Link to="/login" />}><BiScan/> Login</MenuItem>
                        )
                    }
                </Menu>

                <div className="sidebar-footer">
                    {
                        user && (
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                            </div>
                        )
                    }
                </div>
            </Sidebar>
        </>
    );
};

export default SidebarMenu;

import React from 'react';
import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {BiBot, BiFile, BiHome, BiSolidTruck, BiStar} from "react-icons/bi";

const SidebarMenu = () => {
    return (
        <>
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/"/>}> <BiHome /> Home</MenuItem>
                    <MenuItem component={<Link to="/suppliers" />}> <BiSolidTruck/> Suppliers</MenuItem>
                    <MenuItem component={<Link to="/products" />}> <BiStar/>  Products</MenuItem>
                    <MenuItem component={<Link to="/documents" />}> <BiFile/> Documents</MenuItem>
                    <MenuItem component={<Link to="/chat" />}> <BiBot /> Chat bot</MenuItem>
                </Menu>
            </Sidebar>
        </>
    );
};

export default SidebarMenu;

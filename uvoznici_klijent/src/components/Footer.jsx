import React from 'react';
import {BiLock} from "react-icons/bi";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="col-md-12 text-center">
                    <p>&copy; {new Date().getFullYear()} BrVar <BiLock/>. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;

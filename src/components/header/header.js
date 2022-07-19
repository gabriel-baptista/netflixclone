import React from "react";
import './header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://raw.githubusercontent.com/gustavo-nt/netflix-clone/master/public/logo.png" />
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
                </a>
            </div>
        </header>
    );
}
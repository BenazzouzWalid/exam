import React from "react";
import trollFace from '../images/Troll Face.png'

export default function Header() {
    return (
    <header className="header--container">
        <img src={trollFace} alt="troll-face" className="header--logo" />
        <h2 className="header--title">Meme Generator</h2>
    </header>
    )
}
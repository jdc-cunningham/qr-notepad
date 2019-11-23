import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Register.scss';

function Register(props) {
    return (
        <div className="QRNotepad__registration">
            <form>
                <input type="text" placeholder="username" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="email" />
            </form>
        </div>
    )
}

export default Register;
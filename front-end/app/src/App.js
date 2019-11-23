import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './css-reset.css';
import QRScanner from './pages/qr-scanner/QRScanner';

function QRNotepad() {
    return (
        <Router>
            <Route exact path="/" />
            <Route exact path="/qr-scanner" component={QRScanner} />
            <Route exact path="/welcome" />
        </Router>
    );
}

export default QRNotepad;

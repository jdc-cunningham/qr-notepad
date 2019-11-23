import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './QRScanner.scss';
import QrcodeDecoder from 'qrcode-decoder';

function QRScanner(props) {
    const qr = new QrcodeDecoder();

    const qrCallback = (videoElement) => {
        qr.decodeFromVideo(videoElement)
        .then((res) => {
            if (res.data && res.data.length) {
                const qrNotePath = "/user/" + res.data;
                qr.stop();
                // return (<Redirect to={qrNotePath} />); // doesn't redirect
                props.history.push(qrNotePath, {some: 'state'});
            } else {
                alert('Failed to scan QR code');
            }
        })
        .catch((err) => {
            alert('Failed to scan QR code'); // I don't know when this happens/haven't been able to trigger it
        });
    };

    // this needs file upload to work
    const decodeFromImage = (img) => {
        qr.decodeFromImage(img)
            .then((res) => {

            })
            .catch((err) => {
                alert("Failed to decode QR from file");
            });
    };

    // yikes
    const QRScannerInput = <>
        <h2 className="QRNotepad__qr-scanner-title">Scan QR Code</h2>
        <video id="QRNotepad__video-playback" />
        {// this needs file upload to work
        /* <h3 className="QRNotepad__qr-scanner-or">- OR -</h3>
        <label htmlFor="QRNotepad__file-upload">Upload File</label>
        <input id="QRNotepad__file-upload" type="file" /> */}
    </>;

    const videoStream = () => {
        const constraints = { audio: false, video: 480, height: 320 };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((mediaStream) => {
                const video = document.getElementById('QRNotepad__video-playback'); // not reacty
                // video.src = mediaStream;
                video.srcObject = mediaStream;
                console.log('ran');
                video.onloadedmetadata = (e) => {
                    // video.onplay();
                    console.log(e);
                }
                video.onloadeddata = () => {
                    qrCallback(video);
                };
                video.play();
            })
            .catch((err) => {
                console.log(err); 
            });
    };

    useEffect(() => {
        console.log('called');
        videoStream();
    }, []); // empty array component did mount

    return (
        <div className="QRNotepad__qr-scanner">
            {QRScannerInput}
        </div>
    );
}

export default QRScanner;

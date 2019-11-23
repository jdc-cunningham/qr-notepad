import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './QRScanner.scss';
import QrcodeDecoder from 'qrcode-decoder';

function QRScanner() {
    const qr = new QrcodeDecoder();

    const qrCallback = (videoElement) => {
        qr.decodeFromVideo(videoElement).then((res) => {
            console.log(res); // has data
        })
        .catch((err) => {
           console.log(err); 
        });
    };

    const QRScannerInput = <video id="QRNotepad__video-playback" />;

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
                    qrCallback(video);
                }
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

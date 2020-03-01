import React, { useState, useEffect } from 'react';
import { NavBar, InputItem } from 'antd-mobile';

export default () => {
    let canvasElement: HTMLCanvasElement | null;
    let videoElement: HTMLVideoElement | null;

    if (!navigator.mediaDevices) {
        return <div>
            请使用Chrome 等浏览器获取更好的体验效果
        </div>
    }
    const [word, setWord] = useState("我");
    const videoPort = 375;
    const [size, setSize] = useState(200);
    const fontFamily = localStorage.getItem("setting.font-family");
    useEffect(() => {
        let videoInput: MediaStream | null;
        if (videoElement) {
            navigator.mediaDevices.enumerateDevices()
                .then(devices => devices.filter(({ kind }) => kind === "videoinput")[0])
                .then(({ deviceId }) => {
                    return navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            deviceId,
                            width: 500,
                            height: 500
                        }
                    })
                }).then(stream => {
                    videoInput = stream
                    if (videoElement && canvasElement) {
                        videoElement.srcObject = stream;
                        const ctx = canvasElement.getContext("2d");
                        if (ctx) {
                            const drawFrame = () => {
                                // if (videoElement) {
                                ctx.clearRect(0, 0, videoPort, videoPort);
                                //     ctx.drawImage(videoElement, 0, 0, videoPort, videoPort)
                                // }
                                const start = (videoPort - size) / 2;
                                const center = videoPort / 2;
                                const end = videoPort - start;
                                ctx.fillStyle = "rgba(40, 40, 40, 0.6)";
                                ctx.fillRect(0, 0, videoPort, videoPort);
                                ctx.clearRect(start, start, size - 2, size - 2);
                                ctx.strokeStyle = "#666666";
                                ctx.strokeRect(start, start, size - 2, size - 2);

                                ctx.strokeStyle = "#666666";
                                ctx.setLineDash([size / 40, size / 40])
                                // ctx.strokeRect(size / 4, size / 4, size / 2, size / 2);
                                // 横中线
                                ctx.moveTo(center, start);
                                ctx.lineTo(center, end);
                                // 竖中线 
                                ctx.moveTo(start, center);
                                ctx.lineTo(end, center);
                                ctx.stroke();

                                ctx.strokeStyle = "#999999";
                                // ctx.setLineDash([size / 40, size / 40])
                                // 右斜线
                                ctx.moveTo(start, start);
                                ctx.lineTo(end, end);
                                // 左斜线
                                ctx.moveTo(start, end);
                                ctx.lineTo(end, start);
                                ctx.stroke();

                                ctx.setLineDash([0, 0]);
                                ctx.textAlign = "center"
                                ctx.textBaseline = "middle"
                                // ctx.fillStyle = "text-shadow: 1px 1px #000,-1px -1px #000, 1px -1px #000, -1px 1px #000; "
                                ctx.font = size * 0.7 + "px " + fontFamily;
                                ctx.strokeStyle = "red";
                                ctx.strokeText(word, videoPort / 2, videoPort / 2 * 1.09);
                                requestAnimationFrame(drawFrame);
                            }
                            drawFrame();
                        }
                    }
                });
        }
        return () => {
            if (videoInput) {
                videoInput.getVideoTracks()[0].stop();
            }
        }
    })
    return (<div>
        <NavBar>实用性功能，有问题请微信群反馈</NavBar>
        <InputItem
            defaultValue={word}
            onChange={(value) => setWord(value ? value[0] : "")}
        />
        <div
            style={{ position: "relative" }}
        >
            <video
                autoPlay={true}
                style={{
                    // display: "none",
                    width: "100%"
                }}
                ref={(video) => {
                    videoElement = video;
                }} />
            <canvas
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
                id="myCanvas" width={videoPort} height={videoPort}
                ref={(canvas) => {
                    canvasElement = canvas;
                }} />

        </div>

    </div >)
}
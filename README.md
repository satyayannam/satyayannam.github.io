<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Combined HTML, CSS, and JS</title>
    <style>
        @import url(https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap);
        body {
            width: 100vw;
            height: 100vh;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: black;
            overflow: hidden;
        }
        .card, .content {
            overflow: hidden;
        }
        .card {
            width: 1280px;
            height: 720px;
            margin: 0;
            justify-content: center;
        }
        .content {
            width: 1000px;
            height: 562px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 40px;
            animation: 200s linear infinite brightness;
        }
        .backgroundImage, .boyImage {
            position: absolute;
            width: 1000px;
        }
        .boyImage {
            z-index: 2;
            animation: 200s linear infinite blur;
        }
        .container {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container-full {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            transform: scale(1);
            animation: 200s linear infinite zoom-in;
        }
        .cube {
            position: relative;
            transform-style: preserve-3d;
            perspective: 480px;
            perspective-origin: 51% 70%;
        }
        .face {
            position: absolute;
            width: 870px;
            height: 190px;
            background: 0 0;
            border: 0 solid #000;
            opacity: 0.5;
        }
        .hue {
            top: 0;
            left: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            mix-blend-mode: overlay;
            background: radial-gradient(ellipse at center, #1e5799 0, #7db9e8 100%);
            opacity: 1;
            animation: 8s infinite filter-animation;
        }
        @keyframes brightness { 0% { filter: brightness(1) contrast(1); } 100% { filter: brightness(0.8) contrast(1.3); } }
        @keyframes blur { 0% { filter: blur(0px); } 100% { filter: blur(3px); } }
        @keyframes filter-animation { 0%, 100% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(100deg); } }
        @keyframes zoom-in { 0% { transform: scale(1); } 100% { transform: scale(2.5); } }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="container-full">
            <div class="animated hue"></div>
            <img class="backgroundImage" src="https://drive.google.com/thumbnail?id=1_ZMV_LcmUXLsRokuz6WXGyN9zVCGfAHp&sz=w1920">
            <img class="boyImage" src="https://drive.google.com/thumbnail?id=1eGqJskQQgBJ67myGekmo4YfIVI3lfDTm&sz=w1920">
            <div class="container">
                <div class="cube">
                    <div class="face top"></div>
                    <div class="face bottom"></div>
                    <div class="face left text"></div>
                    <div class="face right text"></div>
                    <div class="face front"></div>
                    <div class="face back text"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    const kiplingPoem = `<p>If you can <span>keep</span> your head when all about you Are <span>losing</span> theirs and <span>blaming</span> it on you... -Rudyard Kipling</p>`;
    function insertPoemIntoDivs() {
        document.querySelectorAll(".text").forEach(div => div.innerHTML = kiplingPoem);
    }
    document.addEventListener("DOMContentLoaded", insertPoemIntoDivs);
    const contentDiv = document.querySelector(".content");
    function adjustContentSize() {
        const viewportWidth = window.innerWidth;
        const scaleFactor = viewportWidth < 1000 ? (viewportWidth / 1000) * 0.8 : 1;
        contentDiv.style.transform = `scale(${scaleFactor})`;
    }
    window.addEventListener("load", adjustContentSize);
    window.addEventListener("resize", adjustContentSize);
</script>
</body>
</html>


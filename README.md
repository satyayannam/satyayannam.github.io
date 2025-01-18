<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Nested Divs</title>
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #000;
            container-type: inline-size;
        }

        div {
            aspect-ratio: 1;
            background: var(--bg, #464167);
            border-radius: 50%;
            overflow: clip;
            width: var(--w, 100cqi);
        }

        div[style] {
            animation: rotate var(--t, 3s) cubic-bezier(0.45, -0.35, 0.35, 1.35) infinite;
            offset-anchor: 50% 0%;
            offset-path: content-box;
        }

        @keyframes rotate {
            to {
                offset-distance: 100%;
            }
        }
    </style>
</head>
<body>
    <div style="--w:90cqi;--bg:#d94527;--t:8.1s">
        <div style="--w:80cqi;--bg:#f5a845;--t:7.3s">
            <div style="--w:70cqi;--bg:#24a482;--t:6.7s">
                <div style="--w:60cqi;--bg:#756c8c;--t:5.9s">
                    <div style="--w:50cqi;--bg:#d6c2af;--t:5.3s">
                        <div style="--w:40cqi;--bg:#464167;--t:4.7s">
                            <div style="--w:30cqi;--bg:#e17b5f;--t:4.1s">
                                <div style="--w:20cqi;--bg:#3c8d7c;--t:3.7s">
                                    <div style="--w:15cqi;--bg:#cb8e6e;--t:3.1s">
                                        <div style="--w:10cqi;--bg:#8b557d;--t:2.9s">
                                            <div style="--w:7cqi;--bg:#b84d38;--t:2.3s">
                                                <div style="--w:5cqi;--bg:#1d7a61;--t:1.9s">
                                                    <div style="--w:3cqi;--bg:#9c8576;--t:1.7s">
                                                        <div style="--w:2cqi;--bg:#e3935c;--t:1.3s">
                                                            <div style="--w:1cqi;--bg:#5d5678;--t:1.1s"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

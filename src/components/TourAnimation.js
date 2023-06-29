import React, { useRef, useEffect } from 'react';
import { Application, Sprite, Texture } from 'pixi.js';
import star1 from "./star1.png";
import star2 from "./star2.png";
import star3 from "./star3.png";
import girl1 from "./girl.jpg";
import girl2 from "./girl2.jpg";
import girl3 from "./girl3.jpg";

const InteractiveAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const app = new Application({
            // width: window.innerWidth,
            // height: window.innerHeight,
            view: canvasRef.current,
            transparent: true,
        });

        const frameUrls = [
            // Add the URLs of your online photos as frames
            girl1, girl2, girl3
            // Add more URLs for additional frames
        ];

        const spriteTextures = frameUrls.map((url) => Texture.from(url));

        const sprite = new Sprite(spriteTextures[0]);
        sprite.anchor.set(0.5);
        sprite.x = app.screen.width / 2;
        sprite.y = app.screen.height / 2;

        sprite.interactive = true;
        sprite.buttonMode = true;

        let currentFrame = 0;

        sprite.on('pointerdown', () => {
            currentFrame = (currentFrame + 1) % spriteTextures.length;
            sprite.texture = spriteTextures[currentFrame];
        });

        app.stage.addChild(sprite);
        app.render();

        return () => {
            app.destroy();
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default InteractiveAnimation;

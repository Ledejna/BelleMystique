import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import star1 from "./star1.png";
import star2 from "./star2.png";
import star3 from "./star3.png";

const StarAnimation = () => {
  const starRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight * 0.5,
      transparent: true,
    });

    const container = new PIXI.Container();
    app.stage.addChild(container);

    const stars = [];

    const generateStar = () => {
      const star = new PIXI.Graphics();
      star.beginFill(0xffffff);

      const starPoints = [];
      const angleIncrement = (Math.PI * 2) / 10;
      let angle = -Math.PI / 2;

      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? 10 : 5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        starPoints.push(new PIXI.Point(x, y));
        angle += angleIncrement;
      }

      star.drawPolygon(starPoints);
      star.endFill();
      star.x = Math.random() * app.renderer.width;
      star.y = Math.random() * app.renderer.height;
      star.alpha = Math.random();
      star.scale.set(Math.random() * 0.5 + 0.1);
      container.addChild(star);
      stars.push(star);
    };

    for (let i = 0; i < 200; i++) {
      generateStar();
    }

    const starTextures = [
      PIXI.Texture.from(star1),
      PIXI.Texture.from(star2),
      PIXI.Texture.from(star3),
    ];

    const starLogoSprite = new PIXI.AnimatedSprite(starTextures);
    starLogoSprite.anchor.set(0.5);
    starLogoSprite.x = app.renderer.width / 2;
    starLogoSprite.y = app.renderer.height / 2;
    starLogoSprite.animationSpeed = 0.03;
    starLogoSprite.play();
    container.addChild(starLogoSprite);

    const textStyle = new PIXI.TextStyle({
      fontFamily: "Roboto",
      fontSize: 50,
      fontWeight: "bold",
      fill: ["#ffffff"],
      stroke: "#000000",
      strokeThickness: 7,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    const belleMystiqueText = new PIXI.Text("Belle Mystique", textStyle);
    belleMystiqueText.anchor.set(0.5);
    belleMystiqueText.x = app.renderer.width / 2;
    belleMystiqueText.y = app.renderer.height / 2 + 140;
    belleMystiqueText.alpha = 0.08;
    container.addChild(belleMystiqueText);

    const animateText = () => {
      belleMystiqueText.scale.x += 0.001;
      belleMystiqueText.scale.y += 0.001;

      if (belleMystiqueText.scale.x >= 1.2) {
        belleMystiqueText.scale.x = 1;
        belleMystiqueText.scale.y = 1;
      }

      if (belleMystiqueText.alpha < 1) {
        belleMystiqueText.alpha += 0.001;
      } else {
        belleMystiqueText.alpha -= 0.001;
      }
    };

    app.ticker.add(() => {
      stars.forEach((star) => {
        star.rotation += 0.005;
      });

      animateText();
    });

    if (starRef.current) {
      starRef.current.appendChild(app.view);
    }

    return () => {
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, []);

  return <div ref={starRef} />;
};

export default StarAnimation;

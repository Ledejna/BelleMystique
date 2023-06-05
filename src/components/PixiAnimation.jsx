import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Loader } from '@pixi/loaders';

const PixiAnimation = () => {
  useEffect(() => {
    // Create a PixiJS application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000, // Set background color (black in this case)
    });

    // Add the PixiJS canvas to the HTML document
    document.body.appendChild(app.view);

    const loader = new Loader();

    // Load the star image
    loader.add('star', '../assets/Images/star.png');
    loader.load(setup);

    function setup() {
      // Create the star sprite
      const star = new PIXI.Sprite(PIXI.Loader.shared.resources.star.texture);
      star.anchor.set(0.5); // Set the anchor point to the center of the star
      star.x = app.screen.width / 2;
      star.y = app.screen.height / 2;
      star.tint = 0xC0C0C0; // Set the silver color (hex code)

      // Create the text
      const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 48,
        fill: 'white',
      });
      const text = new PIXI.Text('Belle Mystique', style);
      text.anchor.set(0.5);
      text.x = app.screen.width / 2;
      text.y = app.screen.height / 2;

      // Add the star and text to the stage
      app.stage.addChild(star, text);

      // Animation variables
      let rotationSpeed = 0.01;
      let scaleDirection = 1;
      let scaleSpeed = 0.005;

      // Animation loop
      app.ticker.add(() => {
        // Rotate the star
        star.rotation += rotationSpeed;

        // Scale the star
        star.scale.x += scaleDirection * scaleSpeed;
        star.scale.y += scaleDirection * scaleSpeed;

        // Reverse the scale direction when reaching the limits
        if (star.scale.x >= 1.2 || star.scale.x <= 0.8) {
          scaleDirection *= -1;
        }
      });
    }
  }, []);

  return <div id="pixi-container" />;
};

export default PixiAnimation;

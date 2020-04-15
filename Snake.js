'use strict';

import Rectangle from "Rectangle.js";

 class Snake
{
    constructor(context)
    {
        this.context=context;
        this.body=[new Rectangle(0,0,10,10)];
        this.direction="none";
    }

    Draw()
    {
        this.context.clearRect(0,0,this.context.clientHeight,this.context.clientwidth);
        this.body.forEach(element => {
            this.context.fillRect(element.x,element.y,element.w,element.h);
        });
    }
}



export {Snake};
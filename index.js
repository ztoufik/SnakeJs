'use strict';


class Rectangle
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
        this.h=5;
        this.w=5;
    }

    Draw(context)
    {
        context.strokeRect(this.x,this.y,this.w,this.h);
        context.fillStyle="rgb(255,255,255)";
        context.fillRect(this.x+1,this.y+1,this.w-1,this.h-1);
    }
}

class Board
{
    constructor(canvas)
    {
        this.canvas=canvas;
        this.context=canvas.getContext("2d");
        this.context.save();
        this.context.translate(0,canvas.height);
        this.context.scale(1,-1);    
    }

    register()
    {
        this._food=new Rectangle(100,100);
        this._snake=new Snake(this);

        this.canvas.addEventListener("keydown",(e)=>
        {
            switch(e.keyCode){
                case 37: this._snake.Moveleft();break;
                case 38: this._snake.MoveUp();break;
                case 39: this._snake.MoveRight();break;
                case 40: this._snake.MoveDown();break;
                default: ;
            }
        });


    }

    draw()
    {
        this._snake.Draw();
        this._food.draw(this.context);
    }

    update()
    {
        context.clearRect(0,0,canvas.width,canvas.height);

        if(this._food.rect.x===this._snake.body[0].x 
            && this._food.rect.y===this._snake.body[0].y)
            {
             console.log("food is eaten");
             this._snake.Eat();
             this._food=new Rectangle(120,120);
             }
        else
        {
            this.draw();
        }
    }

}

class Snake
{
    constructor(board)
    {
        this.keypressflag=true;
        this.timestamp=200;
        this.board=board;
        this.body=[new Rectangle(5,0),new Rectangle(0,0)];
        this.direction="right";
        this.xinc=5;
        this.yinc=0;
    }

    Draw()
    {
        this.body.forEach((element,index) => {
            element.Draw(this.board.context);
        });
    }

    Eat()
    {
        let x=this.body[this.body.length-1].x;
        let y=this.body[this.body.length-1].y;
        this.body.push(new Rectangle(x,y));
    }

    Move()
    {

        if(this.direction!=="none")
        {
            this.keypressflag=false;

            for(let index=this.body.length-1;index>0;index--)
            {
                this.body[index].x=this.body[index-1].x;
                this.body[index].y=this.body[index-1].y;
            }

            this.body[0].x+=this.xinc;
            this.body[0].y+=this.yinc;

            if(this.body[0].x<0 || (this.body[0].x+this.body[0].w)>this.board.canvas.width 
                || this.body[0].y<0 || (this.body[0].y+this.board.body[0].h)>this.board.canvas.height)
            {
                confirm("border colision");
            }

            if(this.body.slice(1).some((element)=>element.x===this.body[0].x && element.y===this.body[0].y))
            {
                //confirm("self colision ");
                console.log("self coalision");
            }
        }
    }

    MoveUp()
    {
       if(!this.keypressflag)
       {
           this.keypressflag=true;
        if(this.direction!=="up"  && this.direction!=="down")
        {
             this.direction="up";
             this.xinc=0;
             this.yinc=5;
        }
       }

    }

    MoveDown()
    {
        if(!this.keypressflag)
        {
            this.keypressflag=true;
            
            if(this.direction!=="up" && this.direction!=="down")
                {
                    this.direction="down";
                    this.xinc=0;
                    this.yinc=-5;
                }
        }
       

    }

    MoveRight()
    {
       if(!this.keypressflag)
       {
           this.keypressflag=true;
           if(this.direction!=="right" && this.direction!=="left")
            {
                this.direction="right";
                this.xinc=5;
                this.yinc=0;
            }
       }

    }

    Moveleft()
    {
        if(!this.keypressflag)
        {
            this.keypressflag=true;

            if(this.direction!=="right" && this.direction!=="left")
                {
                    this.direction="left";
                    this.xinc=-5;
                    this.yinc=0;
                }
        }
       

    }
}

const canvas=document.getElementById("htmlcanvas");
const context=canvas.getContext("2d");



window.setInterval(()=>{
    
},sn.timestamp);



 
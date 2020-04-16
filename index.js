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

    draw(context)
    {
        context.strokeRect(this.x,this.y,this.w,this.h);
        context.fillStyle="rgb(0,190,0)";
        context.fillRect(this.x+1,this.y+1,this.w-1,this.h-1);
    }
}

class Board
{
    constructor(canvas)
    {
        this.canvas=canvas;
        this.score=0;
        this.context=canvas.getContext("2d");
        this.timestamp=200;
        this.context.save();
        this.context.translate(0,canvas.height);
        this.context.scale(1,-1);    
    }

    register()
    {
        this._food=new Rectangle(100,100);
        this._snake=new Snake(this);
        this.canvas.focus(null);
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

    generaterandomfood()
    {
        const pxres=5;
        const width=Math.floor(this.canvas.width/pxres)-this._food.w;
        const height=Math.floor(this.canvas.height/pxres)-this._food.h;

        let x=0;
        let y=0;
        do
        {
            x=Math.floor(Math.random()*width)*pxres;
            y=Math.floor(Math.random()*height)*pxres;
        }while(this._snake.body.some((e)=>{return e.x===x && e.y===y;}))

        return new Rectangle(x,y);
    }

    ColitionDetection() {
        if (this._snake.body[0].x < 0 || (this._snake.body[0].x + this._snake.body[0].w) > this._snake.board.canvas.width
            || this._snake.body[0].y < 0 || (this._snake.body[0].y + this._snake.body[0].h) > this._snake.board.canvas.height
            || this._snake.body.slice(1).some((element) => 
            element.x === this._snake.body[0].x && element.y === this._snake.body[0].y))
           {
            alert("you failed");
           this.reset();
           }
    }

    update()
    {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ColitionDetection();
        if(this._food.x===this._snake.body[0].x 
            && this._food.y===this._snake.body[0].y)
            {
             this._snake.Eat();
             this.score++;
             this.timestamp-=3;
             this._food=this.generaterandomfood();
             }
        this._snake.Move();
    
        this.draw();        
    }

    reset()
    {
        this.score=0;
        this._snake=new Snake(this);
    }
}

class Snake
{
    constructor(board)
    {
        this.keypressflag=true;
        this.board=board;
        this.body=[new Rectangle(5,0),new Rectangle(0,0)];
        this.direction="right";
        this.xinc=5;
        this.yinc=0;
    }

    Draw()
    {
        this.body.forEach((element,index) => {
            element.draw(this.board.context);
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
const score=document.getElementById("score");
const board=new Board(canvas);

board.register();

const GameUpdate=()=> {
  //  window.clearInterval();
    board.update();
    score.innerText=board.score.toString();
     window.setTimeout(()=>{
     GameUpdate();
     },board.timestamp);
}

window.setTimeout(()=>{
    GameUpdate();
},board.timestamp);



 
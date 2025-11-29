const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
canvas.style.backgroundColor = "black";
console.log(canvas);

// ctx.fillStyle = "red";
// ctx.fillRect(100, 150, 200, 150);
// ctx.lineWidth = 10;
// ctx.strokeStyle = "blue";
// ctx.strokeRect(100, 150, 200,150);




// ctx.lineWidth = 10;
// ctx.strokeStyle = "red";
// ctx.beginPath();
// ctx.moveTo(300, 300);
// ctx.lineTo(300, 400)
// ctx.stroke();


//ctx.lineWidth = 10;
//ctx.strokeStyle = "magenta";

class Line {
        constructor(canvas){

            this.canvas = canvas;
            this.x = Math.random() * this.canvas.Width;
            this.y = Math.random() * this.canvas.Height;
           
            this.history = [
                {
                    x: this.x,
                    y: this.y
                }
            ];

            this.lineWidth = Math.floor(Math.random() * 15 + 1);
            this.hue = Math.floor(Math.random() * 360);
            this.maxLength = 4;
}
draw(context){

    context.strokeStyle = "hsl( "+ this.hue + ", 100%, 50%)";
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    
    for(let i = 0; i < this.history.length; i++){
    context.lineTo(this.history[i].x, this.history[i].y);
    }

context.stroke();

  }

 update(){

     this.x = Math.random() * this.canvas.width;
     this.y = Math.random() * this.canvas.height;
     this.history.push({x: this.x, y: this.y});
     if(this.history.length > this.maxLength){
     this.history.shift();
     }
 }
}

const linesArray = [];
const numberOfLines = 1;
for(let i = 0; i < numberOfLines; i ++){
   linesArray.push(new Line(canvas));
}



function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesArray.forEach(line => line.draw(ctx));
    //update line
    linesArray.forEach(line => line.update());

    requestAnimationFrame(animate);
    console.log("animating");
}

animate();

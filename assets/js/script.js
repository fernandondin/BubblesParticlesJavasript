const random = (n, m) =>  {
 return Math.floor(Math.random() * (m - n) + n);
};
var circulos =[];
window.addEventListener('mousemove',function(event){
 if(random(0,100)%2==0){

 var radio = random(5,30);
 var dy = 2;
 var dx = random(-1,2);
 circulos.push(new Circulo(event.x,event.y,radio,dx,dy,random(0,255),random(0,255),random(0,255)));
}
})
const canvas = document.querySelector('canvas') // Grab canvas from DOM
canvas.width = window.innerWidth // Set canvas' width to full width of window
canvas.height = window.innerHeight
const c = canvas.getContext('2d') // Get context to access 2D canvas functions
c.globalCompositeOperation='destination-over';

function Circulo (x,y,radio,dx,dy,r,g,b){
 this.x=x;
 this.y=y;
 this.dx=dx;
 this.dy=dy;
 this.radio=radio;
 this.r=r;
 this.g=g;
 this.b=b

 this.dibuja = function(){
   c.beginPath();
   c.fillStyle = 'rgba('+this.r+','+this.g+','+this.b+', 0.5'
   c.arc(this.x,this.y, this.radio, 0, 2 * Math.PI);
   c.fill();
 }
 this.actualiza = function(){
   if(this.x +this.radio >innerWidth || this.x-this.radio < 0){
     this.dx*=-1;
   }
   this.y-=this.dy;
   this.x-=this.dx;
   this.dibuja();
 }
}

var maxBurbujas = 500;
var nBurbujas = 200;
for (var i = 0; i < nBurbujas; i++) {
 var radio = random(5,30);
 var x = random(0,innerWidth+radio);
 if(x+radio>innerWidth){
   x-=80;
 }else if(x-radio<=0){
   x+=80;
 }
 var y = random(innerHeight+40,5000);;
 var dy = 2;
 var dx = random(-1,2);
 circulos.push(new Circulo(x,y,radio,dx,dy,random(0,255),random(0,255),random(0,255)));
}
function anima(){
 requestAnimationFrame(anima);
 c.clearRect(0,0,innerWidth,innerHeight);
 if(circulos.length>maxBurbujas){
     circulos.shift();
 }
 for (var i = 0; i < circulos.length; i++) {
   circulos[i].actualiza();
   if(circulos[i].y<-50){
     circulos[i].y=random(innerHeight+40,5000);
   }
 }
}

anima();

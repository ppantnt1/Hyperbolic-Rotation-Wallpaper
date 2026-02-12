ele=[]
shp=[]
shp2=[]
function drawShape(color,r,n,m,off,pos){
    ctx.beginPath()
    ctx.strokeStyle=color
    ctx.lineWidth=1.5
    ctx.moveTo(pos[0]+960+r*Math.sin(off),
        pos[1]+540+r*Math.cos(off));
    for(var i=0;i<n+1;i++){
        ctx.lineTo(pos[0]+960+r*Math.sin(2*Math.PI*m*i/n+off),
            pos[1]+540+r*Math.cos(2*Math.PI*m*i/n+off));
    }
    ctx.stroke();
}
for(var i=-150;i<=150;i++){
    for(var  j=-150;j<=150;j++){
        ele.push([40*i+20*j,20*Math.sqrt(3)*j]);
        if(i==0&&j==0){
            shp.push(-1)
            shp2.push(-1)
        }
        else{
            shp.push(Math.round((2*i+j)**2-3*j**2));
            shp2.push((2*i+j)>Math.sqrt(3)*j);
        }
        //ele.push([100*i,100*j]);
    }
}
console.log(shp);
var ht=0,ct=.25,rt=0;
const rr=100;
var s=7;
var then=Date.now();
window.onload=function(){
    requestAnimationFrame(mainloop2);
};
function mainloop(){}
function mainloop2(){
    var nowt=Date.now();
    var dt=(nowt-then)/1000;

    var step=2;
    clearScreen();
    /*for(var e in ele){
        ele[e]=[Math.cosh(c/fps)*ele[e][0]+Math.sinh(c/fps)*ele[e][1],
            Math.sinh(c/fps)*ele[e][0]+Math.cosh(c/fps)*ele[e][1]];
        drawCircle("#FFF",10,ele[e]);
    }*/
    //console.log(dt);
    ht+=.3*dt;
    const hperiod=Math.asinh(Math.sqrt(3));
    ct+=.005*dt;
    const cperiod=-2*Math.PI;
    rt+=.02*dt;
    const rperiod=2*Math.PI;
    if(ct>1){
        console.log("Resetted ct")
        ct-=1;
    }
    if(ht>1){
        console.log("Resetted ht")
        ht-=1;
    }
    for(var e in ele){
        var tpos=ele[e];
        tpos=[Math.cosh(ht*hperiod)*tpos[0]+Math.sinh(ht*hperiod)*tpos[1],
                    Math.sinh(ht*hperiod)*tpos[0]+Math.cosh(ht*hperiod)*tpos[1]];
        tpos=[Math.cos(ct*cperiod)*tpos[0]-Math.sin(ct*cperiod)*tpos[1],
                    Math.sin(ct*cperiod)*tpos[0]+Math.cos(ct*cperiod)*tpos[1]];
        tpos=[tpos[0]+rr*Math.cos(rt*rperiod),tpos[1]+rr*Math.sin(rt*rperiod)];
        if(Math.abs(tpos[0])>1100||Math.abs(tpos[1])>600)
            continue;
        if(shp[e]!=-1){
            switch((s+Math.floor((shp[e]^(shp[e]*3)+shp2[e]))%s)%s){
                case 0:
                    drawCircle("#F00",8,tpos);
                    break;
                case 1:
                    drawShape("#0F0",8,4,1,Math.PI/4,tpos);
                    break;
                case 2:
                    drawShape("#00F",8,5,2,Math.PI,tpos);
                    break;
                case 3:
                    drawShape("#FF0",8,5,1,Math.PI,tpos);
                    break;
                case 4:
                    drawShape("#F0F",8,3,1,Math.PI,tpos);
                    break;
                case 5:
                    drawShape("#0FF",8,8,3,Math.PI,tpos);
                    break;
                case 6:
                    drawShape("#888",8,7,1,Math.PI,tpos);
                    break;
            }
        }else{
            drawCircle("#F00",8,tpos);
        }
    }
    then=nowt;
    requestAnimationFrame(mainloop2);
    //setTimeout(()=>{requestAnimationFrame(mainloop2)},1000/60);
}

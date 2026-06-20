export class Sheet {

    constructor(material = "18mm Plywood") {

        this.material = material;

        this.width = 2400;
        this.height = 1200;

        this.parts = [];

        this.freeRects = [

            {
                x:0,
                y:0,
                w:this.width,
                h:this.height
            }

        ];

    }

}



export class NestingEngine {


constructor(){

this.sheets=[];

}



nest(parts){

this.sheets=[];


parts.sort((a,b)=>{

return (

(b.width*b.height)

-

(a.width*a.height)

);

});



parts.forEach(part=>{


for(let i=0;i<part.qty;i++){


this.placePart({


name:part.name,


width:part.width,


height:part.height,


material:part.material


});


}


});


return this.sheets;


}




placePart(part){



for(let sheet of this.sheets){


if(this.tryPlace(sheet,part))

return;


}



let sheet=new Sheet(


part.material


);


this.sheets.push(sheet);


this.tryPlace(sheet,part);



}




tryPlace(sheet,part){



for(let i=0;i<sheet.freeRects.length;i++){


let rect=sheet.freeRects[i];



let fits=


part.width<=rect.w &&


part.height<=rect.h;



let rotate=


part.height<=rect.w &&


part.width<=rect.h;





if(fits){



this.insertPart(


sheet,


i,


rect,


part.width,


part.height,


part


);


return true;



}





if(rotate){



this.insertPart(


sheet,


i,


rect,


part.height,


part.width,


part


);


return true;



}



}



return false;



}




insertPart(sheet,index,rect,w,h,part){



sheet.parts.push({



name:part.name,


x:rect.x,


y:rect.y,


width:w,


height:h,


material:part.material



});



sheet.freeRects.splice(index,1);




let right={


x:rect.x+w,


y:rect.y,


w:rect.w-w,


h:h


};



let bottom={


x:rect.x,


y:rect.y+h,


w:rect.w,


h:rect.h-h


};




if(right.w>0 && right.h>0)


sheet.freeRects.push(right);



if(bottom.w>0 && bottom.h>0)


sheet.freeRects.push(bottom);



this.cleanup(sheet);




}




cleanup(sheet){



sheet.freeRects=


sheet.freeRects.filter(r=>{


return r.w>5 && r.h>5;


});



}




materialSummary(){


let totalArea=0;



this.sheets.forEach(sheet=>{


sheet.parts.forEach(p=>{


totalArea+=


p.width*p.height;



});


});



let available=


this.sheets.length*


2400*1200;




return{


used:


(totalArea/1000000).toFixed(2),



available:


(available/1000000).toFixed(2),



waste:


(

100-


(totalArea/


available*100)


).toFixed(1)



};



}



}
export function drawSheets(canvas,sheets){


const ctx=canvas.getContext("2d");


ctx.clearRect(


0,

0,

canvas.width,

canvas.height

);



let scale=.22;


let offsetY=10;



sheets.forEach(sheet=>{



ctx.strokeStyle="black";

ctx.strokeRect(


10,

offsetY,


2400*scale,


1200*scale

);



sheet.parts.forEach(p=>{



ctx.fillStyle="#4ea1ff";


ctx.fillRect(



10+p.x*scale,



offsetY+p.y*scale,



p.width*scale,



p.height*scale



);



ctx.strokeRect(



10+p.x*scale,



offsetY+p.y*scale,



p.width*scale,



p.height*scale



);



ctx.fillStyle="black";


ctx.font="10px Arial";


ctx.fillText(


p.name,



15+p.x*scale,



offsetY+15+p.y*scale


);



});



offsetY+=300;



});



}
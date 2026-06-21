export class Cabinet {

constructor(options={}){

this.type=options.type || "Base Cabinet";

this.width=options.width || 900;
this.height=options.height || 720;
this.depth=options.depth || 580;

this.material=options.material || "18mm Plywood";

this.shelves=options.shelves || 1;

this.doors=options.doors || 2;

this.drawers=options.drawers || 0;

this.toeKick=true;

this.toeHeight=100;
this.toeSetback=50;

this.backStyle="Captured";

this.doorStyle="Shaker";

this.parts=[];

}


generateParts(){

this.parts=[];

let W=this.width;
let H=this.height;
let D=this.depth;


// SIDES

this.parts.push({

name:"Side",

width:D,

height:H,

qty:2,

material:this.material

});



// TOP

this.parts.push({

name:"Top",

width:W-36,

height:D,

qty:1,

material:this.material

});



// BOTTOM

this.parts.push({

name:"Bottom",

width:W-36,

height:D,

qty:1,

material:this.material

});



// SHELVES


for(let i=0;i<this.shelves;i++){

this.parts.push({

name:"Shelf",

width:W-36,

height:D-20,

qty:1,

material:this.material

});


}



// TOE KICK


if(this.toeKick){


this.parts.push({


name:"Toe Front",


width:W,


height:this.toeHeight,


qty:1,


material:this.material


});


}




// BACK PANEL



if(this.backStyle==="Captured"){


this.parts.push({


name:"Back",


width:W-36,


height:H-36,


qty:1,


material:"6mm MDF"


});


}



if(this.backStyle==="Full"){


this.parts.push({


name:"Back",


width:W,


height:H,


qty:1,


material:"6mm MDF"


});


}



// DOORS


if(this.doors>0){


let dw=W/this.doors;



for(let i=0;i<this.doors;i++){


this.parts.push({


name:"Door",


width:dw-4,


height:H-4,


qty:1,


material:this.material


});


}


}



// DRAWERS


for(let i=0;i<this.drawers;i++){


this.parts.push({


name:"Drawer Side",


width:D-50,


height:150,


qty:2,


material:"12mm Plywood"


});



this.parts.push({


name:"Drawer Front",


width:W-100,


height:150,


qty:1,


material:"12mm Plywood"


});



this.parts.push({


name:"Drawer Back",


width:W-100,


height:150,


qty:1,


material:"12mm Plywood"


});



this.parts.push({


name:"Drawer Bottom",


width:W-100,


height:D-50,


qty:1,


material:"6mm MDF"


});


}



return this.parts;


}





edgeBanding(){


let total=0;



this.parts.forEach(p=>{



if(

p.name==="Shelf"

||

p.name==="Door"

||

p.name==="Drawer Front"

){



total+=


(p.width*2)+


(p.height*2);



}



});



return (total/1000).toFixed(2);



}





hardware(){


return{


hinges:this.doors*2,


slides:this.drawers,


pins:this.shelves*4,


feet:4


};



}



summary(){


return{


parts:this.parts.length,


edgeBanding:


this.edgeBanding(),


hardware:


this.hardware()


};


}



}






export function presets(type){



switch(type){


case "Base Cabinet":


return{


width:900,


height:720,


depth:580


};



case "Wall Cabinet":


return{


width:900,


height:720,


depth:320


};



case "Pantry":


return{


width:600,


height:2100,


depth:580


};



case "Vanity":


return{


width:900,


height:870,


depth:500


};



default:


return{


width:900,


height:720,


depth:580


};



}


}

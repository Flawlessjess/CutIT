import { Project,
         saveProject,
         loadProject } from "./project.js";

import { Cabinet,
         presets } from "./cabinets.js";

import { NestingEngine,
         drawSheets } from "./nesting.js";



const project = new Project();

const nesting = new NestingEngine();



// UI ELEMENTS

const type = document.getElementById("cabinetType");

const width = document.getElementById("width");
const height = document.getElementById("height");
const depth = document.getElementById("depth");

const shelves = document.getElementById("shelves");

const doors = document.getElementById("doors");

const drawers = document.getElementById("drawers");



const addBtn = document.getElementById("addCabinet");

const cabinetList = document.getElementById("cabinetList");

const materialSummary =
document.getElementById(
"materialSummary"
);



const canvas =
document.getElementById(
"sheetCanvas"
);

canvas.width=1200;
canvas.height=900;



const saveBtn=
document.getElementById(
"saveBtn"
);



const loadBtn=
document.getElementById(
"loadBtn"
);


const loadFile=
document.getElementById(
"loadFile"
);



// PRESETS


type.addEventListener(

"change",

()=>{


let p=presets(

type.value

);


width.value=p.width;


height.value=p.height;


depth.value=p.depth;


}


);




// ADD CABINET



addBtn.addEventListener(


"click",


()=>{


let cabinet=


new Cabinet({


type:type.value,


width:Number(

width.value

),



height:Number(

height.value

),



depth:Number(

depth.value

),



shelves:Number(

shelves.value

),



doors:Number(

doors.value

),



drawers:Number(

drawers.value

)



});




cabinet.generateParts();



project.addCabinet(


cabinet


);



refresh();



}



);






function refresh(){



cabinetList.innerHTML="";



project.cabinets.forEach(



(c,i)=>{



let div=


document.createElement(


"div"


);



div.className=


"cabinetItem";



let hardware=


c.hardware();





div.innerHTML=`


<b>


${c.type}


</b>


<br>



${c.width}



x



${c.height}



x



${c.depth}





<br>


Parts:


${c.parts.length}



<br>



Edge Tape:


${c.edgeBanding()}



m



<br>



Hinges:


${hardware.hinges}



<br>



Slides:


${hardware.slides}





`;



cabinetList.appendChild(


div


);



}



);





let parts=[];




project.cabinets.forEach(c=>{


parts.push(


...c.parts


);


});





let sheets=


nesting.nest(


parts


);




drawSheets(


canvas,


sheets


);




let m=


nesting.materialSummary();




materialSummary.innerHTML=`



18mm Ply



<br>



Sheets:



${sheets.length}



<br>



Used:



${m.used}



m²



<br>



Waste:



${m.waste}



%



`;



}





saveBtn.addEventListener(


"click",


()=>{


saveProject(


project


);


}



);






loadBtn.addEventListener(


"click",


()=>{


loadFile.click();


}



);






loadFile.addEventListener(


"change",


e=>{



let file=


e.target.files[0];



loadProject(



file,



project,



()=>{


refresh();


}



);



}



);






refresh();
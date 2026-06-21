export class Project {

    constructor() {

        this.name = "New Project";

        this.units = "mm";

        this.cabinets = [];

        this.materials = [

            {
                id: 1,
                name: "18mm Plywood",
                thickness: 18,
                width: 2400,
                height: 1200,
                cost: 120
            },

            {
                id: 2,
                name: "6mm MDF",
                thickness: 6,
                width: 2400,
                height: 1200,
                cost: 40
            }

        ];

        this.offcuts = [];

    }


    addCabinet(cabinet){

        this.cabinets.push(cabinet);

    }


    removeCabinet(index){

        this.cabinets.splice(index,1);

    }


    duplicateCabinet(index){

        let c = structuredClone(

            this.cabinets[index]

        );

        this.cabinets.push(c);

    }


    clear(){

        this.cabinets=[];

        this.offcuts=[];

    }


    totalCabinets(){

        return this.cabinets.length;

    }


    totalSheets(){

        return this.materials.length;

    }


    addOffcut(w,h){

        this.offcuts.push({

            width:w,

            height:h

        });

    }


    materialByName(name){

        return this.materials.find(

            m=>m.name===name

        );

    }



    save(){


        return JSON.stringify(


            this,


            null,


            2


        );


    }



    load(data){


        let p=JSON.parse(data);


        this.name=p.name;


        this.units=p.units;


        this.cabinets=p.cabinets;


        this.materials=p.materials;


        this.offcuts=p.offcuts;


    }


}




export function saveProject(project){


let blob=new Blob(


[project.save()],


{


type:"application/json"


}


);



let link=document.createElement("a");


link.href=URL.createObjectURL(


blob


);



link.download="project.cabproj";


link.click();



}




export function loadProject(file,project,callback){


let reader=new FileReader();



reader.onload=function(){


project.load(


reader.result


);



callback();



};



reader.readAsText(file);



}




export function projectSummary(project){



let summary={



cabinets:



project.cabinets.length,



materials:



project.materials.length,



offcuts:



project.offcuts.length



};



return summary;



}

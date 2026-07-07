let infractions = [];


fetch("./infractions.csv")
.then(response => response.text())
.then(data => {

    let lignes = data.split("\n");

    let headers = lignes[0].split(";");


    for(let i=1;i<lignes.length;i++){

        let valeurs = lignes[i].split(";");

        if(valeurs.length < headers.length)
            continue;


        let obj={};


        headers.forEach((h,index)=>{
            obj[h.trim()] = valeurs[index]?.trim();
        });


        if(obj.active == "1"){
            infractions.push(obj);
        }

    }

});



const categorie = document.getElementById("categorie");
const infraction = document.getElementById("infraction");
const resultat = document.getElementById("resultat");



categorie.addEventListener("change",()=>{


    infraction.innerHTML="";


    let liste = infractions.filter(i =>
        i.Nature == categorie.value
    );


    liste.forEach(i=>{

        let option=document.createElement("option");

        option.value=i.NATINF;

        option.textContent=i.Qualification;

        infraction.appendChild(option);

    });


    afficher();

});



infraction.addEventListener("change", afficher);



function afficher(){


    let item = infractions.find(i =>
        i.NATINF == infraction.value
    );


    if(!item)
        return;



    resultat.innerHTML=`

<h2>${item.Qualification}</h2>


<p><b>Nature :</b> ${item.Nature}</p>

<p><b>NATINF :</b> ${item.NATINF}</p>


<p><b>Amende :</b> ${item.Amende}</p>


<p><b>Peine :</b> ${item.Prison}</p>


<p><b>Points :</b> ${item.Points}</p>


<p><b>Complément :</b> ${item.Complément || "Aucun"}</p>

`;

}

let infractions = [];



// Parseur CSV qui gère les virgules dans les champs
function parseCSV(text){


    let lignes = [];

    let ligne = "";

    let entreGuillemets = false;



    for(let i = 0; i < text.length; i++){


        let char = text[i];


        if(char === '"'){

            entreGuillemets = !entreGuillemets;

        }



        if(char === "\n" && !entreGuillemets){

            lignes.push(ligne);

            ligne="";

        }

        else{

            ligne += char;

        }


    }


    lignes.push(ligne);



    return lignes.map(ligne=>{


        let valeurs=[];

        let valeur="";

        let quote=false;



        for(let i=0;i<ligne.length;i++){


            let c=ligne[i];


            if(c === '"'){

                quote=!quote;

            }

            else if(c === "," && !quote){


                valeurs.push(valeur.trim());

                valeur="";


            }

            else{


                valeur += c;


            }


        }


        valeurs.push(valeur.trim());


        return valeurs;


    });


}





fetch("./infractions.csv")


.then(response=>{


    if(!response.ok){

        throw new Error("CSV introuvable");

    }


    return response.text();


})


.then(data=>{


    let lignes=parseCSV(data);



    let headers=lignes[0];



    for(let i=1;i<lignes.length;i++){


        let valeurs=lignes[i];



        if(valeurs.length !== headers.length)
            continue;



        let obj={};



        headers.forEach((h,index)=>{


            obj[h.trim()] = valeurs[index];


        });



        infractions.push(obj);



    }



    console.log("CSV chargé :", infractions);


})


.catch(error=>{


    console.error(error);


});






const categorie=document.getElementById("categorie");

const resultat=document.getElementById("resultat");





categorie.addEventListener("change",()=>{


    let liste = infractions.filter(i=>

        i.Nature === categorie.value

    );



    resultat.innerHTML="";



    if(liste.length === 0){


        resultat.innerHTML=`

        <div class="empty">

        Aucune infraction trouvée

        </div>

        `;


        return;


    }





    liste.forEach(i=>{


        let card=document.createElement("div");


        card.className="card";



        card.innerHTML=`

        <h2>${i.Qualification}</h2>


        <div class="info">


        <div class="key">
        NATINF
        </div>

        <div>
        ${i.NATINF}
        </div>



        <div class="key">
        Nature
        </div>

        <div>
        ${i.Nature}
        </div>



        <div class="key">
        Amende
        </div>

        <div>
        ${i.Amende || "Non renseignée"}
        </div>



        <div class="key">
        Prison
        </div>

        <div>
        ${i.Prison || "Non renseignée"}
        </div>



        <div class="key">
        Points
        </div>

        <div>
        ${i.Points || "0"}
        </div>



        <div class="key">
        Complément
        </div>

        <div>
        ${i.Complément || "Aucun"}
        </div>


        </div>

        `;



        resultat.appendChild(card);



    });



});

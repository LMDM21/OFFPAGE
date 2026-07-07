let infractions = [];



fetch("./infractions.csv")

.then(response => {

    if(!response.ok){

        throw new Error("CSV introuvable");

    }

    return response.text();

})


.then(data => {


    let lignes = data.split("\n");


    let headers = lignes[0].split(";");



    for(let i = 1; i < lignes.length; i++){


        let valeurs = lignes[i].split(";");


        if(valeurs.length < headers.length)
            continue;



        let obj = {};



        headers.forEach((h,index)=>{

            obj[h.trim()] = valeurs[index]?.trim();

        });



        if(obj.active == "1"){

            infractions.push(obj);

        }


    }



    console.log("Infractions chargées :", infractions);


})

.catch(error=>{

    console.error(error);

});





const categorie = document.getElementById("categorie");

const resultat = document.getElementById("resultat");





categorie.addEventListener("change", ()=>{


    let liste = infractions.filter(i =>

        i.Nature === categorie.value

    );



    resultat.innerHTML = "";



    if(liste.length === 0){


        resultat.innerHTML = `

        <div class="empty">

        Aucune infraction trouvée

        </div>

        `;


        return;

    }




    liste.forEach(i=>{



        let card = document.createElement("div");


        card.className = "card";



        card.innerHTML = `


        <h2>${i.Qualification}</h2>


        <div class="info">


        <div class="key">
        NATINF
        </div>

        <div class="value">
        ${i.NATINF}
        </div>



        <div class="key">
        Nature
        </div>

        <div class="value">
        ${i.Nature}
        </div>



        <div class="key">
        Amende
        </div>

        <div class="value">
        ${i.Amende || "Non renseignée"}
        </div>



        <div class="key">
        Peine
        </div>

        <div class="value">
        ${i.Prison || "Non renseignée"}
        </div>



        <div class="key">
        Points
        </div>

        <div class="value">
        ${i.Points || "Aucun"}
        </div>



        <div class="key">
        Complément
        </div>

        <div class="value">
        ${i.Complément || "Aucun"}
        </div>



        </div>


        `;



        resultat.appendChild(card);



    });



});

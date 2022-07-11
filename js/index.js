//recuperation des donnees via api avec la methode fetch

//recuperation des données du département de gironde
let url = "https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement=33&size=20&exact_count=true&format=json&pretty";
fetch(url).then((response) => 
    response.json().then((data) =>{ 
        var tab = new Array(); 
        var datas =  data.data;

        //recuperer les codes stations et les ajoutés dans un tableau
        for (let i = 0; i < datas.length; i++) {
            const station = datas[i]['code_station'];
            tab.push(station); 
        }

        //récuperation des 10 dernières information des stations
        var api = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=";
        var sortElemnt = "&size=10&sort=desc&pretty";

        for (let i = 0; i < tab.length; i++) {
            var url_ = api + tab[i] + sortElemnt;
            fetch(url_).then((response) => 
            response.json().then((data) =>{ 
            var detail =  data.data;
            var main = document.querySelector(".main");
            var element_ = new Array();
            var date_ = new Array();

            //creer et ajouter les elements du titre des informations dan la DOM
            if (i==0) {
                var titre = document.createElement("div");
                titre.className = "titre";
                var cours_eau = document.createElement("h3");
                cours_eau.innerHTML= "cours d'eau";
                cours_eau.className = "contenu";
                var temperature = document.createElement("h3");
                temperature.innerHTML= "température";
                temperature.className = "contenu";
                var date = document.createElement("h3");
                date.innerHTML= "date";
                date.className = "contenu";
                titre.appendChild(cours_eau);
                titre.appendChild(temperature);
                titre.appendChild(date);
                main.appendChild(titre);
            }

            //afficher les dernières mise a jour de chaque station par commune
            var infos = document.createElement("div");
            infos.className = "infos";
            var commune = document.createElement("p");
            commune.innerHTML= detail[0]["libelle_commune"];
            commune.className = "contenu";
            var tps = document.createElement("p");
            tps.innerHTML= Math.round(detail[0]["resultat"]) + " " + detail[0]["symbole_unite"];
            tps.className = "contenu";
            var date_info = document.createElement("p");
            date_info.innerHTML= detail[0]["date_mesure_temp"];
            date_info.className = "contenu";
            infos.appendChild(commune);
            infos.appendChild(tps);
            infos.appendChild(date_info);
            main.appendChild(infos);

            //recuperer dans destableau les 10 dernières temperatures ainsi que l'heure à laquelle elles ont été enregisté  
            for (let j = 0; j < detail.length; j++) {
                element_.push(detail[j]["resultat"]); 
                date_.push(detail[j]["heure_mesure_temp"]);  
                                       
            }
            //création des graphique pour chaque commune sur les dernières température enregistrées sur une journéé par rapport a l heure 
            var graph = document.querySelector('.graph');
            var canva = document.createElement("CANVAS");
            canva.className = "canva";
            var legend = document.createElement("p");
            legend.innerHTML = "Cours d'eau de" + " " + detail[0]["libelle_commune"];
            legend.style.color = "white";
            legend.style.textAlign = "center";
            var date_tps = document.createElement("p");
            date_tps.innerHTML = "Date:" + " " + detail[0]["date_mesure_temp"];
            date_tps.style.fontSize = "12px";
            date_tps.style.color = "white";
            date_tps.style.textAlign = "center";
            var graph1 = document.createElement("div");
            graph1.appendChild(legend);
            graph1.appendChild(date_tps);
            graph1.appendChild(canva);
            graph.appendChild(graph1);
            var ctx = canva;
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date_,
                    datasets: [{
                    label: "# Température ",
                    data: element_,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                    }]
                },
                options: {
                    responsive: false,
                }
                });
                console.log(detail);
        })
    );
        }       
    })
);

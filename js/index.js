//recuperation des donnees de l api avec la methode fetch
let url = "https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement=33&size=20&exact_count=true&format=json&pretty";
fetch(url).then((response) => 
    response.json().then((data) =>{ 
        
        var tab = new Array(); 
        var datas =  data.data;
        for (let i = 0; i < datas.length; i++) {
            const station = datas[i]['code_station'];
            tab.push(station); 
        }
        //console.log(tab);
        var api = "https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=";
        var sortElemnt = "&size=1&sort=desc&pretty";
        for (let i = 0; i < tab.length; i++) {
            var url_ = api + tab[i] + sortElemnt;
            fetch(url_).then((response) => 
            response.json().then((data) =>{ 
            var detail =  data.data;
            console.log(detail);
        })
    );
        }
        
        //recuperer les données et les inserées dans des variables

        //image
        /*let picture = data.results[0]['picture']['large'];
        //prenom et nom
        let first = data.results[0]['name']['first'];
        let last = data.results[0]['name']['last'];
        //email
        let email = data.results[0]['email'];
        //date de naissance
        let birthday_date = data.results[0]['dob']['date'];
        birthday_date.split(" ", 5);
        let birthday = birthday_date;
        //adresse
        let address_number = data.results[0]['location']['street']['number'];
        let address_name = data.results[0]['location']['street']['name'];
        //numero de télephone
        let phone_number = data.results[0]['phone'];
        //mot de passe
        let password = data.results[0]['login']['password'];
        
        //inserer variables image
        let user_image = document.getElementById("user-image");
        user_image.src = picture;*/
        
    })
);
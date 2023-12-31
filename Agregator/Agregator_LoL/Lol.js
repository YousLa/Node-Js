// Envoyer une requête de type GET à l'adresse : 
// https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json
// Pour obtenir une réponse JSON

// Require : on instancie une classe défini dans le package => ici https
let https = require('https');
// Port HTTP 80, HTTPS 443

// Une fonction attachée à un objet est une méthode
// Un Objet contient une/des méthode(s) et/ou des propriétés.
// Comment avoir accès à la propriété d'un objet : objet.propriété.
// Comment faire appel à la méthode : objet.méthode(paramètres).
// On crée une variable de type objet qui va contenir 3 propriétés : host, port, path
let request = {
    // 1. Le nom de domaine
    "host": "ddragon.leagueoflegends.com",
    // 2. Le port du protocole
    "port": 443,
    // 3. Le chemin vers la ressource
    "path": "/cdn/13.23.1/data/fr_FR/champion.json"
};

// A partir de l'objet https envoyer la requête vers le server qui est défini dans l'objet request
// get => est une requête HTTP pour obtenir quelque chose 
https.get(request, receiveResponseCallback);
// Ici on utilise la fonction receiveResponseCallback car NodeJS fonctionne de manière asynchrone (la requête est lancée et il fait autre chose jusqu'au moment ou il à reçu une réponse), donc on lui demande d'appeller la fonction de "callback" au moment ou il reçoit la réponse

// On reçoit un objet response
function receiveResponseCallback(response) {
    // Et on lui demande d'afficher le status code de la réponse à la requête
    console.log('Got response:' + response.statusCode);

    // On initialise la variable en string vide car on va concatèner les chunk
    let rawData = "";

    // Listener
    // .on => Méthode qui permet de gèrer l'évènement data/end. Donc quand il recevra quelque chose il lancera la fonction

    // Fonction fleché
    // On met des listener
    // On concatène dans rawData les chunk de données que l'on va recevoir
    // TCP => Les données sont reçus petit à petit (chunk), du coup on doit les rassembler en concaténant
    response.on('data', (chunk) => { rawData += chunk; });

    // Fonction anonyme
    response.on('end', function (chunk) {
        // On affiche les données que l'on à reçu
        // console.log(rawData);

        // On crée un objet Javascript parser à partir de la variable rawData qui contient une chaîne de caractère structuré en JSON
        // La méthode .parse va analyser et vérifier si c'est bien du JSON bien formatté et convertir la chaîne de caractère en objet JavaScript (clés - valeurs)
        // JSON => Objet, parse => Méthode, rawData => Paramètres
        // Ici on crée une variable qui va dévenir un objet grâce à la méthode parse qui et du rawData qui est structuré en JSON. Sans cette structure, on aurait eu une erreur.
        let champions = JSON.parse(rawData);

        // On affiche l'objet JSON

        let championsData = champions.data;

        // Ittération d'un objet
        for (const [key, value] of Object.entries(championsData)) {
            console.log(`${key}: ${value}`);
        }

        const NOM = document.getElementById("nom");
        NOM.innerText()

        // console.log(champions);

    });
};

// rawData => On reçoie une chaîne de caractère structurée en JSON



//Let 
let favoriteCityId = "rome";
console.log(favoriteCityId);
favoriteCityId = "paris";
console.log(favoriteCityId);

//Const

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
console.log(citiesId);
//citiesId.push([""]);
citiesId.push('tokyo');
console.log(citiesId);

//Creation d'Objet

/*Ancienne syntaxe  
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city : city, temperature : temperature };
}
*/

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}
const weather = getWeather(favoriteCityId);

console.log(weather);

//Affectation destructurée

/* const city= weather.city; 
const temperature = weather.temperature; 
==> remplacé par : */
const { city, temperature } = weather;

console.log(city);
console.log(temperature);

//Rest operator
console.log("---Rest Operator---")
const [parisId, nycId, ...otherCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(otherCitiesId);

//Classe
console.log("---Classe---")
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }
    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }
}
let parisTrip = new Trip('paris', 'Paris', 'img / paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);

//ajout toString
Trip.prototype.toString = function toString() {
    return 'Trip [ ' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this.price + ']';
}
console.log(parisTrip.toString());

//ajout get set price
parisTrip.price = 100;
console.log(parisTrip.toString());

const DefaultTrip = Trip.getDefaultTrip();
console.log("DefaultTrip" + DefaultTrip.toString());


//Heritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl, price) {
        super(id, name, imageUrl, price);
        this.price = 0;
    }

    toString() {
        return 'Free' + super.toString();
    }
}
let freeTrip = new FreeTrip('nantes', 'Nantes', 'img / nantes.jpg');
console.log(freeTrip.toString());

///Promise, Set, Map, Arrow Function


class TripService {
    constructor() {
        // TODO Set of 3 trips
        this.setTrips = new Set([new Trip('paris', 'Paris', 'img/paris.jpg'),
        new Trip('nantes', 'Nantes', 'img/nantes.jpg'),
        new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')]);
    }
    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                for (const trip of this.setTrips) {
                    if (trip.name == tripName) {
                        resolve(trip);
                    }
                }
                reject('No trip with name ' + tripName);
            }, 2000)
        });
    }
}
class PriceService {
    constructor() {
        this.mapPriceService = new Map([['Paris', 100], ['Rio-de-janeiro', 800]]);
        // no price for 'nantes'
        this.mapPriceService = new Map();
        this.mapPriceService.set()
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                for (const [clé, valeur] of this.mapPriceService) {
                    if (clé == tripId) {
                        resolve(valeur);
                    }
                }

                reject('No price found for id ' + tripId);
            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

//Effectuer une recherche par nom de voyage avec la valeur Paris. Afficher dans la console le résultat trouvé.
tripService.findByName("Paris").then(trip => console.log("Trip found : " + trip));
//Effectuer une recherche par nom de voyage avec la valeur Toulouse. Afficher dans la console le résultat trouvé.
tripService.findByName("Toulouse").then(trip => console.log("Trip found : " + trip)).catch(err => console.log(err));
//Chainer l’utilisation des services TripService et PriceService pour récupérer le prix du voyage'Rio de Janeiro'.
priceService.findPriceByTripId("Rio de Janeiro")
    .then(trip => trip.id)
    .then(idTrip => priceService.findPriceByTripId(idTrip))
    .then(prix => console.log("Price found : " + prix))
    .catch(err => console.log(err));
//Chainer l’utilisation des services TripService et PriceService pour récupérer le prix du voyage'Nantes'.

priceService.findPriceByTripId("Nantes")
    .then(trip => trip.id)
    .then(idTrip => priceService.findPriceByTripId(idTrip))
    .then(prix => console.log("Price found : " + prix))
    .catch(err => console.log(err));
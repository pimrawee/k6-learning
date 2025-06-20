import { SharedArray } from "k6/data";
import http from "k6/http";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import encoding from 'k6/encoding';

export let options = {
    vus: 5,
    duration: '5s',
    iterations: 5,
};

const csvRead = new SharedArray("credentials", function() { // Initializing SharedArray to read data from a CSV file
    // header: true indicates that the first row of the CSV file contains the column names
    return papaparse.parse(open('./data.csv'), {header: true}).data; // returning array
});

export default function main(){
    // Looping through the credentials
    for (let data of csvRead){
        console.log(JSON.stringify(data['username']));
        console.log(JSON.stringify(data['password']));
    }

    // Random credentials
    // Randomly select a single object from the array
    var randomCredentials = csvRead[Math.floor(Math.random() * csvRead.length)];
    console.log(randomCredentials['username']);
    console.log(randomCredentials['password']);

    // Randomly select username and password separately
    var username = csvRead[Math.floor(Math.random() * csvRead.length)]['username'];
    var password = csvRead[Math.floor(Math.random() * csvRead.length)]['password'];

    // Generate base64 encoded credentials
    var toBeEncoded = username + ':' + password;
    var encodedString = encoding.b64encode(toBeEncoded);

    console.log(encodedString);

    let params = {
        headers : {
        "Authorization": "Basic " + encodedString,
        "X-Requested-With": "XMLHttpRequest"
        }
    };

    let response = http.get("http://localhost/login", params);  // Sending a GET request to the login endpoint with the encoded credentials in the headers
    console.log(`Logging in using `+ username + ":" + password + ` Status: ` + response.status);
};
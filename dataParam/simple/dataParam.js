import http from "k6/http";
import { SharedArray } from "k6/data";

export let options = {
    vus: 5,
    duration: '5s',
    iterations: 5, // Configuring the test to run with 5 virtual users for 5 seconds, with 5 iterations each
};

var data = new SharedArray("colors", function() {   // Initializing SharedArray to read data from a JSON file
    // "colors" is the name of the SharedArray, which can be used to reference this data in the k6 script
    // The function reads the JSON file and returns the "tags" array from it
    return JSON.parse(open('./tags.json')).tags; // return array of tags
});

// Reading random tag from the JSON file
var randomTag = data[Math.floor(Math.random() * data.length)];

export default function() {
    let response =  http.get(`http://localhost/category.html?tags=${randomTag}`);
    console.log(`VU ID: ${__VU} ` + "- URL: " + response.url + " - Status Code: " + response.status); // Logging the response URL and status code
}
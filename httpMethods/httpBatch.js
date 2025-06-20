import http from "k6/http";

export default function() {
    // HTTP Batch
    // Making multiple HTTP requests in a single batch
    // This is useful for reducing the number of connections and improving performance
    let requests = http.batch([
        [ "GET", "https://onlineboutique.dev"],
        [ "GET", "https://onlineboutique.dev/static/styles/styles.css" ],
        [ "GET", "https://onlineboutique.dev/static/styles/cart.css"],
        [ "GET", "https://onlineboutique.dev/static/styles/order.css"],
        [ "GET", "https://onlineboutique.dev/static/icons/Hipster_CurrencyIcon.svg"],
        [ "GET", "https://onlineboutique.dev/static/img/products/barista-kit.jpg"],
    ]);
   

    for (let i=0; i<requests.length; i++) { // Iterate over all requests
        console.log(requests[i].status);
    }
}
import http from 'k6/http';
import { sleep } from "k6";

export default function () {
    http.get('https://reqres.in'); // Making a GET request to the specified URL
    sleep(1);
}
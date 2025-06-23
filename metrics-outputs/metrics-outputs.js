import http from "k6/http";
import { sleep, check } from "k6";
import { Counter, Gauge, Rate, Trend } from "k6/metrics";   // Importing metrics from k6

// Custom metrics
const customTrend = new Trend("custom_duration");
const customCounter = new Counter("custom_counter");
const customGauge = new Gauge("custom_gauge");
const customRate = new Rate("custom_rate");

export const options = {
    ext: {              // Configuration for k6 extensions
        loadimpact: {   // Load Impact configuration
            projectID: 3571382,
            name: "Metrics Outputs",
        }
    },
    scenarios: {
        constant_scenario: {
            executor: "constant-vus",
            vus: 1,
            duration: "5s",
            startTime: '0s'
        },
    },
};

export default function () {
    const res = http.get("https://onlineboutique.dev");

    check(res, {
        'is status 200': r => r.status === 200,
    });

    //Custom trend - response time
    console.log('Response time (ms) was ' + String(res.timings.duration));  // Log the response time
    customTrend.add(res.timings.duration);  // Add the response time to the custom trend metric

    // Counter - sum of all values * each iteration
    customCounter.add(1);   // Increment the counter by 1
    customCounter.add(2);   // Increment the counter by 2
    customCounter.add(3);   // Increment the counter by 3

    // Rate - 50% pass, 50% fail
    customRate.add(1);      // Add a value of 1 (pass)
    customRate.add(true);   // Add a boolean true (pass)
    customRate.add(false);  // Add a boolean false (fail)
    customRate.add(0);      // Add a value of 0 (fail)

    // Gauge - displays the last value, along with min and max
    customGauge.add(1);     // Set the gauge to 1
    customGauge.add(5);     // Set the gauge to 5
    customGauge.add(10);    // Set the gauge to 10

    sleep(1);
}
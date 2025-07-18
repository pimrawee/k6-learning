# 🚀 Introduction to Grafana k6

Grafana k6 is an open-source load testing tool designed to help engineers test performance in a simple yet powerful way. k6 is free, developer-centric, and extensible. With k6, you can test the reliability and performance of your systems early in the development process, helping you build scalable, resilient, and high-performing applications.

k6 promotes a shift-left approach, integrating performance testing into the continuous software development lifecycle.

> 🎥 Playlist is [learning](https://www.youtube.com/playlist?list=PLJ9A48W0kpRJKmVeurt7ltKfrOdr8ZBdt).

---

## 💡 Getting Started with k6 (Learn k6 Series - E1)

* **What is k6?**

  * A load testing tool using JavaScript to write test scripts (unlike many tools that use GUI).

* **Installation and Running:**

  * Install k6 on your system and run scripts with:

    ```bash
    k6 run your_script.js
    ```

* **Basic Script Structure:**

  * Scripts typically include `import` statements (e.g., http, sleep, check) and a `default` function that runs repeatedly by Virtual Users (VUs).

* **Options Configuration:**

  * Configure test settings via the `options` object, including VUs, duration, thresholds, etc.

---

## 🎠 Recording User Flows (Learn k6 Series - E2)

k6 allows you to record business flows from a browser via two main methods:

* **k6 Browser Extensions**

  * Available for Chrome and Firefox
  * Record browser actions and export to k6 script
  * Free and no paid account required

* **k6 Studio**

  * Desktop app for Mac and Windows (Linux support coming soon)
  * Record web app behavior via local proxy and generate scripts
  * Features: Extractors, Correlation, Parameterization, Validation
  * Limitation: Still in Public Preview; cannot run actual load tests directly — must use k6 CLI

---

## 📄 Data Parameterization (Learn k6 Series - E3)

* **Purpose:**

  * Simulate different users by feeding varying input data

* **Usage:**

  * Load test data from external JSON or CSV files (e.g., usernames/passwords)

* **Benefit:**

  * Makes tests more realistic by mimicking real-world usage patterns

---

## 🌐 HTTP Methods (Learn k6 Series - E4)

* **Supported Methods:**

  * GET, POST, PUT, PATCH, DELETE, OPTIONS

* **HTTP Module:**

  * Import with: `import http from 'k6/http'`

* **Batch Requests:**

  * Use `http.batch()` to send multiple requests concurrently, similar to browser behavior when loading resources

---

## ✅ Checks (Learn k6 Series - E5)

* **Purpose:**

  * Verify correctness of responses (e.g., status code, response body)

* **Behavior:**

  * Checks do not stop execution if failed, but results are recorded as true/false

* **Usage:**

  * Import with: `import { check } from 'k6'`

* **Difference from Thresholds:**

  * Checks validate logic, while Thresholds enforce pass/fail criteria

---

## 🚧 Thresholds (Learn k6 Series - E6)

* **Purpose:**

  * Define SLAs (service level agreements) for pass/fail conditions

* **Behavior:**

  * If thresholds are violated, the test will fail

* **Configuration:**

  * Set thresholds in the `options` object

* **Supported Metric Types:**

  * Built-in (e.g., http\_req\_duration)
  * Custom: Counter, Gauge, Rate, Trend

* **Metric Descriptions:**

  * **Counter:** Cumulative total of a value
  * **Gauge:** Last recorded value plus min/max
  * **Rate:** Percentage of successful/failed events
  * **Trend:** Statistical analysis (min, max, avg, percentiles)

* **Use Case:**

  * Useful for CI/CD automation to validate system performance against predefined criteria

---

## 📊 Scenarios and Executors (Learn k6 Series - E7)

* **Scenarios:**

  * Simulate real-world user behavior; multiple scripts or flows can be combined

* **Executors:**

  * Define how VUs and iterations are executed

### Executor Types:

* **Per VU Scenario:**

  * Each VU runs a fixed number of iterations

* **Shared Iterations Scenario:**

  * All VUs share a total number of iterations

* **Constant VUs Scenario:**

  * Fixed number of VUs run iterations as fast as possible during the duration

* **Ramping VUs Scenario:**

  * VUs ramp up/down over time (stages)

* **Constant Arrival Rate Scenario:**

  * Maintain constant iterations per time unit (e.g., 100 req/s)

* **Ramping Arrival Rate Scenario:**

  * Iteration rate changes over time

* **Externally Controlled Scenario:**

  * Control VU count or test status externally (CLI, API, CI/CD)

* **Configuration:**

  * All defined under the `options` object (no imports needed)

---

## 📊 Metrics & Output (Learn k6 Series - E8)

* **Built-in Metrics:**

  * Automatically reported (e.g., vus, iterations, http\_req\_duration)

* **Custom Metrics:**

  * 4 Types:

    * **Counter**
    * **Gauge**
    * **Rate**
    * **Trend**
  * Import with: `import { Counter, Gauge, Rate, Trend } from 'k6/metrics'`

* **Output Formats:**

  * **Console Output:** default view in terminal
  * **k6 Cloud:** rich dashboards, trends, and collaboration
  * **Others:** CSV, JSON, integration with Grafana, Prometheus, Datadog, New Relic, etc.

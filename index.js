const choose = document.getElementById('choose-option');
const resultTable = document.getElementById('result-table');

/**
 * Displays Vehicle Record
 */
async function getVRecord() {
    // 1. input
    let vehicleID = Number(window.prompt(`Enter your vehicle id`));
    // 2. fetch API
    let result = await fetchData(`https://www.fueleconomy.gov/ws/rest/vehicle/${vehicleID}`);

    // 3. Output block
    if (result) {
        choose.innerHTML = "Vehicle Record";
        resultTable.style.display = "flex";
        resultTable.innerHTML = `
            <tr>
                <th>Field</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Make</td>
                <td>${result.make}</td>
            </tr>
            <tr>
                <td>Model</td>
                <td>${result.model}</td>
            </tr>
            <tr>
                <td>Year</td>
                <td>${result.year}</td>
            </tr>
            <tr>
                <td>Transmission</td>
                <td>${result.trany}</td>
            </tr>
            <tr>
                <td>Drive</td>
                <td>${result.drive}</td>
            </tr>
            <tr>
                <td>Cylinders</td>
                <td>${result.cylinders}</td>
            </tr>
            <tr>
                <td>Displacement</td>
                <td>${result.displ}</td>
            </tr>
            <tr>
                <td>Fuel Type</td>
                <td>${result.fuelType1}</td>
            </tr>
        `
    } else {
        choose.innerHTML = "Record not found, Please try again.";
        resultTable.style.display = "none";
    }
}

/**
 * Displays Vehicle Emissions
 */
async function getVEmission() {
    // 1. input
    let vehicleID = Number(window.prompt(`Enter your vehicle id`));
    // 2. fetch API
    let result = await fetchData(`https://www.fueleconomy.gov/ws/rest/vehicle/emissions/${vehicleID}`);
    // 3. Output block
    if (result) {
        let record = result.emissionsInfo[0]; // reassigning to appropreiate object
        console.log(record);
        choose.innerHTML = "Emission Results";
        resultTable.style.display = "flex";
        resultTable.innerHTML = `
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>`;
        for (const field in record) {
            if (Object.hasOwnProperty.call(record, field)) {
                const value = record[field];
                resultTable.innerHTML += `<tr>
                <td>${field}</td>
                <td>${value}</td>
                </tr>`;
            }
        }
    } else {
        choose.innerHTML = "Record not found, Please try again.";
        resultTable.style.display = "none";
    }
}

/**
 * Displays Fuel Prices for different fuels
 */
async function getFuelPrices() {
    // 1. fetch API
    let result = await fetchData(`https://www.fueleconomy.gov/ws/rest/fuelprices`);
    // 2. Display result
    if (result) {
        choose.innerHTML = "Average Fuel Prices";
        resultTable.style.display = "flex";
        resultTable.innerHTML = `
        <tr>
            <th>Fuel Type</th>
            <th>Fuel Price</th>
        </tr>
    `;
        for (const fuelType in result) {
            if (Object.hasOwnProperty.call(result, fuelType)) {
                const fuelPrice = result[fuelType];
                resultTable.innerHTML += `<tr>
            <td>${fuelType}</td>
            <td>${fuelPrice}</td>
            </tr>`;
            }
        }
    }
    else {
        choose.innerHTML = "Record not found, Please try again.";
        resultTable.style.display = "none";
    }

}

/**
 * Displays MPG Record
 */
async function getMpgRecord() {
    // 1. input
    let vehicleID = Number(window.prompt(`Enter your vehicle id`));
    // 2. fetch API
    let result = await fetchData(`https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/${vehicleID}`);
    // 3. Display Results
    if (result) {
        choose.innerHTML = "MPG Record";
        resultTable.style.display = "flex";
        resultTable.innerHTML = `
        <tr>
            <th>Statistic</th>
            <th>Value</th>
        </tr>
    `;
        for (const stat in result) {
            if (Object.hasOwnProperty.call(result, stat)) {
                const value = result[stat];
                resultTable.innerHTML += `<tr>
            <td>${stat}</td>
            <td>${value}</td>
            </tr>`;
            }
        }
    }
    else {
        choose.innerHTML = "Record not found, Please try again.";
        resultTable.style.display = "none";
    }
}

/**
 * GET DATA FROM API
 * @param {String} url 
 * @returns JSON / null
 */
async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`There has been an error: ${error}`);
        return null;
    }
}

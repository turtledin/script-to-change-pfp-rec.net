async function getClientHints() {
    if (navigator.userAgentData) {
        // Brands and versions (maps to sec-ch-ua)
        const brands = navigator.userAgentData.brands
            .map(b => `"${b.brand}";v="${b.version}"`)
            .join(", ");

        // Platform (maps to sec-ch-ua-platform)
        const platform = `"${navigator.userAgentData.platform}"`;

        return { brands, platform };
    } else {
        // Fallback for older browsers
        return {
            brands: `"Not?A_Brand";v="0"`,
            platform: `"Unknown"`
        };
    }
}

const { brands, platform } = await getClientHints();

async function fetchDataAndStore() {
    const apiUrl = "https://rec.net/api/auth/session";
    const options = {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": brands,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": platform,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://rec.net/",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    };
    let apiData = null;

    try {
        const response = await fetch(apiUrl, options);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response body as JSON
        const data = await response.json();

        // Store the parsed data in the variable
        apiData = data;

        const token = apiData.accessToken;
        return token;
        //console.log("Stored API data:", apiData);
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
    }
}

async function changeBanner(token) {
    const imageID = prompt("What's your imageID (including extension)?");
    const apiUrl = "https://accounts.rec.net/account/me/bannerimage";
    const options = {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "authorization": "Bearer "+token,
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryFuYJk23oBhqGsJ8Y",
            "priority": "u=1, i",
            "sec-ch-ua": brands,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": platform,
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        },
        "referrer": "https://rec.net/",
        "body": "------WebKitFormBoundaryFuYJk23oBhqGsJ8Y\r\nContent-Disposition: form-data; name=\"imageName\"\r\n\r\n"+imageID+"\r\n------WebKitFormBoundaryFuYJk23oBhqGsJ8Y--\r\n",
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
    };

    fetch(apiUrl, options);
}

async function main() {
    const token = await fetchDataAndStore();
    //console.log(token);

    changeBanner(token);

}

main();

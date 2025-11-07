

fetch("https://accounts.rec.net/account/me/profileimage", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "authorization": "[INSERT_TOKEN_HERE]",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryFuYJk23oBhqGsJ8Y",
        "priority": "u=1, i",
        "sec-ch-ua": "[INSERT_BROWSER_HERE]",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "[INSERT_PLATFORM_HERE]",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
    },
    "referrer": "https://rec.net/",
    "body": "------WebKitFormBoundaryFuYJk23oBhqGsJ8Y\r\nContent-Disposition: form-data; name=\"imageName\"\r\n\r\n7bswahxqcctepdo1y6cr52x07.jpg\r\n------WebKitFormBoundaryFuYJk23oBhqGsJ8Y--\r\n",
    "method": "PUT",
    "mode": "cors",
    "credentials": "include"
});
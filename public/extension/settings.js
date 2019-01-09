const url = JSON.parse(localStorage.getItem("url")) || "http://localhost:8081/"; // TODO: Probably change this before v1
document.querySelector('#server').value = url;

document.querySelector('#permissions').addEventListener('click', function(event) {
    // Permissions must be requested from inside a user gesture, like a button's
    // click handler.
    const url = document.querySelector('#server').value;
    if (!url.endsWith("/")) {
        url += "/";
    }
    chrome.permissions.request({
        permissions: ['tabs'],
        origins: [url]
    }, function(granted) {
        // The callback argument will be true if the user granted the permissions.
        if (granted) {
            localStorage.setItem("url", JSON.stringify(url))
            console.log('Set the url.');
            chrome.runtime.sendMessage({message: "changeServer", url: url});
        } else {
            console.log("boo");
        }
    });
});


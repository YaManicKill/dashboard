
self.addEventListener('message', function(event) {
    const data = typeof event === "object" ? event.data : {message: event.data};
    switch (data.message) {
        case "check_for_update":
            send_message_to_all_clients({message: "checking_for_update"});
            if (location.protocol === "chrome-extension:") {
                // We need to check if there's an update to the extension only if we are in the extension
                const domain = data.domain;
                fetch(domain ? `${domain}version` : 'version')
                    .then((res) => res.json())
                    .then((newData) => data.version !== newData.version ? send_message_to_all_clients({message: "update"}) : send_message_to_all_clients({message: "no_update"}))
                    .catch(() => send_message_to_all_clients({message: "no_update"}));
                break;
            } else {
                send_message_to_all_clients({message: "no_update"});
            }
    }
});

function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}

function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}
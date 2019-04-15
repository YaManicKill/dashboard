var Rail = require("national-rail-darwin");
var rail = new Rail("1d07b96d-3035-4ece-a643-3e4564df35c2");

rail.getDepartureBoardWithDetails("HYM", {destination: "INK"}, (err, {trainServices}) => {
    if (err) {
        console.log("Err");
        console.log(err);
    } else {
        trainServices.forEach((train) => {
            console.log(`${train.std}: ${train.etd} (platform: ${train.platform}, Carriages: ${train.length}, To: ${train.destination.name})`);
        });
    }
});
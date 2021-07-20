d3.csv("./CS416_CountryRegion.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Country);
        console.log(data[i].Area);
        console.log(data[i].Region);
    }
});

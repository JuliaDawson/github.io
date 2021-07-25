var width = 900;
var height = 600;

var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

//Read Topo file and CSV containing economic information
//var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var worldmap = d3.json("countries-110m-edited.json");
var econcsv = d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv", function(data) {
    return {	
            countryName: data.DISPCountry,
	    region:     data.DISPRegion,
	    giniIndex: +data.DIGiniIndex
    }	    
});					        
console.log("econcsv: " + econcsv);

Promise.all([worldmap, econcsv]).then(values => {
	
	console.log("values[0]: " + values[0]);
	console.log("values[1][0]: " + values[1][0]);

	var svg = d3.select('body').append("div")
		.append('svg')
        	.attr('width',width)
		.attr('height',height);
	
	var tooltip = d3.select("div.tooltip");
		
// d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//  .then(data => {

   var countries = topojson.feature(values[0], values[0].objects.countries).features; 
   
   svg.selectAll('path')
	   .data(countries)
	   .enter().append('path')
	   .attr('class','country')
	   .attr('fill', 'lightgrey')
	   .attr('stroke', 'black') 
	   .attr('stroke-width', '1')
	   .attr('d', path)
	   //.attr('fake', d=> console.log(d.properties.name))
    .on("mouseover", function(d,i) {
      console.log("mouseover  ",d.properties.name);	   
      d3.select(this).attr("fill","orange").attr("stroke-width",2);
      return tooltip.style("hidden", false).html("Name: " + d.properties.name + "<br>Region" " + d.properties.region + "<br>GiniIndex: " + d.properties.giniindex);
      })
    .on("mousemove",function(d){
       tooltip.classed("hidden", false)
               .style("top", (d3.event.pageY) + "px")
               .style("left", (d3.event.pageX + 10) + "px")
               .html("Name: " + d.properties.name + "<br>Region" " + d.properties.region + "<br>GiniIndex: " + d.properties.giniindex);
     })	
     .on("mouseout",function(d,i){
         d3.select(this).attr("fill","lightgrey").attr("stroke-width",1);
         tooltip.classed("hidden", true);
      });
    // add labels
    svg.selectAll("text")
        .data(values[1])
        .enter().append('text')
        .text(function(d) {
       tooltip.classed("hidden", false)
               //.style("top", (d3.event.pageY) + "px")
               //.style("left", (d3.event.pageX + 10) + "px")
               .html("Country: " + d.countryName + d.region + d.giniIndex);
               })
        //.attr("x", function(d) {return projection([d.Longitude, d.Lattitude])[0] + 5;})
        //.attr("y", function(d) {return projection([d.Longitude, d.Lattitude])[1] + 15;})
        .attr("x", function(d) {return 5;})
        .attr("y", function(d) {return 15;})
        .attr("class","labels");
	//console.log("In text:" + d.countryName + d.region + d.giniIndex);
});

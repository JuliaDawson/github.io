var width = 1400;
var height = 700;

var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

//Read Topo file and CSV containing economic information
var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var econcsv = d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv");

Promise.all([worldmap, econcsv]).then(function(values) {					        



	var svg = d3.select('body').append("div")
		.append('svg')
        	.attr('width',width)
		.attr('height',height);
	
	var tooltip = d3.select("div.tooltip");
		
// d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//  .then(data => {

//   var countries = topojson.feature(data, data.objects.countries).features; 
   
   svg.selectAll('path')
	   .data(values[0].features)
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
      return tooltip.style("hidden", false).html("Name: " + d.properties.name);
      })					
    .on("mousemove",function(d){
       tooltip.classed("hidden", false)
               .style("top", (d3.event.pageY) + "px")
               .style("left", (d3.event.pageX + 10) + "px")
               .html("Name: " + d.properties.name);
     })
     .on("mouseout",function(d,i){
         d3.select(this).attr("fill","lightgrey").attr("stroke-width",1);
         tooltip.classed("hidden", true);
      });

})

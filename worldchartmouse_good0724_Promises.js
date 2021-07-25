var width = 1400;
var height = 700;


//Read CSV and make a hash table
//d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv", function(data) {
//    return {	
//            countryName: data.DISPCountry,
//	    region:     data.DISPRegion,
//	    giniIndex: +data.DIGiniIndex
//    }	    
//    //console.log(data);	
//});					        

var econdata = d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv");
var worldmap = d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')

//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo
//https://www.youtube.com/watch?v=dJbpo8R47D0
var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

var svg = d3.select('body').append("div")
	.append('svg')
        .attr('width',width)
	.attr('height',height);
var tooltip = d3.select("div.tooltip");

Promise.all([worldmap, econdata]).then(function(values) {

   // var countries = topojson.feature(data, data.objects.countries).features; 
   
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
         tooltip.classed("hidden", true),
      })
	
	// draw points
    svg.selectAll("circle")
        .data(values[1])
        .enter()
        .append("circle")
        .attr("class","circles")
        .attr("cx", function(d) {return projection([d.Longitude, d.Lattitude])[0];})
        .attr("cy", function(d) {return projection([d.Longitude, d.Lattitude])[1];})
        .attr("r", "1px"),
    // add labels
     svg.selectAll("text")
        .data(values[1])
        .enter()
        .append("text")
        .text(function(d) {
            return d.DIGiniIndex;
            })
        .attr("x", function(d) {return projection([d.Longitude, d.Lattitude])[0] + 5;})
        .attr("y", function(d) {return projection([d.Longitude, d.Lattitude])[1] + 15;})
        .attr("class","labels");
});	   
	   /* Could replace with mouseover, mouseout, see www.youtube.com watch?v=aNbgrqRuoiE */

 })

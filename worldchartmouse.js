var width = 900;
var height = 600;


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
  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'white');
  // Append empty placeholder g element to the SVG
  // g will contain geometry elements
  var g = svg.append("g");


// const g = svg.append('g').attr("transform", "translate(50,50)");
		
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(data => {

   var countries = topojson.feature(data, data.objects.countries).features; 
   
   g.selectAll('.country')
	   .data(countries)
	   .enter().append('path')
	   .attr('class','country')
	   .attr('fill', 'lightgrey')
	   .attr('stroke', 'black') 
	   .attr('stroke-width', '1')
	   .attr('d', path)
	   /* Could replace with mouseover, mouseout, see www.youtube.com watch?v=aNbgrqRuoiE */
    .on("mouseover", function(d,i) {
      console.log("mouseover  ",d.properties.name);	   
      //tooltip.classed("hidden", false)
	//      .html("Name: " + d.properties.name);
      d3.select(this).attr("fill","orange").attr("stroke-width",2);
      })					
    .on("mousemove",function(d,i){
       tooltip.classed("hidden", false)
               .style("top", (d3.event.pageY) + "px")
               .style("left", (d3.event.pageX + 10) + "px")
               .html("Name: " + d.properties.name);
       d3.select(this).attr("fill","orange").attr("stroke-width",2);
     })
     .on("mouseout",function(d,i){
         tooltip.classed("hidden", true);
         d3.select(this).attr("fill","lightgrey").attr("stroke-width",1);
      });

})

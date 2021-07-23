var width = 900;
var height = 600;
var margin = 50;

//  .html(d => `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span><strong>Population: </strong><span class='details'>${format(d.population)}</span>`);  

//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo
//https://www.youtube.com/watch?v=dJbpo8R47D0
var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

       
  let svg = d3.select("#visualization").append("svg")
    .attr("width", width + margin + margin)
    .attr("height", height + margin + margin)
    .append("g")
    .attr("transform",
          "translate(" + margin + "," + margin + ")");
                   
  let div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0); 

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
    .on("mouseover", function(d) {
      console.log("mouseover  ",d.properties.name, d.population);
      d3.select(this).style('fill', 'orange');
      div.html("Country: " + d.properties.name)  
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY - 28) + "px");	
	   
      })					
    .on("mouseout", function(d) {
       d3.select(this).style('fill', 'lightgrey');	
    })

})

    
//create the zoom effect
var zoom = d3.zoom()
  .scaleExtent([1, 8])
  .on('zoom', function() {
      g.selectAll('path')
      .attr('transform', d3.event.transform);
  });

svg.call(zoom);
    


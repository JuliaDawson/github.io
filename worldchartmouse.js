var width = 900;
var height = 600;

<div id="visualization" align="center"></div> 
  <!--SVG is appended to this div-->  
</div>
//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo
//https://www.youtube.com/watch?v=dJbpo8R47D0
var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

var svg = d3.select('body')
	.append('svg')
        .attr('width',width)
	.attr('height',height)
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
	   .attr('fill', '#cccccc')
	   .attr('stroke', '#333333') 
	   .attr('stroke-width', '1')
	   .attr('d', path)
	   /* Could replace with mouseover, mouseout, see www.youtube.com watch?v=aNbgrqRuoiE */
    .on("mouseover", function(d) {		
      div.style("opacity", .9);		
      div.html("MegaWatts: " 
      + "</br>" + "Turbines: " 
      + "</br>" + "MW/T: " )	
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY - 28) + "px");	
      })					
    .on("mouseout", function(d) {		
      div.style("opacity", 0);	
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
    

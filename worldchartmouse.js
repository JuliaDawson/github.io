var width = 900;
var height = 600;

  <h1>Map Data Across the Globe</h1>
    
  <div id="visualization" align="center"></div> 
    <!--SVG is appended to this div-->  
  </div>
  
  <h3>Income Disparity -or- Shared Prosperity</h3>
  <h5>Zoom in/out | Hover over the data point for additional data</h5>
  
  <div id="tooltip">
    Name: <span id="name" class="info"></span><br>
  </div>
  

//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo
//https://www.youtube.com/watch?v=dJbpo8R47D0
var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

var svg = d3.select('body').append("div")
	.append('svg')
        .attr("class", "tooltip")
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
	   .attr('fill', 'lightgrey')
	   .attr('stroke', 'black') 
	   .attr('stroke-width', '1')
	   .attr('d', path)
	   /* Could replace with mouseover, mouseout, see www.youtube.com watch?v=aNbgrqRuoiE */
    .on("mouseover", function(d) {
      console.log("mouseover  ",d.properties.name);
      div.html("Country: " + d.properties.name)
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY - 28) + "px");	   
      d3.select(this).style('fill', 'orange');		
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
    


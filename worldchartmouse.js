const width = 900;
const height = 600;

const svg = d3.select('body').append('svg')
                .attr('width',width)
		.attr('height',height)
                .attr('margin', 50);
g = svg.append("g").attr("transform", "translate(" +margin+ "," +margin+ ")");

svg.append("text")
   .attr("x", (width/2))
   .attr("y", 25)
   .style("font-size", "16px")
   .style("text-decoration", "underline")
   .text("Income Disparity around the World"); 
				
//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo

const projection = d3.geoMercator().scale(140).translate([width/2,height/2]).scale(100);
const path = d3.geoPath(projection);

const g = svg.append('g');
		
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
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);
})

 // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity
            // Use D3 to select element, change color and size
	      console.log("handleMouseIn  ",d, i);
	      d3.select(this).attr({    
                fill: "orange"
              });
          }

      function handleMouseOut(d, i) {
	    console.log("handleMouseOut ",d, i);	
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "#cccccc"
            });
          }

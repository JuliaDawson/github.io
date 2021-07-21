const width = 900;
const height = 600;

const svg = d3.select('body').append('svg')
                .attr('width',width)
		.attr('height',height)
				
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
            d3.select(this).attr({
              fill: "orange",
              // r: radius * 2
            });

            // Specify where to put label of text
	    // Create an id for text so we can select it later for removing on mouseout
            //svg.append("text").attr({
            //   id: "t" + d.x + "-" + d.y + "-" + i,  
            //   x: function() { return xScale(d.x) - 30; },
            //    y: function() { return yScale(d.y) - 15; }
            //})
            //.text(function() {
            //  return [d.x, d.y];  // Value of the text
            //});
          }

      function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "#cccccc",
              //r: radius
            });

            // Select text by id and then remove
            // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); 
          }
	

  });

const width = 900;
const height = 600;

const svg = d3.select('body').append('svg')
                .attr('width',width)
		.attr('height',height)
				
//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo

const projection = d3.geoMercator().scale(140).translate([width/2,height/1.4]).scale(100);
const path = d3.geoPath(projection);

const g = svg.append('g');
		
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(data => {

   var countries = topojson.feature(data, data.objects.countries).features; 
   
   g.selectAll('.country')
	   .data(countries)
	   .enter().append('path')
	   .attr('class','country')
	   .attr('d', path)
	   /* Could replace with mouseover, mouseout, see www.youtube.com watch?v=aNbgrqRuoiE */
	   .on('click', function(d) {
	       d3.select(this).classed("selected". true)
            })


  });

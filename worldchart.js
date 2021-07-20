const width = 900;
const height = 600

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

   const countries = topojson.feature(data, data.objects.countries); 
   
   g.selectAll('path').data(countries.features).enter().append('path').attr('class','country').attr('d', path).attr('fill','#ccc');
  });

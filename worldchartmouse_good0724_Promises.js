var width = 900;
var height = 600;

console.log("in new wcm promises js");
const fetchTopo = fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
Promise.all([fetchTopo]).then(valuet => {
   valuet.map(r => r.json())); 
   console.log(valuet);
});
const fetchcsv  = fetch('MatchTopo_Distribution_of_income_Shared_Prosperity.csv');
Promise.all([fetchcsv]).then(valuec => {
   valuec.map(r => r.csv())); 
   console.log(valuec);
});	

//Read CSV and make a hash table
d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv", function(data) {
    return {	
            countryName: data.DISPCountry,
	    region:     data.DISPRegion,
	    giniIndex: +data.DIGiniIndex
    }	    
    console.log(data);	
});					        



//d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv", function(data) {
//				console.log(data);				
//			});

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
		
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(data => {

   var countries = topojson.feature(data, data.objects.countries).features; 
   
   svg.selectAll('path')
	   .data(countries)
	   .enter().append('path')
	   .attr('class','country')
	   .attr('fill', 'lightgrey')
	   .attr('stroke', 'black') 
	   .attr('stroke-width', '1')
	   .attr('d', path)
	   .attr('fake', d=> console.log(d.properties.name))
	   /* Could replace with mouseover, mouseout, see www.youtube.com watch?v=aNbgrqRuoiE */
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

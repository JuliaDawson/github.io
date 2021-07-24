var width = 900;
var height = 600;

//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo
//https://www.youtube.com/watch?v=dJbpo8R47D0
var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

var svg = d3.select("svg")
            .append("g")
            .attr("width", width)
            .attr("height", height);
var tooltip = d3.select("div.tooltip");
d3.queue()
  .defer(d3.json, "world-110m.json")
  .defer(d3.csv, "world-country-names.csv")
  .await(ready);
function ready(error, world, names) {
  if (error) throw error;
  var countries1 = topojson.feature(world, world.objects.countries).features;
    countries = countries1.filter(function(d) {
    return names.some(function(n) {
      if (d.id == n.id) return d.name = n.name;
    })});
  svg.selectAll("path")
			.data(countries)
			.enter()
			.append("path")
			.attr("stroke","green")
			.attr("stroke-width",1)
            .attr("fill", "white")
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this).attr("fill","grey").attr("stroke-width",2);
                return tooltip.style("hidden", false).html(d.name);
            })
            .on("mousemove",function(d){
                tooltip.classed("hidden", false)
                       .style("top", (d3.event.pageY) + "px")
                       .style("left", (d3.event.pageX + 10) + "px")
                       .html(d.name);
            })
            .on("mouseout",function(d,i){
                d3.select(this).attr("fill","white").attr("stroke-width",1);
                tooltip.classed("hidden", true);
            });
};

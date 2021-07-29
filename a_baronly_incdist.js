/*============================================================================================================*/
/* start of Map Chart function                                                                                         */
/*------------------------------------------------------------------------------------------------------------*/
function MapChart(dataIn) {
var width = 900;
var height = 400;

console.log("in MapChart: datain " + datain);	

	var svg = d3.select('body').append("div")
		.append('svg')
        	.attr('width',width)
		.attr('height',height);
	
	var tooltip = d3.select("div.tooltip");
		
// d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//  .then(data => {

   var countries = topojson.feature(dataIn, dataIn.objects.countries).features; 
   
   svg.selectAll('path')
	   .data(countries)
	   .enter().append('path')
	   .attr('class','country')
	   //.attr('fill', 'lightgrey')
	   .attr("fill", function(d) { 
             //console.log("d", d)
             //console.log("giniIndex", d.properties.giniindex)
             var col =  d3.interpolateBlues((d.properties.giniindex - 20) / 44); 
             //console.log("col", col)
             if (col) {
               //console.log("found col", col, "for d", d)
               return col
             } else {
               return 'white'
             }
           })
	   .attr('stroke', 'black') 
	   .attr('stroke-width', '1')
	   .attr('d', path)
	   //.attr('fake', d=> console.log(d.properties.name))
    .on("mouseover", function(d,i) {
      //console.log("mouseover  ",d.properties.name);	   
      //console.log("mouseover  ",d.properties.region);	   
      //console.log("mouseover  ",d.properties.giniindex);	   
      d3.select(this)
	      .attr("stroke","black").attr("stroke-width",4);
      //      .attr("fill","orange").attr("stroke-width",2);
      //return tooltip.style("hidden", false).html("Country: " + d.properties.name + d.properties.region  + d.properties.giniindex)
      return tooltip.style("hidden", false)
	.html("Country: " + d.properties.name  + "<br>" + "Region: " + d.properties.region 
      			 + "<br>" + "GiniIndex: " + d.properties.giniindex);
      })
    .on("mousemove",function(d){
       tooltip.classed("hidden", false)
               .style("top", (d3.event.pageY) + "px")
               .style("left", (d3.event.pageX + 10) + "px")
               //.html("Country: " + d.properties.name + d.properties.region + d.properties.giniindex)
	.html("Country: "  + "<b>" + d.properties.name  + "</b>"   + "<br>" + "Region: "  + "<b>" + d.properties.region  + "</b>"  
      			 + "<br>" + "GiniIndex: "  + "<b>" + d.properties.giniindex  + "</b>" );
     })	
     .on("mouseout",function(d,i){
         d3.select(this)
	 .attr("stroke","black")
	 .attr("stroke-width",1);
         tooltip.classed("hidden", true);
      })

}

/*------------------------------------------------------------------------------------------------------------*/	    
/* End of Map Chart function                                                                                  */
/*============================================================================================================*/
/*============================================================================================================*/
/* Main program: Read files and wait for promise, then call plot functions                                    */
/*------------------------------------------------------------------------------------------------------------*/
var width = 900;
var height = 400;
console.log("Main program:" + width + height);
d3.selectAll('svg > g > *').remove(); 

var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

//var color = d3.scaleThreshold()
//    .domain(d3.range(0, 70))
//    .range(d3.interpolateBlues(20));

//Read Topo file and CSV containing economic information
//var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var worldmap = d3.json("countries-110m-edited_wout_Antarctica.json");
var econcsv = d3.csv("MatchTopo_Distribution_of_income_Shared_Prosperity.csv", function(data) {
    return {	
            countryName: data.DISPCountry,
	    region:     data.DISPRegion,
	    giniIndex: +data.DIGiniIndex
    }	    
					        
console.log("econcsv: " + econcsv);

Promise.all([worldmap, econcsv]).then(values => {
	
	console.log("values[0]: " + values[0]);
	console.log("values[1][0]: " + values[1][0]);
        MapChart(values[0]);
})
});

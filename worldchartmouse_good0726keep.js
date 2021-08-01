//Set the initial region value
let regionGl = '';
let regionName = '';	
let priorregionGl = '';	
let currDataBarChart = [];	

/*============================================================================================================*/
/* start of Map Chart Big                                                                                          */
/*------------------------------------------------------------------------------------------------------------*/
function dsMapChartBig() {
var width = 900;
var height = 400;

var projection = d3.geoMercator().translate([width/2,height/2]).scale(100);
var path = d3.geoPath().projection(projection);

//Read Topo file and CSV containing economic information
//var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var worldmap = d3.json("countries-110m-edited_wout_Antarctica.json");

Promise.all([worldmap]).then(values => {

	
d3.select("#mapChartBigTitle")
        .attr("x", (width / 2))             
        .attr("y", 15)
        .attr("text-anchor", "middle")  
	.attr("class","title")	 
        .text("World Map with Gini Index (click, zoom)");

d3.select("#mapChartBig")
	.append("svg:svg")
	.attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	.attr("height", height)
	.text("World Map with Gini Index (click, zoom)")
	.append("svg:g")                //make a group to hold our map chart
	.attr("transform", "translate(10,100)");

	
 var tooltip = d3.select("div.tooltip");	
 d3.select("#mapChartBigTT");		
 var countries = topojson.feature(values[0], values[0].objects.countries).features; 
  
d3.select("#mapChartBigPath")	
        .selectAll('path')
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
	.html( "<b>" + d.properties.name + "</b>"  
	      + "<br>"  + d.properties.region  
	      + "<br>" +  "GiniIndex: "  + "<b>" + d.properties.giniindex  + "</b>" );
      })
    .on("mousemove",function(d){
       tooltip.classed("hidden", false)
               .style("top", (d3.event.pageY) + "px")
               .style("left", (d3.event.pageX + 10) + "px")
               //.html("Country: " + d.properties.name + d.properties.region + d.properties.giniindex)
	.html( "<b>" + d.properties.name + "</b>"  
	      + "<br>"  + d.properties.region  
	      + "<br>" +  "GiniIndex: "  + "<b>" + d.properties.giniindex  + "</b>" );
     })	
     .on("mouseout",function(d,i){
         d3.select(this)
	 .attr("stroke","black")
	 .attr("stroke-width",1);
         tooltip.classed("hidden", true);
	 console.log("Mouseout: " + this);  
      })
     .on("click",function(d,i){
	 console.log("Click: ", d.properties.region, regionGl); 
	 if (regionGl != d.properties.region) {
	     console.log("Region changed from:", regionGl, " To:", d.properties.region);	 
             regionGl = d.properties.region;
		 
             currDataBarChart = dataBarChosen(regionGl); //Refine data to clicked Region
		 
	     if (regionGl == "South/Latin America" || regionGl == "North America") {
		regionName = "North and South/Latin America";     
	     }
             dsScattChartSP1(regionGl); //refresh Scatter Chart 1
             dsScattChartSP2(regionGl); //refresh Scatter Chart 1
	     priorregionGl = regionGl; 	 
	 } 
      })
})
}	
/*------------------------------------------------------------------------------------------------------------*/	    
/* End of Map Chart Big                                                                                         */
/*============================================================================================================*/

/*============================================================================================================*/
/* ...Run dsMapChartBig now... 
/*============================================================================================================*/
  
    dsMapChartBig(); //mapChart will cause barChart and lineChart to refresh if necessary

async function init() 
{
	// set up locations
	d3.select('#mapChartBig').attr("transform",   "translate(10,0)");	
	//d3.select('#mapChartWI').attr("transform",   "translate(10,0)");	
	//d3.select('#scattChartSP1').attr("transform",  "translate(400,15)");	
	//d3.select('#scattChartSP2').attr("transform",  "translate(400,250)");	
}

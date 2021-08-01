//Set the initial region value
let regionGl = '';
let regionName = '';	
let priorregionGl = '';	
let currDataBarChart = [];

function toPage1() {
	console.log("toPage1: are here...");
	showPage1();
}
function toPage2() {
	showPage2();
}
function toPage3() {
	showPage3();
}

function showPage1() {
	console.log("showPage1: are here...");
	opPage2("0");
	opPage3("0");
	opPage1("100");
        dsMapChartBig(); //mapChart Big is the opening page
}
function showPage2() {
	opPage1("0");
	opPage3("0");
	opPage2("100");
	
	//Set the initial region value
	let regionGl = '';
	let regionName = '';	
	let priorregionGl = '';	
	let currDataBarChartWI = [];
	
	/*============================================================================================================*/
	/* ...Run dsMapChartWI now... 
	 *    dsMapChartSP detects a click on a Country, whereupon only the Region of Country is read from the CSV data.
	 *    The CSV data is displayed on the bar chart and line chart. The map will tell them to refresh if the
	 *    region has changed, and thus the data to present has changed, due to a click on one of the map countries */
	/*============================================================================================================*/
        dsMapChartWI(); //mapChart will cause barChart and lineChart to refresh if necessary}
}
function showPage3() {
	opPage1("0");
	opPage2("0");
	opPage3("100");
	
	//Set the initial region value
	let regionGl = '';
	let regionName = '';	
	let priorregionGl = '';	
	let currDataBarChartSP = [];
	
	/*============================================================================================================*/
	/* ...Run dsMapChartSP now... 
	 *    dsMapChartSP detects a click on a Country, whereupon only the Region of Country is read from the CSV data.
	 *    The CSV data is displayed on the bar chart and line chart. The map will tell them to refresh if the
	 *    region has changed, and thus the data to present has changed, due to a click on one of the map countries */
	/*============================================================================================================*/
        dsMapChartSP(); //mapChart will cause barChart and lineChart to refresh if necessary}
}	

function opPage1(op)
{
	console.log("opPage1: opacity", op);	
	//d3.select('#page1Header').attr("opacity", op);
	//d3.select('#page1Footer').attr("opacity", op);
	d3.select('#mapChartBig').attr("opacity", op);
	if (op == "0")
	{
	d3.select('#mapChartBigPath').html('');
	d3.select('#mapChartBigTT').html('');
	}
}
function opPage2(op)
{
	console.log("opPage2: opacity", op);	
	//d3.select('#page2Header').attr("opacity", op);
	//d3.select('#page2Footer').attr("opacity", op);
	d3.select('#mapChartWI').attr("opacity", op);
	d3.select('#giniBarChart').attr("opacity", op);
	d3.select('#scattChartWI').attr("opacity", op);
	
	if (op == "0")
	{
	d3.select('#mapChartWIPath').html('');
	d3.select('#mapChartWITT').html('');
	d3.select('#giniBarChRect').html('');
	d3.select('#giniBarChXaxis').html('');
	d3.select('#giniBarChTitle').html('');
	d3.select('#giniBarChLabels').html('');
	d3.select('#scattChWISpots').html('');
	d3.select('#scattChWIXaxis').html('');
	d3.select('#scattChWIYaxis').html('');
	d3.select('#scattChWITitle').html('');
	d3.select('#scattChWILabels').html('');
	}
}
function opPage3(op)
{
	console.log("opPage3: opacity", op);	
	//d3.select('#page3Header').attr("opacity", op);
	//d3.select('#page3Footer').attr("opacity", op);
	d3.select('#mapChartSP').attr("opacity", op);
	d3.select('#scattChartSP1').attr("opacity", op);

	if (op == "0")
	{
		d3.select('#mapChartSPPath').html('');
		d3.select('#mapChartSPTT').html('');
		d3.select('#scattChSP1Spots').html('');
		d3.select('#scattChSP1Xaxis').html('');
		d3.select('#scattChSP1Yaxis').html('');
		d3.select('#scattChSP1Title').html('');
		d3.select('#scattChSP1Labels').html('');
		d3.select('#scattChSP2TT').html('');
		d3.select('#scattChSP2Spots').html('');
		d3.select('#scattChSP2Xaxis').html('');
		d3.select('#scattChSP2Yaxis').html('');
		d3.select('#scattChSP2Title').html('');
		d3.select('#scattChSP2Labels').html('');
		d3.select('#scattChSP2TT').html('');
	}
}

/*============================================================================================================*/
/*============================================================================================================*/
/*============================================================================================================*/
/* PAGE 1 START  Big Gini Map                                                                                         */
/*------------------------------------------------------------------------------------------------------------*/
/*============================================================================================================*/
/* start of Map Chart Big                                                                                          */
/*------------------------------------------------------------------------------------------------------------*/
function dsMapChartBig() {
var width = 1000;
var height = 500;
var margin = 10;	

var projection = d3.geoMercator().translate([width/2,height/2]).scale(90);
var path = d3.geoPath().projection(projection);

//Read Topo file and CSV containing economic information
//var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var worldmap = d3.json("countries-110m-edited_wout_Antarctica.json");

Promise.all([worldmap]).then(values => {

d3.select("#mapChartBigTitle")
	.append("svg:svg")
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
})
}	
/*------------------------------------------------------------------------------------------------------------*/	    
/* End of Map Chart Big                                                                                         */
/*============================================================================================================*/

/*============================================================================================================*/
/* ...Run dsMapChartBig now... 
/*============================================================================================================*//*------------------------------------------------------------------------------------------------------------*/
/* PAGE 1 END  Big Gini Map                                                                                         */
/*============================================================================================================*/
/*============================================================================================================*/
/*============================================================================================================*/


/*============================================================================================================*/
/*============================================================================================================*/
/*============================================================================================================*/
/* PAGE 2 START  WI                                                                                         */
/*------------------------------------------------------------------------------------------------------------*/

/*============================================================================================================*/
/* start of Map Chart WI                                                                                         */
/*------------------------------------------------------------------------------------------------------------*/
function dsMapChartWI(){
var height = 300;
var width = 300;
var margin = 10;	

console.log("dsMapChartWI: I am here");
	
//d3.selectAll('svg > g > *').remove(); 

var projection = d3.geoMercator().translate([width/2,height/2]).scale(55);
var path = d3.geoPath().projection(projection);

//Read Topo file and CSV containing economic information
//var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var worldmap = d3.json("countries-110m-edited_wout_Antarctica.json");

console.log("dsMapChartWI: before promise");
	
Promise.all([worldmap]).then(values => {
console.log("dsMapChartWI: after promise");

	
d3.select("#mapChartWITitle")
        .attr("x", (width / 2))             
        .attr("y", 15)
        .attr("text-anchor", "middle")  
	.attr("class","title")	 
        .text("World Map with Gini Index (click, zoom)");

console.log("dsMapChartWI: after #mapChartWITitle");
	
d3.select("#mapChartWI")
	.append("svg:svg")
	.attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	.attr("height", height)
	.text("World Map with Gini Index (click, zoom)")
	.append("svg:g")                //make a group to hold our map chart
	.attr("transform", "translate(10,100)");

	
 var tooltip = d3.select("div.tooltip");	
 d3.select("#mapChartWITT");		
 var countries = topojson.feature(values[0], values[0].objects.countries).features; 
 console.log("dsMapChartWI: after var Countries");
 
d3.select("#mapChartWIPath")	
        .selectAll('path')
	.data(countries)
	.enter().append('path')
	.attr('class','country')
	.attr("fill", function(d) { 
             console.log("d", d)
             console.log("giniIndex", d.properties.giniindex)
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
		 
             currDataBarChart = dataBarChosenWI(regionGl); //Refine data to clicked Region
		 
	     if (regionGl == "South/Latin America" || regionGl == "North America") {
		regionName = "North and South/Latin America";     
	     }
             dsBarChartWI(regionGl); //refresh Bar Chart
             dsScattChartWI(regionGl); //refresh Line Chart
	     priorregionGl = regionGl; 	 
	 } 
      })
 console.log("dsMapChartWI: after #mapChartWIPath");
	
opPage2("100");
console.log("dsMapChartWI: after opPage2");
	
})
}
/*------------------------------------------------------------------------------------------------------------*/	    
/* End of Map Chart WI                                                                                         */
/*============================================================================================================*/

	    
/*============================================================================================================*/
/* Start of Bar Chart  Gini Index                                                                                          */
/*------------------------------------------------------------------------------------------------------------*/	    
 var dataBarChartWI = [
{ countryName: "South Africa", region: "Africa",  giniIndex: 63, incPctHi10: 50.5, incPctLo10: 0.9 },
{ countryName: "Namibia", region: "Africa",  giniIndex: 59.1, incPctHi10: 47.3, incPctLo10: 1 },
{ countryName: "Zambia", region: "Africa",  giniIndex: 57.1, incPctHi10: 44.4, incPctLo10: 1 },
{ countryName: "Sao Tome and Principe", region: "Africa",  giniIndex: 56.3, incPctHi10: 49.1, incPctLo10: 1.3 },
{ countryName: "Central African Rep.", region: "Africa",  giniIndex: 56.2, incPctHi10: 46.2, incPctLo10: 1.2 },
{ countryName: "eSwatini", region: "Africa",  giniIndex: 54.6, incPctHi10: 42.7, incPctLo10: 1.4 },
{ countryName: "Mozambique", region: "Africa",  giniIndex: 54, incPctHi10: 45.5, incPctLo10: 1.6 },
{ countryName: "Botswana", region: "Africa",  giniIndex: 53.3, incPctHi10: 41.5, incPctLo10: 1.5 },
{ countryName: "Angola", region: "Africa",  giniIndex: 51.3, incPctHi10: 39.6, incPctLo10: 1.3 },
{ countryName: "Guinea-Bissau", region: "Africa",  giniIndex: 50.7, incPctHi10: 42, incPctLo10: 1.6 },
{ countryName: "Congo", region: "Africa",  giniIndex: 48.9, incPctHi10: 37.9, incPctLo10: 1.6 },
{ countryName: "Benin", region: "Africa",  giniIndex: 47.8, incPctHi10: 37.6, incPctLo10: 1 },
{ countryName: "Seychelles", region: "Africa",  giniIndex: 46.8, incPctHi10: 39.9, incPctLo10: 1.9 },
{ countryName: "Cameroon", region: "Africa",  giniIndex: 46.6, incPctHi10: 35, incPctLo10: 1.7 },
{ countryName: "S. Sudan", region: "Africa",  giniIndex: 46.3, incPctHi10: 33.2, incPctLo10: 1.3 },
{ countryName: "Lesotho", region: "Africa",  giniIndex: 44.9, incPctHi10: 32.9, incPctLo10: 1.7 },
{ countryName: "Malawi", region: "Africa",  giniIndex: 44.7, incPctHi10: 38.1, incPctLo10: 2.6 },
{ countryName: "Zimbabwe", region: "Africa",  giniIndex: 44.3, incPctHi10: 34.8, incPctLo10: 2.5 },
{ countryName: "Rwanda", region: "Africa",  giniIndex: 43.7, incPctHi10: 35.6, incPctLo10: 2.4 },
{ countryName: "Ghana", region: "Africa",  giniIndex: 43.5, incPctHi10: 32.2, incPctLo10: 1.6 },
{ countryName: "Chad", region: "Africa",  giniIndex: 43.3, incPctHi10: 32.4, incPctLo10: 1.8 },
{ countryName: "Togo", region: "Africa",  giniIndex: 43.1, incPctHi10: 31.6, incPctLo10: 1.9 },
{ countryName: "Uganda", region: "Africa",  giniIndex: 42.8, incPctHi10: 34.2, incPctLo10: 2.5 },
{ countryName: "Madagascar", region: "Africa",  giniIndex: 42.6, incPctHi10: 33.5, incPctLo10: 2.2 },
{ countryName: "Cabo Verde", region: "Africa",  giniIndex: 42.4, incPctHi10: 32.3, incPctLo10: 2.2 },
{ countryName: "Dem. Rep. Congo", region: "Africa",  giniIndex: 42.1, incPctHi10: 32, incPctLo10: 2.1 },
{ countryName: "Côte d'Ivoire", region: "Africa",  giniIndex: 41.5, incPctHi10: 31.9, incPctLo10: 2.1 },
{ countryName: "Kenya", region: "Africa",  giniIndex: 40.8, incPctHi10: 31.6, incPctLo10: 2.4 },
{ countryName: "Tanzania", region: "Africa",  giniIndex: 40.5, incPctHi10: 33.1, incPctLo10: 2.9 },
{ countryName: "Senegal", region: "Africa",  giniIndex: 40.3, incPctHi10: 31, incPctLo10: 2.3 },
{ countryName: "Burundi", region: "Africa",  giniIndex: 38.6, incPctHi10: 31, incPctLo10: 2.8 },
{ countryName: "Gabon", region: "Africa",  giniIndex: 38, incPctHi10: 27.7, incPctLo10: 2.2 },
{ countryName: "Mauritius", region: "Africa",  giniIndex: 36.8, incPctHi10: 29.9, incPctLo10: 2.9 },
{ countryName: "Gambia", region: "Africa",  giniIndex: 35.9, incPctHi10: 28.7, incPctLo10: 3 },
{ countryName: "Sierra Leone", region: "Africa",  giniIndex: 35.7, incPctHi10: 29.4, incPctLo10: 3.4 },
{ countryName: "Burkina Faso", region: "Africa",  giniIndex: 35.3, incPctHi10: 29.6, incPctLo10: 3.6 },
{ countryName: "Liberia", region: "Africa",  giniIndex: 35.3, incPctHi10: 27.1, incPctLo10: 2.9 },
{ countryName: "Nigeria", region: "Africa",  giniIndex: 35.1, incPctHi10: 26.7, incPctLo10: 2.9 },
{ countryName: "Ethiopia", region: "Africa",  giniIndex: 35, incPctHi10: 28.5, incPctLo10: 2.9 },
{ countryName: "Niger", region: "Africa",  giniIndex: 34.3, incPctHi10: 27, incPctLo10: 3.2 },
{ countryName: "Guinea", region: "Africa",  giniIndex: 33.7, incPctHi10: 26.4, incPctLo10: 3 },
{ countryName: "Mali", region: "Africa",  giniIndex: 33, incPctHi10: 25.7, incPctLo10: 3.3 },
{ countryName: "Comoros", region: "Arab States",  giniIndex: 45.3, incPctHi10: 33.7, incPctLo10: 1.6 },
{ countryName: "Djibouti", region: "Arab States",  giniIndex: 41.6, incPctHi10: 32.3, incPctLo10: 1.9 },
{ countryName: "Morocco", region: "Arab States",  giniIndex: 39.5, incPctHi10: 31.9, incPctLo10: 2.7 },
{ countryName: "Sudan", region: "Arab States",  giniIndex: 34.2, incPctHi10: 27.8, incPctLo10: 3.2 },
{ countryName: "Tunisia", region: "Arab States",  giniIndex: 32.8, incPctHi10: 25.6, incPctLo10: 3.2 },
{ countryName: "Mauritania", region: "Arab States",  giniIndex: 32.6, incPctHi10: 24.9, incPctLo10: 3 },
{ countryName: "Algeria", region: "Arab States",  giniIndex: 27.6, incPctHi10: 22.9, incPctLo10: 4 },
{ countryName: "Philippines", region: "Asia & Pacific",  giniIndex: 44.4, incPctHi10: 34.8, incPctLo10: 2.3 },
{ countryName: "Papua New Guinea", region: "Asia & Pacific",  giniIndex: 41.9, incPctHi10: 31, incPctLo10: 1.9 },
{ countryName: "Malaysia", region: "Asia & Pacific",  giniIndex: 41, incPctHi10: 31.3, incPctLo10: 2.3 },
{ countryName: "Turkmenistan", region: "Asia & Pacific",  giniIndex: 40.8, incPctHi10: 31.7, incPctLo10: 2.6 },
{ countryName: "Micronesia", region: "Asia & Pacific",  giniIndex: 40.1, incPctHi10: 29.7, incPctLo10: 1.9 },
{ countryName: "Sri Lanka", region: "Asia & Pacific",  giniIndex: 39.8, incPctHi10: 32.9, incPctLo10: 2.9 },
{ countryName: "Tuvalu", region: "Asia & Pacific",  giniIndex: 39.1, incPctHi10: 30.7, incPctLo10: 2.7 },
{ countryName: "Samoa", region: "Asia & Pacific",  giniIndex: 38.7, incPctHi10: 31.3, incPctLo10: 2.7 },
{ countryName: "China", region: "Asia & Pacific",  giniIndex: 38.5, incPctHi10: 29.4, incPctLo10: 2.7 },
{ countryName: "Indonesia", region: "Asia & Pacific",  giniIndex: 37.8, incPctHi10: 29.3, incPctLo10: 2.9 },
{ countryName: "Tonga", region: "Asia & Pacific",  giniIndex: 37.6, incPctHi10: 29.7, incPctLo10: 2.8 },
{ countryName: "Vanuatu", region: "Asia & Pacific",  giniIndex: 37.6, incPctHi10: 29.4, incPctLo10: 2.7 },
{ countryName: "Bhutan", region: "Asia & Pacific",  giniIndex: 37.4, incPctHi10: 27.9, incPctLo10: 2.7 },
{ countryName: "Solomon Is.", region: "Asia & Pacific",  giniIndex: 37.1, incPctHi10: 29.2, incPctLo10: 2.8 },
{ countryName: "Kiribati", region: "Asia & Pacific",  giniIndex: 37, incPctHi10: 29.2, incPctLo10: 2.6 },
{ countryName: "Fiji", region: "Asia & Pacific",  giniIndex: 36.7, incPctHi10: 29.7, incPctLo10: 3.1 },
{ countryName: "Laos", region: "Asia & Pacific",  giniIndex: 36.4, incPctHi10: 29.8, incPctLo10: 3.2 },
{ countryName: "Thailand", region: "Asia & Pacific",  giniIndex: 36.4, incPctHi10: 28.2, incPctLo10: 3 },
{ countryName: "Syria", region: "Asia & Pacific",  giniIndex: 35.8, incPctHi10: 28.7, incPctLo10: 3.2 },
{ countryName: "India", region: "Asia & Pacific",  giniIndex: 35.7, incPctHi10: 30.1, incPctLo10: 3.5 },
{ countryName: "Vietnam", region: "Asia & Pacific",  giniIndex: 35.7, incPctHi10: 27.5, incPctLo10: 2.5 },
{ countryName: "Uzbekistan", region: "Asia & Pacific",  giniIndex: 35.3, incPctHi10: 28.3, incPctLo10: 2.9 },
{ countryName: "Australia", region: "Asia & Pacific",  giniIndex: 34.4, incPctHi10: 27, incPctLo10: 2.8 },
{ countryName: "Tajikistan", region: "Asia & Pacific",  giniIndex: 34, incPctHi10: 26.4, incPctLo10: 3 },
{ countryName: "Pakistan", region: "Asia & Pacific",  giniIndex: 33.5, incPctHi10: 28.9, incPctLo10: 3.9 },
{ countryName: "Japan", region: "Asia & Pacific",  giniIndex: 32.9, incPctHi10: 26.4, incPctLo10: 2.9 },
{ countryName: "Nepal", region: "Asia & Pacific",  giniIndex: 32.8, incPctHi10: 26.4, incPctLo10: 3.5 },
{ countryName: "Mongolia", region: "Asia & Pacific",  giniIndex: 32.7, incPctHi10: 25.7, incPctLo10: 3.3 },
{ countryName: "Bangladesh", region: "Asia & Pacific",  giniIndex: 32.4, incPctHi10: 26.8, incPctLo10: 3.7 },
{ countryName: "North Korea", region: "Asia & Pacific",  giniIndex: 31.6, incPctHi10: 23.8, incPctLo10: 2.6 },
{ countryName: "Maldives", region: "Asia & Pacific",  giniIndex: 31.3, incPctHi10: 25.2, incPctLo10: 3.4 },
{ countryName: "Myanmar", region: "Asia & Pacific",  giniIndex: 30.7, incPctHi10: 25.5, incPctLo10: 3.8 },
{ countryName: "Timor-Leste", region: "Asia & Pacific",  giniIndex: 28.7, incPctHi10: 24, incPctLo10: 4 },
{ countryName: "Kyrgyzstan", region: "Asia & Pacific",  giniIndex: 27.7, incPctHi10: 23.6, incPctLo10: 4.3 },
{ countryName: "Kazakhstan", region: "Asia & Pacific",  giniIndex: 27.5, incPctHi10: 23, incPctLo10: 4.3 },
{ countryName: "Azerbaijan", region: "Asia & Pacific",  giniIndex: 26.6, incPctHi10: 24.2, incPctLo10: 4.8 },
{ countryName: "Turkey", region: "Europe",  giniIndex: 41.9, incPctHi10: 32.6, incPctLo10: 2.2 },
{ countryName: "Bulgaria", region: "Europe",  giniIndex: 40.4, incPctHi10: 31.9, incPctLo10: 1.9 },
{ countryName: "Israel", region: "Europe",  giniIndex: 39, incPctHi10: 27.8, incPctLo10: 1.9 },
{ countryName: "Montenegro", region: "Europe",  giniIndex: 39, incPctHi10: 27.7, incPctLo10: 1.8 },
{ countryName: "Russia", region: "Europe",  giniIndex: 37.5, incPctHi10: 29.9, incPctLo10: 2.9 },
{ countryName: "Lithuania", region: "Europe",  giniIndex: 37.3, incPctHi10: 28.4, incPctLo10: 2.1 },
{ countryName: "Georgia", region: "Europe",  giniIndex: 36.4, incPctHi10: 27.5, incPctLo10: 2.4 },
{ countryName: "Serbia", region: "Europe",  giniIndex: 36.2, incPctHi10: 25.6, incPctLo10: 1.4 },
{ countryName: "Romania", region: "Europe",  giniIndex: 36, incPctHi10: 24.9, incPctLo10: 1.6 },
{ countryName: "Italy", region: "Europe",  giniIndex: 35.9, incPctHi10: 26.7, incPctLo10: 1.9 },
{ countryName: "Latvia", region: "Europe",  giniIndex: 35.6, incPctHi10: 26.9, incPctLo10: 2.3 },
{ countryName: "Luxembourg", region: "Europe",  giniIndex: 34.9, incPctHi10: 25.8, incPctLo10: 2.4 },
{ countryName: "United Kingdom", region: "Europe",  giniIndex: 34.8, incPctHi10: 26.8, incPctLo10: 2.8 },
{ countryName: "Spain", region: "Europe",  giniIndex: 34.7, incPctHi10: 25.4, incPctLo10: 2.1 },
{ countryName: "Armenia", region: "Europe",  giniIndex: 34.4, incPctHi10: 29.2, incPctLo10: 3.3 },
{ countryName: "Greece", region: "Europe",  giniIndex: 34.4, incPctHi10: 25.9, incPctLo10: 2.4 },
{ countryName: "Macedonia", region: "Europe",  giniIndex: 34.2, incPctHi10: 23.8, incPctLo10: 1.7 },
{ countryName: "Portugal", region: "Europe",  giniIndex: 33.8, incPctHi10: 26.7, incPctLo10: 2.7 },
{ countryName: "West Bank and Gaza", region: "Europe",  giniIndex: 33.7, incPctHi10: 25.2, incPctLo10: 2.9 },
{ countryName: "Albania", region: "Europe",  giniIndex: 33.2, incPctHi10: 24.8, incPctLo10: 3.1 },
{ countryName: "Bosnia and Herz.", region: "Europe",  giniIndex: 33, incPctHi10: 25.1, incPctLo10: 2.9 },
{ countryName: "Ireland", region: "Europe",  giniIndex: 32.8, incPctHi10: 25.9, incPctLo10: 3.1 },
{ countryName: "Switzerland", region: "Europe",  giniIndex: 32.7, incPctHi10: 25.5, incPctLo10: 3.1 },
{ countryName: "Germany", region: "Europe",  giniIndex: 31.9, incPctHi10: 24.6, incPctLo10: 2.9 },
{ countryName: "France", region: "Europe",  giniIndex: 31.6, incPctHi10: 25.8, incPctLo10: 3.2 },
{ countryName: "Cyprus", region: "Europe",  giniIndex: 31.4, incPctHi10: 25.5, incPctLo10: 3.4 },
{ countryName: "Hungary", region: "Europe",  giniIndex: 30.6, incPctHi10: 23.9, incPctLo10: 3 },
{ countryName: "Croatia", region: "Europe",  giniIndex: 30.4, incPctHi10: 22.8, incPctLo10: 2.7 },
{ countryName: "Estonia", region: "Europe",  giniIndex: 30.4, incPctHi10: 22.5, incPctLo10: 3 },
{ countryName: "Austria", region: "Europe",  giniIndex: 29.7, incPctHi10: 23, incPctLo10: 3 },
{ countryName: "Poland", region: "Europe",  giniIndex: 29.7, incPctHi10: 23.5, incPctLo10: 3.2 },
{ countryName: "Malta", region: "Europe",  giniIndex: 29.2, incPctHi10: 23.3, incPctLo10: 3.4 },
{ countryName: "Kosovo", region: "Europe",  giniIndex: 29, incPctHi10: 24.6, incPctLo10: 3.8 },
{ countryName: "Sweden", region: "Europe",  giniIndex: 28.8, incPctHi10: 22.3, incPctLo10: 3 },
{ countryName: "Denmark", region: "Europe",  giniIndex: 28.7, incPctHi10: 24, incPctLo10: 3.7 },
{ countryName: "Netherlands", region: "Europe",  giniIndex: 28.5, incPctHi10: 23.3, incPctLo10: 3.5 },
{ countryName: "Belgium", region: "Europe",  giniIndex: 27.4, incPctHi10: 21.9, incPctLo10: 3.3 },
{ countryName: "Finland", region: "Europe",  giniIndex: 27.4, incPctHi10: 22.6, incPctLo10: 3.8 },
{ countryName: "Norway", region: "Europe",  giniIndex: 27, incPctHi10: 21.6, incPctLo10: 3.3 },
{ countryName: "Iceland", region: "Europe",  giniIndex: 26.8, incPctHi10: 22.5, incPctLo10: 3.9 },
{ countryName: "Ukraine", region: "Europe",  giniIndex: 26.1, incPctHi10: 22, incPctLo10: 4.2 },
{ countryName: "Moldova", region: "Europe",  giniIndex: 25.7, incPctHi10: 22, incPctLo10: 4.4 },
{ countryName: "Belarus", region: "Europe",  giniIndex: 25.2, incPctHi10: 21.4, incPctLo10: 4.3 },
{ countryName: "Slovakia", region: "Europe",  giniIndex: 25.2, incPctHi10: 19.9, incPctLo10: 2.9 },
{ countryName: "Czechia", region: "Europe",  giniIndex: 24.9, incPctHi10: 21.5, incPctLo10: 4.2 },
{ countryName: "Slovenia", region: "Europe",  giniIndex: 24.2, incPctHi10: 20.4, incPctLo10: 4.1 },
{ countryName: "Iran", region: "Middle east",  giniIndex: 40.8, incPctHi10: 31.3, incPctLo10: 2.3 },
{ countryName: "Yemen", region: "Middle east",  giniIndex: 36.7, incPctHi10: 29.4, incPctLo10: 3 },
{ countryName: "Jordan", region: "Middle east",  giniIndex: 33.7, incPctHi10: 27.5, incPctLo10: 3.5 },
{ countryName: "United Arab Emirates", region: "Middle east",  giniIndex: 32.5, incPctHi10: 21.4, incPctLo10: 2.3 },
{ countryName: "Lebanon", region: "Middle east",  giniIndex: 31.8, incPctHi10: 24.8, incPctLo10: 3.1 },
{ countryName: "Egypt", region: "Middle east",  giniIndex: 31.5, incPctHi10: 26.9, incPctLo10: 3.8 },
{ countryName: "Iraq", region: "Middle east",  giniIndex: 29.5, incPctHi10: 23.7, incPctLo10: 3.7 },
{ countryName: "United States of America", region: "North America",  giniIndex: 41.1, incPctHi10: 30.4, incPctLo10: 1.8 },
{ countryName: "Canada", region: "North America",  giniIndex: 33.3, incPctHi10: 25.3, incPctLo10: 2.7 },
{ countryName: "Suriname", region: "South/Latin America",  giniIndex: 57.6, incPctHi10: 42.7, incPctLo10: 0.001 },
{ countryName: "Brazil", region: "South/Latin America",  giniIndex: 53.9, incPctHi10: 42.5, incPctLo10: 1 },
{ countryName: "Belize", region: "South/Latin America",  giniIndex: 53.3, incPctHi10: 42.4, incPctLo10: 0.9 },
{ countryName: "Honduras", region: "South/Latin America",  giniIndex: 52.1, incPctHi10: 39.1, incPctLo10: 0.9 },
{ countryName: "Saint Lucia", region: "South/Latin America",  giniIndex: 51.2, incPctHi10: 38.6, incPctLo10: 0.9 },
{ countryName: "Colombia", region: "South/Latin America",  giniIndex: 50.4, incPctHi10: 39.7, incPctLo10: 1.4 },
{ countryName: "Panama", region: "South/Latin America",  giniIndex: 49.2, incPctHi10: 37.1, incPctLo10: 1.2 },
{ countryName: "Guatemala", region: "South/Latin America",  giniIndex: 48.3, incPctHi10: 38, incPctLo10: 1.7 },
{ countryName: "Costa Rica", region: "South/Latin America",  giniIndex: 48, incPctHi10: 36.3, incPctLo10: 1.5 },
{ countryName: "Venezuela", region: "South/Latin America",  giniIndex: 46.9, incPctHi10: 34.1, incPctLo10: 0.5 },
{ countryName: "Nicaragua", region: "South/Latin America",  giniIndex: 46.2, incPctHi10: 37.2, incPctLo10: 2 },
{ countryName: "Paraguay", region: "South/Latin America",  giniIndex: 46.2, incPctHi10: 35.9, incPctLo10: 1.7 },
{ countryName: "Jamaica", region: "South/Latin America",  giniIndex: 45.5, incPctHi10: 35.8, incPctLo10: 2.1 },
{ countryName: "Ecuador", region: "South/Latin America",  giniIndex: 45.4, incPctHi10: 34.4, incPctLo10: 1.6 },
{ countryName: "Mexico", region: "South/Latin America",  giniIndex: 45.4, incPctHi10: 36.4, incPctLo10: 2 },
{ countryName: "Guyana", region: "South/Latin America",  giniIndex: 44.6, incPctHi10: 34.1, incPctLo10: 1.5 },
{ countryName: "Chile", region: "South/Latin America",  giniIndex: 44.4, incPctHi10: 36.3, incPctLo10: 2.3 },
{ countryName: "Dominican Rep.", region: "South/Latin America",  giniIndex: 43.7, incPctHi10: 35.2, incPctLo10: 2.3 },
{ countryName: "Peru", region: "South/Latin America",  giniIndex: 42.8, incPctHi10: 32.1, incPctLo10: 1.8 },
{ countryName: "Bolivia", region: "South/Latin America",  giniIndex: 42.2, incPctHi10: 30.4, incPctLo10: 1.5 },
{ countryName: "Argentina", region: "South/Latin America",  giniIndex: 41.4, incPctHi10: 29.9, incPctLo10: 1.8 },
{ countryName: "Haiti", region: "South/Latin America",  giniIndex: 41.1, incPctHi10: 31.2, incPctLo10: 2.1 },
{ countryName: "Uruguay", region: "South/Latin America",  giniIndex: 39.7, incPctHi10: 29.7, incPctLo10: 2.3 },
{ countryName: "El Salvador", region: "South/Latin America",  giniIndex: 38.6, incPctHi10: 29.4, incPctLo10: 2.4 },
 ];	 

function dataBarChosenWI(region) {
	var ds = [];
	if (region == "" || region == priorregionGl) {
		console.log("dataBarChosen: region is null or same as before:", region, priorregionGl);
	} //region is null
	else {
		if (region == "All") {
			regionName = "All";
			for (i in dataBarChartWI) {
				ds.push(dataBarChartWI[i]);
			}

		} //region is All
		else if (region == "South/Latin America" || region == "North America") {
			regionName = "North and South America";
			for (i in dataBarChartWI) {
				 if(dataBarChartWI[i].region=="South/Latin America" || dataBarChartWI[i].region == "North America"){
					ds.push(dataBarChartWI[i]);
				} 
			} //region is *America
		}	
		else {
			for (i in dataBarChartWI) {
				 regionName = region;
				 if(dataBarChartWI[i].region==region){
					ds.push(dataBarChartWI[i]);
				} 
			}
		} //region is one region		
	} //region is not null	
	return ds;   
}

function showBarChartWI(op)
{
	console.log("showBarChartWI: opacity", op, " regionGl:", regionGl, " priorregionGl:", priorregionGl);	
	d3.select('#giniBarChart').attr("opacity", op);
	
	if (op == '0')
	{
	console.log("showBarChartWI: opacity zero and emptied HTML");	
	console.log("...clearing html rightn now...", regionGl, priorregionGl);
	d3.select('#giniBarChRect').html('');
	d3.select('#giniBarChXaxis').html('');
	d3.select('#giniBarChTitle').html('');
	d3.select('#giniBarChLabels').html('');
	}
}


function dsBarChartWI(region) {

	console.log('In dsBarChartWI, region:', region);
	
//	if (region != priorregionGl && region != "") {
	if (region != "") {
	
		if (priorregionGl != "") {
			showBarChartWI("0");   //Hide and clear
		}
		showBarChartWI("100"); //Show


		console.log("currDataBarChart dataBarChosen for region: " + region);
		console.log("currDataBarChart[0]: ", currDataBarChart[0]);
		console.log("currDataBarChart.length: " + currDataBarChart.length);
		console.log("currDataBarChart[length]: ", currDataBarChart[currDataBarChart.length-1]);


		var margin = {top: 10, right: 30, bottom: 70, left: 10},
		    width = 600 - margin.left - margin.right,
		    height = 200 - margin.top - margin.bottom,
		    colorBar = d3.interpolateBlues((52 - 20) / 30),
		    barPadding = .1
		;

		var xScale = d3.scaleLinear()
				.domain([0, currDataBarChart.length])
				.range([0, width])
				;

		var yScale = d3.scaleLinear()
			   .domain([d3.min(currDataBarChart, function(d) { return d.giniIndex; }), d3.max(currDataBarChart, function(d) { return d.giniIndex; })])
			   .range([height, 0])
			   ;

		/*-----------------------*/
		/* For X axis - Country  */
		/*-----------------------*/
		const xAxis = d3.scaleBand()
		    .domain(currDataBarChart.map(d => d.countryName))
		    .range([ 0, width]);

		/*------------------------*/
		/* For Y axis - Gini Index */
		/*------------------------*/
		const yAxis = d3.scaleLinear()
		    .domain(currDataBarChart.map(d => d.giniIndex))
		    .range([d3.min(currDataBarChart, function(d) { return d.giniIndex; }), d3.max(currDataBarChart, function(d) { return d.giniIndex; })]);

		d3.select("#giniBarChart")
			    .append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			    .attr("transform", "translate(" + margin.left +  "," + margin.top + ")")
			    ;
		/*----------------------- */
		/* Add X axis - Country   */
		/*----------------------- */
		d3.select("#giniBarChXaxis")
		    .attr("transform", `translate(0, ${height + margin.top + 4} )`)
		    //.attr("transform", `translate(${margin.left}, ${height + margin.top + 14} )`)
		    .call(d3.axisBottom(xAxis))
		    .selectAll("text")
		      .attr("transform", "translate(-10,0) rotate(-45)")
		      .style("text-anchor", "end");

		/*-------------------------*/
		/* Add Y axis - Gini Index */
		/*-------------------------*/
		//d3.select("#giniBarChYaxis")
		//    .attr("transform", `translate(${margin.left}, ${margin.top + 14})`)
		//    .call(d3.axisLeft(yAxis))

		/*-------------------*/
		/* ...adding bars... */
		/*-------------------*/
		d3.select("#giniBarChRect").selectAll("rect")
			   .data(currDataBarChart)
			   .enter()
			   .append("rect")
				.attr("x", function(d, i) {
				    return xScale(i);
				})
			   .attr("width", width / currDataBarChart.length - barPadding)   
				.attr("y", function(d) {
				    return yScale(d.giniIndex);
				})  
				.attr("height", function(d) {
				    return (height - yScale(d.giniIndex) + 14);
				})
				.attr("fill", function(d) { 
				     //console.log("d", d)
				     //console.log("giniIndex", d.giniIndex)
				     var col =  d3.interpolateBlues((d.giniIndex - 20) / 44); 
				     //console.log("col", col)
				     if (col) {
					//console.log("found col", col, "for d", d)
					return col
				     } else {
					return 'white'
				     }
				})
				;

		/*----------------------------------*/
		/* ...adding labels on the bars ... */
		/*----------------------------------*/		
		d3.select("#giniBarChLabels").selectAll("text")
		    .data(currDataBarChart)
		    .enter()
  		    .append("text")
		    .text(function(d) {
			return d.giniIndex;
		     })
		.attr("text-anchor", "middle")
		.attr("transform", function(d, i) {
    			var yVal = yScale(d.giniIndex) - 10;
    			var xVal = (i * (width / currDataBarChart.length)) + ((width / currDataBarChart.length - barPadding) / 2) + barPadding;
    			return "translate(" + xVal + "," + yVal + ") rotate(270)";
  			})
		.attr("class", "y axis");

		// Title	
		d3.select("#giniBarChTitle").append("text")
			.attr("x", (width + margin.left + margin.right)/2)
			.attr("y", 0)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text("Distribution of Income - Gini Index, " + regionName)
			;
		showBarChartWI("100"); //should not need this, try to delete
		console.log("dsBarChartWI: done displaying ", region, " instead of ", priorregionGl);
		//priorregionGl = region; all done, save region to prior
	} //region ne null	
}

/*============================================================================================================*/
/* End of Bar Chart  Gini Index                                                                                          */
/*============================================================================================================*/

	
/*============================================================================================================*/
/* Start of Scatter Plot Chart - Percent Income - lowest 10 percentile versus highest 10 percentile                                                                                          */
/*============================================================================================================*/
function showScattChartWI(op)
{
	console.log("showScattChartWI: opacity", op, " regionGl:", regionGl, " priorregionGl:", priorregionGl);	
	d3.select('#scattChartWI').attr("opacity", op);
	
	if (op == '0')
	{
	console.log("showScattChartWI: opacity zero and emptied HTML");	
	console.log("...clearing html right now...", regionGl, priorregionGl);
	d3.select('#scattChWISpots').html('');
	d3.select('#scattChWIXaxis').html('');
	d3.select('#scattChWIYaxis').html('');
	d3.select('#scattChWITitle').html('');
	d3.select('#scattChWILabels').html('');
	d3.select('#scattChWITT').html('');
	}
}


function dsScattChartWI(region) {

	console.log('In dsScattChartWI, region:', region);
	
	console.log('dsScattChartWI: ?region, priorregionGl?:', region, priorregionGl);
	//if (region != priorregionGl && region != "") {
	if (region != "") {
	
		if (priorregionGl != "") {
			console.log('dsScattChartWI: clear region, priorregionGl:', region, priorregionGl);
			showScattChartWI("0");   //Hide and clear
		}
		console.log('dsScattChartWI: show region, priorregionGl:', region, priorregionGl);
		showScattChartWI("100"); //Show

		//var currDataBarChart = dataBarChosen(region); Let mapChart drive the re-read of data   
		console.log("currDataBarChart dataBarChosen for region: " + region);
		console.log("currDataBarChart[0]: ", currDataBarChart[0]);
		console.log("currDataBarChart.length: " + currDataBarChart.length);
		console.log("currDataBarChart[length]: ", currDataBarChart[currDataBarChart.length-1]);


		var margin = {top: 10, right: 10, bottom: 30, left: 40},
		    width = 600 - margin.left - margin.right,
		    height = 210;
		    //height = 200 - margin.top - margin.bottom,
	                
		/*--------------------------------------------------------*/
		/* For X axis - Income share (%) of highest 10 percentile */
		/*--------------------------------------------------------*/
		var xValue = function(d) { return d.incPctHi10;}, // data -> value
		    xScale = d3.scaleLinear()
       			    .domain([d3.min(currDataBarChart, function(d) { return d.incPctHi10; }), d3.max(currDataBarChart, function(d) { return d.incPctHi10; })])
		            .range([0, width]), // value -> display
		    xMap = function(d) { return xScale(xValue(d));}, // data -> display
		    xAxis = d3.axisBottom(xScale);

		/*-------------------------------------------------------*/
		/* For Y axis - Income share (%) of lowest 10 percentile */
		/*-------------------------------------------------------*/
		var yValue = function(d) { return d.incPctLo10;}, // data -> value
		    yScale = d3.scaleLinear()
		            .domain([d3.min(currDataBarChart, function(d) { return d.incPctLo10; }), d3.max(currDataBarChart, function(d) { return d.incPctLo10; })])
		            .range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d));}, // data -> display
		    yAxis = d3.axisLeft(yScale);
		
	
		// add the graph canvas to the body of the webpage
		d3.select("#scattChartWI")
			.append("svg")
    			.attr("width", width + margin.left + margin.right)
    			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
    			.attr("transform", "translate(100,400)");
    			//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			      
		// add the tooltip area to the webpage		
		var tooltip = d3.select("#scattChWITT")
    			.attr("class", "tooltip")
    			.style("opacity", 0);	      
 		var tooltip = d3.select("div.tooltip");	
 		d3.select("#scattChWITT");		
		/*------------------------------------------------------------- */
		/* Add X axis - Income share percent of highest 10 percentile   */
		/*------------------------------------------------------------- */
		d3.select("#scattChWIXaxis")
		    .attr("transform", "translate(0, " + height + ")")
                    .attr("class", "y axis")
		    .call(xAxis)
		    .append("text")
      		    .attr("x", width)
      		    .attr("y", -6)
		    .style("text-anchor", "end")
		    .text("Income Share % of highest 10 percentile");
		    //.call(d3.axisBottom(xAxis))
		    //.selectAll("text")
		    //.attr("transform", "translate(-10,0) rotate(-45)")

		/*------------------------------------------------------------*/
		/* Add Y axis - Income share percent of lowest 10 percentile. */
		/*------------------------------------------------------------*/
		d3.select("#scattChWIYaxis")
                    .attr("class", "y axis")
      			.call(yAxis)
    			.append("text")
                    .attr("class", "y axis")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 6)
      			.attr("dy", ".71em")
      			.style("text-anchor", "end")
      			.text("Income Share % of lowest 10 percentile");
		   // .attr("transform", `translate(${margin.left}, ${margin.top + 14})`)
		   //  .call(d3.axisLeft(yAxis))

		/*-------------------*/
		/* ...adding dots... */
		/*-------------------*/
		d3.select("#scattChWISpots")
  			.selectAll(".dot")
      			.data(currDataBarChart)
    			.enter().append("circle")
      			.attr("class", "dot")
      			.attr("r", 3.5)
      			.attr("cx", xMap)
      			.attr("cy", yMap)
			.attr("stroke-width",1)
 			.attr("stroke","black")
 			.attr("fill", function(d) { 
				     //console.log("d", d)
				     //console.log("giniIndex", d.giniIndex)
				     var col =  d3.interpolateBlues((d.giniIndex - 20) / 44) 
				     //console.log("col", col)
				     if (col) {
					//console.log("found col", col, "for d", d)
					return col
				     } else {
					return 'white'
				     }
				})
		    .on("mouseover", function(d,i) {
		      console.log("Scatt mouseover  ",d.countryNname, d.region, d.giniIndex, d.incPctLo10, d.incPctHi10)	   
		      d3.select(this)
			      .attr("stroke","black").attr("stroke-width",4)
		               return tooltip.style("hidden", false)
			.html( "<b>" + d.countryName + "</b>"  
			      + "<br>" +  "Gini Index: "   + d.giniIndex  
			      + "<br>" +  "Top10 Income%: "  + "<b>" + d.incPctHi10  + "</b>"
			      + "<br>" +  "Bottom10 Income%: "  + "<b>" + d.incPctLo10  + "</b>" )
		      })
		    .on("mousemove",function(d){
		       tooltip.classed("hidden", false)
			       .style("top", (d3.event.pageY) + "px")
			       .style("left", (d3.event.pageX + 10) + "px")
			      .html( "<b>" + d.countryName + "</b>"  
			      + "<br>" +  "Gini Index: "   + d.giniIndex  
			      + "<br>" +  "Top10 Income%: "  + "<b>" + d.incPctHi10  + "</b>"
			      + "<br>" +  "Bottom10 Income%: "  + "<b>" + d.incPctLo10  + "</b>" )
		     })	
		     .on("mouseout",function(d,i){
			 d3.select(this)
			 .attr("stroke","black")
			 .attr("stroke-width",1)
			 tooltip.classed("hidden", true)
			 console.log("Mouseout: " + this)  
		      });

		// Title	
		d3.select("#scattChWITitle").append("text")
			.attr("x", width /2)
			.attr("y", 245)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text("Income Share(%) : of Top 10-%ile versus Bottom 10-%ile: for Region " + regionName)
			;
		showScattChartWI("100"); //should not need this, try to delete
		console.log("dsScattChartWI: done displaying ", region, " instead of ", priorregionGl);
		//priorregionGl = region; all done, save region to prior
	} //region ne null	
}

/*============================================================================================================*/
/* End of Scatter Chart - Percent Income                                                                                        */
/*============================================================================================================*/
/*============================================================================================================*/
/* PAGE 2 END  WI                                                                                         */
/*============================================================================================================*/
/*============================================================================================================*/
/*============================================================================================================*/


/*============================================================================================================*/
/*============================================================================================================*/
/*============================================================================================================*/
/* PAGE 3 functions and data... start of Map Chart SP                                                                                         */
/*------------------------------------------------------------------------------------------------------------*/
function dsMapChartSP(){
var height = 300;
var width = 300;
var margin = 10;	

//d3.selectAll('svg > g > *').remove(); 

var projection = d3.geoMercator().translate([width/2,height/2]).scale(55);
var path = d3.geoPath().projection(projection);

//Read Topo file and CSV containing economic information
//var worldmap = d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
var worldmap = d3.json("countries-110m-edited_wout_Antarctica.json");

Promise.all([worldmap]).then(values => {

	
d3.select("#mapChartSPTitle")
        .attr("x", (width / 2))             
        .attr("y", 15)
        .attr("text-anchor", "middle")  
	.attr("class","title")	 
        .text("World Map with Gini Index (click, zoom)");

d3.select("#mapChartSP")
	.append("svg:svg")
	.attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
	.attr("height", height)
	.text("World Map with Gini Index (click, zoom)")
	.append("svg:g")                //make a group to hold our map chart
	.attr("transform", "translate(10,100)");

	
 var tooltip = d3.select("div.tooltip");	
 d3.select("#mapChartSPTT");		
 var countries = topojson.feature(values[0], values[0].objects.countries).features; 
  
d3.select("#mapChartSPPath")	
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
		 
             currDataBarChart = dataBarChosenSP(regionGl); //Refine data to clicked Region
		 
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
/* End of Map Chart SP                                                                                         */
/*============================================================================================================*/

	    
/*============================================================================================================*/
/* Start of Scatter Charts 1 and 2                                                                                          */
/*------------------------------------------------------------------------------------------------------------*/	    
 var dataBarChartSP = [
 { countryName: "Mauritius", region: "Africa", dollperdayBot40: 6.4, dollperdayTotPop: 13.6, incGrowthBot40: 2.7, incGrowthTotPop: 2 },
 { countryName: "Namibia", region: "Africa", dollperdayBot40: 2.4, dollperdayTotPop: 11, incGrowthBot40: 5.7, incGrowthTotPop: 6.6 },
 { countryName: "Botswana", region: "Africa", dollperdayBot40: 2.2, dollperdayTotPop: 8, incGrowthBot40: 0.4, incGrowthTotPop: -3.3 },
 { countryName: "Ghana", region: "Africa", dollperdayBot40: 2.4, dollperdayTotPop: 6.6, incGrowthBot40: -0.2, incGrowthTotPop: 1.3 },
 { countryName: "eSwatini", region: "Africa", dollperdayBot40: 1.5, dollperdayTotPop: 5.7, incGrowthBot40: 4.7, incGrowthTotPop: 6.1 },
 { countryName: "Zimbabwe", region: "Africa", dollperdayBot40: 1.5, dollperdayTotPop: 3.9, incGrowthBot40: -3.8, incGrowthTotPop: -3.5 },
 { countryName: "Uganda", region: "Africa", dollperdayBot40: 1.3, dollperdayTotPop: 3.2, incGrowthBot40: -2.2, incGrowthTotPop: -1 },
 { countryName: "Ethiopia", region: "Africa", dollperdayBot40: 1.5, dollperdayTotPop: 3, incGrowthBot40: 0.4, incGrowthTotPop: 1.6 },
 { countryName: "Zambia", region: "Africa", dollperdayBot40: 0.6, dollperdayTotPop: 2.9, incGrowthBot40: -0.6, incGrowthTotPop: 2.9 },
 { countryName: "Sierra Leone", region: "Africa", dollperdayBot40: 1.4, dollperdayTotPop: 2.8, incGrowthBot40: 2.7, incGrowthTotPop: 2.9 },
 { countryName: "Benin", region: "Africa", dollperdayBot40: 0.9, dollperdayTotPop: 2.7, incGrowthBot40: -5.2, incGrowthTotPop: 0.1 },
 { countryName: "Tanzania", region: "Africa", dollperdayBot40: 1.2, dollperdayTotPop: 2.7, incGrowthBot40: -0.2, incGrowthTotPop: 0.9 },
 { countryName: "Togo", region: "Africa", dollperdayBot40: 1, dollperdayTotPop: 2.6, incGrowthBot40: 2.6, incGrowthTotPop: 0.6 },
 { countryName: "Rwanda", region: "Africa", dollperdayBot40: 1, dollperdayTotPop: 2.5, incGrowthBot40: 0.3, incGrowthTotPop: -0.2 },
 { countryName: "Malawi", region: "Africa", dollperdayBot40: 0.8, dollperdayTotPop: 2, incGrowthBot40: 3.1, incGrowthTotPop: 1.6 },
 { countryName: "Tunisia", region: "Arab States", dollperdayBot40: 5.6, dollperdayTotPop: 11.2, incGrowthBot40: 5.4, incGrowthTotPop: 3.4 },
 { countryName: "Malaysia", region: "Asia & Pacific", dollperdayBot40: 11.1, dollperdayTotPop: 28, incGrowthBot40: 8.3, incGrowthTotPop: 6 },
 { countryName: "Thailand", region: "Asia & Pacific", dollperdayBot40: 7.1, dollperdayTotPop: 15.5, incGrowthBot40: 1.5, incGrowthTotPop: 1.2 },
 { countryName: "Kazakhstan", region: "Asia & Pacific", dollperdayBot40: 6.9, dollperdayTotPop: 11.8, incGrowthBot40: 0, incGrowthTotPop: -0.6 },
 { countryName: "China", region: "Asia & Pacific", dollperdayBot40: 5, dollperdayTotPop: 11.6, incGrowthBot40: 8.4, incGrowthTotPop: 7.1 },
 { countryName: "Vietnam", region: "Asia & Pacific", dollperdayBot40: 4.9, dollperdayTotPop: 10.6, incGrowthBot40: 4.9, incGrowthTotPop: 5 },
 { countryName: "Mongolia", region: "Asia & Pacific", dollperdayBot40: 4.7, dollperdayTotPop: 9.3, incGrowthBot40: 1, incGrowthTotPop: 0.7 },
 { countryName: "Bhutan", region: "Asia & Pacific", dollperdayBot40: 3.8, dollperdayTotPop: 8.7, incGrowthBot40: 1.6, incGrowthTotPop: 1.7 },
 { countryName: "Sri Lanka", region: "Asia & Pacific", dollperdayBot40: 3.8, dollperdayTotPop: 8.7, incGrowthBot40: 4.2, incGrowthTotPop: 4.7 },
 { countryName: "Philippines", region: "Asia & Pacific", dollperdayBot40: 2.8, dollperdayTotPop: 7.5, incGrowthBot40: 5.1, incGrowthTotPop: 2.6 },
 { countryName: "Indonesia", region: "Asia & Pacific", dollperdayBot40: 3.1, dollperdayTotPop: 6.9, incGrowthBot40: 5.1, incGrowthTotPop: 4.9 },
 { countryName: "Kyrgyzstan", region: "Asia & Pacific", dollperdayBot40: 3.6, dollperdayTotPop: 6.1, incGrowthBot40: 3.2, incGrowthTotPop: 2.4 },
 { countryName: "Pakistan", region: "Asia & Pacific", dollperdayBot40: 2.6, dollperdayTotPop: 4.9, incGrowthBot40: 2.7, incGrowthTotPop: 4.3 },
 { countryName: "Bangladesh", region: "Asia & Pacific", dollperdayBot40: 2, dollperdayTotPop: 3.9, incGrowthBot40: 1.4, incGrowthTotPop: 1.5 },
 { countryName: "India", region: "Asia & Pacific", dollperdayBot40: 1.8, dollperdayTotPop: 3.6, incGrowthBot40: 3.2, incGrowthTotPop: 3.7 },
 { countryName: "Luxembourg", region: "Europe", dollperdayBot40: 39.1, dollperdayTotPop: 85.6, incGrowthBot40: 3, incGrowthTotPop: 3.7 },
 { countryName: "Switzerland", region: "Europe", dollperdayBot40: 35.6, dollperdayTotPop: 70.6, incGrowthBot40: -0.3, incGrowthTotPop: 0.3 },
 { countryName: "Norway", region: "Europe", dollperdayBot40: 39.8, dollperdayTotPop: 69.1, incGrowthBot40: 0.4, incGrowthTotPop: 1 },
 { countryName: "Austria", region: "Europe", dollperdayBot40: 30.3, dollperdayTotPop: 56.8, incGrowthBot40: 1.4, incGrowthTotPop: 1.2 },
 { countryName: "Denmark", region: "Europe", dollperdayBot40: 31, dollperdayTotPop: 55.3, incGrowthBot40: 1.3, incGrowthTotPop: 1.7 },
 { countryName: "Sweden", region: "Europe", dollperdayBot40: 30.2, dollperdayTotPop: 55.1, incGrowthBot40: 1.4, incGrowthTotPop: 2 },
 { countryName: "Germany", region: "Europe", dollperdayBot40: 27.6, dollperdayTotPop: 54.1, incGrowthBot40: -0.2, incGrowthTotPop: 0.8 },
 { countryName: "Netherlands", region: "Europe", dollperdayBot40: 30.1, dollperdayTotPop: 53.7, incGrowthBot40: 1.5, incGrowthTotPop: 1.9 },
 { countryName: "France", region: "Europe", dollperdayBot40: 27.6, dollperdayTotPop: 53, incGrowthBot40: 0.6, incGrowthTotPop: 0.2 },
 { countryName: "Iceland", region: "Europe", dollperdayBot40: 31.2, dollperdayTotPop: 52.8, incGrowthBot40: 3.2, incGrowthTotPop: 3.3 },
 { countryName: "Finland", region: "Europe", dollperdayBot40: 29.9, dollperdayTotPop: 51.4, incGrowthBot40: 0.6, incGrowthTotPop: 0.7 },
 { countryName: "United Kingdom", region: "Europe", dollperdayBot40: 23.1, dollperdayTotPop: 49.4, incGrowthBot40: 1.8, incGrowthTotPop: 2.4 },
 { countryName: "Ireland", region: "Europe", dollperdayBot40: 25.2, dollperdayTotPop: 49.2, incGrowthBot40: 3.4, incGrowthTotPop: 3.1 },
 { countryName: "Belgium", region: "Europe", dollperdayBot40: 27.9, dollperdayTotPop: 49, incGrowthBot40: 0.4, incGrowthTotPop: 0.4 },
 { countryName: "Malta", region: "Europe", dollperdayBot40: 24.8, dollperdayTotPop: 45.2, incGrowthBot40: 3.8, incGrowthTotPop: 3.7 },
 { countryName: "Cyprus", region: "Europe", dollperdayBot40: 22.8, dollperdayTotPop: 42.9, incGrowthBot40: 0.3, incGrowthTotPop: -0.8 },
 { countryName: "Italy", region: "Europe", dollperdayBot40: 19, dollperdayTotPop: 42.5, incGrowthBot40: 0.5, incGrowthTotPop: 1 },
 { countryName: "Spain", region: "Europe", dollperdayBot40: 17.3, dollperdayTotPop: 37.8, incGrowthBot40: 1.8, incGrowthTotPop: 1.1 },
 { countryName: "Israel", region: "Europe", dollperdayBot40: 14.3, dollperdayTotPop: 36.4, incGrowthBot40: 4.2, incGrowthTotPop: 2.6 },
 { countryName: "Slovenia", region: "Europe", dollperdayBot40: 22.2, dollperdayTotPop: 35.8, incGrowthBot40: 2.2, incGrowthTotPop: 1.5 },
 { countryName: "Estonia", region: "Europe", dollperdayBot40: 17.8, dollperdayTotPop: 34.3, incGrowthBot40: 8, incGrowthTotPop: 7.2 },
 { countryName: "Czechia", region: "Europe", dollperdayBot40: 19.4, dollperdayTotPop: 31.2, incGrowthBot40: 3.5, incGrowthTotPop: 2.8 },
 { countryName: "Lithuania", region: "Europe", dollperdayBot40: 12.8, dollperdayTotPop: 28.7, incGrowthBot40: 6.3, incGrowthTotPop: 7.4 },
 { countryName: "Portugal", region: "Europe", dollperdayBot40: 14, dollperdayTotPop: 28.3, incGrowthBot40: 3.3, incGrowthTotPop: 2 },
 { countryName: "Poland", region: "Europe", dollperdayBot40: 15, dollperdayTotPop: 27.8, incGrowthBot40: 6, incGrowthTotPop: 4 },
 { countryName: "Latvia", region: "Europe", dollperdayBot40: 12.1, dollperdayTotPop: 26.6, incGrowthBot40: 7.9, incGrowthTotPop: 8.2 },
 { countryName: "Hungary", region: "Europe", dollperdayBot40: 12.4, dollperdayTotPop: 23.6, incGrowthBot40: 4.8, incGrowthTotPop: 4.6 },
 { countryName: "Slovakia", region: "Europe", dollperdayBot40: 13.6, dollperdayTotPop: 23, incGrowthBot40: -0.6, incGrowthTotPop: -1.1 },
 { countryName: "Greece", region: "Europe", dollperdayBot40: 10.4, dollperdayTotPop: 22.2, incGrowthBot40: 1.8, incGrowthTotPop: 0.1 },
 { countryName: "Croatia", region: "Europe", dollperdayBot40: 11.4, dollperdayTotPop: 21.9, incGrowthBot40: 5.5, incGrowthTotPop: 4.3 },
 { countryName: "Belarus", region: "Europe", dollperdayBot40: 12.3, dollperdayTotPop: 20.2, incGrowthBot40: 0.7, incGrowthTotPop: 0 },
 { countryName: "Turkey", region: "Europe", dollperdayBot40: 7.9, dollperdayTotPop: 19.9, incGrowthBot40: 2.1, incGrowthTotPop: 2.7 },
 { countryName: "Russia", region: "Europe", dollperdayBot40: 9.1, dollperdayTotPop: 19.9, incGrowthBot40: -0.4, incGrowthTotPop: -2.3 },
 { countryName: "Bulgaria", region: "Europe", dollperdayBot40: 8, dollperdayTotPop: 18, incGrowthBot40: 0.4, incGrowthTotPop: 2.1 },
 { countryName: "Romania", region: "Europe", dollperdayBot40: 6.8, dollperdayTotPop: 16.3, incGrowthBot40: 10, incGrowthTotPop: 10 },
 { countryName: "Montenegro", region: "Europe", dollperdayBot40: 5.6, dollperdayTotPop: 14, incGrowthBot40: 4.7, incGrowthTotPop: 1.4 },
 { countryName: "Ukraine", region: "Europe", dollperdayBot40: 8.2, dollperdayTotPop: 13.7, incGrowthBot40: -0.6, incGrowthTotPop: 0.1 },
 { countryName: "Serbia", region: "Europe", dollperdayBot40: 5, dollperdayTotPop: 12.1, incGrowthBot40: 3.9, incGrowthTotPop: 1.5 },
 { countryName: "Macedonia", region: "Europe", dollperdayBot40: 5.3, dollperdayTotPop: 11.7, incGrowthBot40: 7.1, incGrowthTotPop: 4.3 },
 { countryName: "West Bank and Gaza", region: "Europe", dollperdayBot40: 5.2, dollperdayTotPop: 10.9, incGrowthBot40: -0.9, incGrowthTotPop: -0.6 },
 { countryName: "Moldova", region: "Europe", dollperdayBot40: 6, dollperdayTotPop: 9.8, incGrowthBot40: 1.9, incGrowthTotPop: 0.3 },
 { countryName: "Kosovo", region: "Europe", dollperdayBot40: 5, dollperdayTotPop: 8.8, incGrowthBot40: 2.4, incGrowthTotPop: 1.9 },
 { countryName: "Albania", region: "Europe", dollperdayBot40: 4.2, dollperdayTotPop: 8.6, incGrowthBot40: 2.5, incGrowthTotPop: 0.8 },
 { countryName: "Georgia", region: "Europe", dollperdayBot40: 3.5, dollperdayTotPop: 7.7, incGrowthBot40: 2.7, incGrowthTotPop: 1.4 },
 { countryName: "Armenia", region: "Europe", dollperdayBot40: 3.9, dollperdayTotPop: 7.7, incGrowthBot40: 1.3, incGrowthTotPop: 2.4 },
 { countryName: "Iran", region: "Middle east", dollperdayBot40: 6.6, dollperdayTotPop: 16.2, incGrowthBot40: -0.1, incGrowthTotPop: 1.9 },
 { countryName: "Egypt", region: "Middle east", dollperdayBot40: 2.8, dollperdayTotPop: 5.1, incGrowthBot40: -2.5, incGrowthTotPop: -1.1 },
 { countryName: "United States of America", region: "North America", dollperdayBot40: 27, dollperdayTotPop: 69.4, incGrowthBot40: 1.3, incGrowthTotPop: 1.6 },
 { countryName: "Canada", region: "North America", dollperdayBot40: 29.5, dollperdayTotPop: 60.4, incGrowthBot40: 1.6, incGrowthTotPop: 1 },
 { countryName: "Uruguay", region: "South/Latin America", dollperdayBot40: 11.1, dollperdayTotPop: 27.1, incGrowthBot40: 2, incGrowthTotPop: 1.4 },
 { countryName: "Panama", region: "South/Latin America", dollperdayBot40: 7.7, dollperdayTotPop: 25.9, incGrowthBot40: 5.3, incGrowthTotPop: 3.9 },
 { countryName: "Chile", region: "South/Latin America", dollperdayBot40: 9.8, dollperdayTotPop: 25.5, incGrowthBot40: 4.9, incGrowthTotPop: 3.8 },
 { countryName: "Costa Rica", region: "South/Latin America", dollperdayBot40: 7.4, dollperdayTotPop: 23.1, incGrowthBot40: 1.4, incGrowthTotPop: 0.6 },
 { countryName: "Brazil", region: "South/Latin America", dollperdayBot40: 5.5, dollperdayTotPop: 21, incGrowthBot40: -0.4, incGrowthTotPop: 0.7 },
 { countryName: "Argentina", region: "South/Latin America", dollperdayBot40: 7.1, dollperdayTotPop: 19, incGrowthBot40: -1.6, incGrowthTotPop: -1.6 },
 { countryName: "Paraguay", region: "South/Latin America", dollperdayBot40: 6, dollperdayTotPop: 17.5, incGrowthBot40: 1.6, incGrowthTotPop: 0.3 },
 { countryName: "Dominican Rep.", region: "South/Latin America", dollperdayBot40: 5.4, dollperdayTotPop: 15.5, incGrowthBot40: 5.2, incGrowthTotPop: 4.3 },
 { countryName: "Colombia", region: "South/Latin America", dollperdayBot40: 4.3, dollperdayTotPop: 14.3, incGrowthBot40: 2.3, incGrowthTotPop: 0.4 },
 { countryName: "Ecuador", region: "South/Latin America", dollperdayBot40: 4.8, dollperdayTotPop: 13.8, incGrowthBot40: 1.3, incGrowthTotPop: 0.5 },
 { countryName: "Peru", region: "South/Latin America", dollperdayBot40: 5.1, dollperdayTotPop: 13.6, incGrowthBot40: 2.5, incGrowthTotPop: 1.5 },
 { countryName: "Bolivia", region: "South/Latin America", dollperdayBot40: 4.8, dollperdayTotPop: 13.1, incGrowthBot40: 1.8, incGrowthTotPop: -1.7 },
 { countryName: "El Salvador", region: "South/Latin America", dollperdayBot40: 4.7, dollperdayTotPop: 10.9, incGrowthBot40: 4, incGrowthTotPop: 1.8 },
 { countryName: "Honduras", region: "South/Latin America", dollperdayBot40: 2.2, dollperdayTotPop: 8.5, incGrowthBot40: 1.3, incGrowthTotPop: 1.7 },
 ];	 

function dataBarChosenSP(region) {
	var ds = [];
	if (region == "" || region == priorregionGl) {
		console.log("dataBarChosenSP: region is null or same as before:", region, priorregionGl);
	} //region is null
	else {
		if (region == "All") {
			regionName = "All";
			for (i in dataBarChartSP) {
				ds.push(dataBarChartSP[i]);
			}

		} //region is All
		else if (region == "South/Latin America" || region == "North America") {
			regionName = "North and South America";
			for (i in dataBarChartSP) {
				 if(dataBarChartSP[i].region=="South/Latin America" || dataBarChartSP[i].region == "North America"){
					ds.push(dataBarChartSP[i]);
				} 
			} //region is *America
		}	
		else {
			for (i in dataBarChartSP) {
				 regionName = region;
				 if(dataBarChartSP[i].region==region){
					ds.push(dataBarChartSP[i]);
				} 
			}
		} //region is one region		
	} //region is not null	
	return ds;   
}

/*============================================================================================================*/
/* Start of Scatter Plot Chart - Percent Income - lowest 10 percentile versus highest 10 percentile                                                                                          */
/*============================================================================================================*/
function showScattChartSP1(op)
{
	console.log("showScattChartSP2: opacity", op, " regionGl:", regionGl, " priorregionGl:", priorregionGl);	
	d3.select('#scattChartSP1').attr("opacity", op);
	
	if (op == '0')
	{
	console.log("showScattChartWI: opacity zero and emptied HTML");	
	console.log("...clearing html right now...", regionGl, priorregionGl);
	d3.select('#scattChSP1Spots').html('');
	d3.select('#scattChSP1Xaxis').html('');
	d3.select('#scattChSP1Yaxis').html('');
	d3.select('#scattChSP1Title').html('');
	d3.select('#scattChSP1Labels').html('');
	d3.select('#scattChSP1TT').html('');
	}
}


function dsScattChartSP1(region) {

	console.log('dsScattChartSP1: ?region, priorregionGl?:', region, priorregionGl);
	if (region != "") {
	
		if (priorregionGl != "") {
			console.log('dsScattChartSP1: clear region, priorregionGl:', region, priorregionGl);
			showScattChartSP1("0");   //Hide and clear
		}
		console.log('dsScattChartSP1: show region, priorregionGl:', region, priorregionGl);
		showScattChartSP1("100"); //Show

		//var currDataBarChart = dataBarChosen(region); Let mapChart drive the re-read of data   
		console.log("currDataBarChart dataBarChosen for region: " + region);
		console.log("currDataBarChart[0]: ", currDataBarChart[0]);
		console.log("currDataBarChart.length: " + currDataBarChart.length);
		console.log("currDataBarChart[length]: ", currDataBarChart[currDataBarChart.length-1]);


		var margin = {top: 10, right: 10, bottom: 30, left: 40},
		    width = 600 - margin.left - margin.right,
		    height = 180;
		    //height = 200 - margin.top - margin.bottom,
	                
		/*--------------------------------------------------------*/
		/* For X axis - Dollars per day of Total Population       */
		/*--------------------------------------------------------*/
		var xValue = function(d) { return d.dollperdayTotPop;}, // data -> value
		    xScale = d3.scaleLinear()
       			    .domain([d3.min(currDataBarChart, function(d) { return d.dollperdayTotPop; }), d3.max(currDataBarChart, function(d) { return d.dollperdayTotPop; })])
		            .range([0, width]), // value -> display
		    xMap = function(d) { return xScale(xValue(d));}, // data -> display
		    xAxis = d3.axisBottom(xScale);

		/*-------------------------------------------------------*/
		/* For Y axis - Dollars per day of lowest 40 percentile  */
		/*-------------------------------------------------------*/
		var yValue = function(d) { return  d.dollperdayBot40;}, // data -> value
		    yScale = d3.scaleLinear()
		            .domain([d3.min(currDataBarChart, function(d) { return d.dollperdayBot40; }), d3.max(currDataBarChart, function(d) { return d.dollperdayBot40; })])
		            .range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d));}, // data -> display
		    yAxis = d3.axisLeft(yScale);
		
	
		// add the graph canvas to the body of the webpage
		d3.select("#scattChartSP1")
			.append("svg")
    			.attr("width", width + margin.left + margin.right)
    			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
    			.attr("transform", "translate(20,20)");
    			//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			      
		// add the tooltip area to the webpage		
		var tooltip = d3.select("#scattChSP1TT")
    			.attr("class", "tooltip")
    			.style("opacity", 0);	      
 		var tooltip = d3.select("div.tooltip");	
 		d3.select("#scattChSP1TT");		
		/*------------------------------------------------------------- */
		/* Add X axis - Dollars per day of Total Population             */
		/*------------------------------------------------------------- */
		d3.select("#scattChSP1Xaxis")
		    .attr("transform", "translate(0, " + height + ")")
                    .attr("class", "y axis")
		    .call(xAxis)
		    .append("text")
      		    .attr("x", width)
      		    .attr("y", -6)
		    .style("text-anchor", "end")
		    .text("Average Dollars per day of Total Population");
		    //.call(d3.axisBottom(xAxis))
		    //.selectAll("text")
		    //.attr("transform", "translate(-10,0) rotate(-45)")

		/*------------------------------------------------------------*/
		/* Add Y axis - Dollars per day of lowest 40 percentile       */
		/*------------------------------------------------------------*/
		d3.select("#scattChSP1Yaxis")
                    .attr("class", "y axis")
      			.call(yAxis)
    			.append("text")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 6)
      			.attr("dy", ".71em")
      			.style("text-anchor", "end")
      			.text("Income Share % of lowest 10 percentile");
		   // .attr("transform", `translate(${margin.left}, ${margin.top + 14})`)
		   //  .call(d3.axisLeft(yAxis))

		/*-------------------*/
		/* ...adding dots... */
		/*-------------------*/
		d3.select("#scattChSP1Spots")
  			.selectAll(".dot")
      			.data(currDataBarChart)
    			.enter().append("circle")
      			.attr("class", "dot")
      			.attr("r", 3.5)
      			.attr("cx", xMap)
      			.attr("cy", yMap)
			.attr("stroke-width",1)
 			.attr("stroke","black")
 			.attr("fill", function(d) { 
				     //console.log("d", d)
				     //console.log("giniIndex", d.giniIndex)
				     var col =  d3.interpolateBlues(d.dollperdayTotPop/86) 
				     //console.log("col", col)
				     if (col) {
					//console.log("found col", col, "for d", d)
					return col
				     } else {
					return 'white'
				     }
				})
		    .on("mouseover", function(d,i) {
		      console.log("Scatt1 mouseover  ",d.countryNname, d.region, d.giniIndex, d.dollperdayTotPop, d.dollperdayBot40)	   
		      d3.select(this)
			      .attr("stroke","black").attr("stroke-width",4)
		               return tooltip.style("hidden", false)
			.html( "<b>" + d.countryName + "</b>"  
			      + "<br>" +  "Avg $ per day Total Pop: "  + "<b>" + d.dollperdayTotPop  + "</b>"
			      + "<br>" +  "Avg $ per day Bottom 40%: "  + "<b>" + d.dollperdayBot40  + "</b>" )
		      })
		    .on("mousemove",function(d){
		       tooltip.classed("hidden", false)
			       .style("top", (d3.event.pageY) + "px")
			       .style("left", (d3.event.pageX + 10) + "px")
			.html( "<b>" + d.countryName + "</b>"  
			      + "<br>" +  "Avg $ per day Total Pop: "  + "<b>" + d.dollperdayTotPop  + "</b>"
			      + "<br>" +  "Avg $ per day Bottom 40%: "  + "<b>" + d.dollperdayBot40  + "</b>" )
		     })	
		     .on("mouseout",function(d,i){
			 d3.select(this)
			 .attr("stroke","black")
			 .attr("stroke-width",1)
			 tooltip.classed("hidden", true)
			 console.log("Mouseout: " + this)  
		      });

		// Title	
		d3.select("#scattChSP1Title").append("text")
			.attr("x", width /2)
			.attr("y", 230)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text("Avg $ per day: Total Population vs Bottom 40-%ile: for Region " + regionName)
			;
		showScattChartSP1("100"); //should not need this, try to delete
	} //region ne null	
}

/*============================================================================================================*/
/* End of Scatter Chart - Shared Prosperity, Dollars per Day                                                                                      */
/*============================================================================================================*/


/*============================================================================================================*/
/* Start of Scatter Plot Chart 2 - Income Growth - lowest 10 percentile versus highest 10 percentile                                                                                          */
/*============================================================================================================*/
function showScattChartSP2(op)
{
	console.log("showScattChartSP2: opacity", op, " regionGl:", regionGl, " priorregionGl:", priorregionGl);	
	d3.select('#scattChartSP2').attr("opacity", op);
	
	if (op == '0')
	{
	console.log("showScattChartWI: opacity zero and emptied HTML");	
	console.log("...clearing html right now...", regionGl, priorregionGl);
	d3.select('#scattChSP2Spots').html('');
	d3.select('#scattChSP2Xaxis').html('');
	d3.select('#scattChSP2Yaxis').html('');
	d3.select('#scattChSP2Title').html('');
	d3.select('#scattChSP2Labels').html('');
	d3.select('#scattChSP2TT').html('');
	}
}


function dsScattChartSP2(region) {

	console.log('In dsScattChartSP2, region:', region);
	
	console.log('dsScattChartSP2: ?region, priorregionGl?:', region, priorregionGl);
	if (region != "") {
	
		if (priorregionGl != "") {
			console.log('dsScattChartSP2: clear region, priorregionGl:', region, priorregionGl);
			showScattChartSP2("0");   //Hide and clear
		}
		console.log('dsScattChartSP2: show region, priorregionGl:', region, priorregionGl);
		showScattChartSP2("100"); //Show

		//var currDataBarChart = dataBarChosen(region); Let mapChart drive the re-read of data   
		console.log("currDataBarChart dataBarChosen for region: " + region);
		console.log("currDataBarChart[0]: ", currDataBarChart[0]);
		console.log("currDataBarChart.length: " + currDataBarChart.length);
		console.log("currDataBarChart[length]: ", currDataBarChart[currDataBarChart.length-1]);


		var margin = {top: 10, right: 10, bottom: 30, left: 40},
		    width = 600 - margin.left - margin.right,
		    height = 180;
		    //height = 200 - margin.top - margin.bottom,
	                
		/*--------------------------------------------------------*/
		/* For X axis - Income Growth of Total Population       */
		/*--------------------------------------------------------*/
		var xValue = function(d) { return d.incGrowthTotPop;}, // data -> value
		    xScale = d3.scaleLinear()
       			    .domain([d3.min(currDataBarChart, function(d) { return d.incGrowthTotPop; }), d3.max(currDataBarChart, function(d) { return d.incGrowthTotPop; })])
		            .range([0, width]), // value -> display
		    xMap = function(d) { return xScale(xValue(d));}, // data -> display
		    xAxis = d3.axisBottom(xScale);

		/*-------------------------------------------------------*/
		/* For Y axis - Income Growth of lowest 40 percentile  */
		/*-------------------------------------------------------*/
		var yValue = function(d) { return  d.incGrowthBot40;}, // data -> value
		    yScale = d3.scaleLinear()
		            .domain([d3.min(currDataBarChart, function(d) { return d.incGrowthBot40; }), d3.max(currDataBarChart, function(d) { return d.incGrowthBot40; })])
		            .range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d));}, // data -> display
		    yAxis = d3.axisLeft(yScale);
		
	
		// add the graph canvas to the body of the webpage
		d3.select("#scattChartSP2")
			.append("svg")
    			.attr("width", width + margin.left + margin.right)
    			.attr("height", height + margin.top + margin.bottom)
  			.append("g")
    			.attr("transform", "translate(100,400)");
    			//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			      
		// add the tooltip area to the webpage		
		var tooltip = d3.select("#scattChSP2TT")
    			.attr("class", "tooltip")
    			.style("opacity", 0);	      
 		var tooltip = d3.select("div.tooltip");	
 		d3.select("#scattChSP2TT");		
		/*------------------------------------------------------------- */
		/* Add X axis - Income Growth of Total Population             */
		/*------------------------------------------------------------- */
		d3.select("#scattChSP2Xaxis")
		    .attr("transform", "translate(0, " + height + ")")
		    .call(xAxis)
		    .append("text")
      		    .attr("class", "xaxis")
      		    .attr("x", width)
      		    .attr("y", -6)
		    .style("text-anchor", "end")
		    .text("Income Growth of Total Population");
		    //.call(d3.axisBottom(xAxis))
		    //.selectAll("text")
		    //.attr("transform", "translate(-10,0) rotate(-45)")

		/*------------------------------------------------------------*/
		/* Add Y axis - Income Growth of lowest 40 percentile       */
		/*------------------------------------------------------------*/
		d3.select("#scattChSP2Yaxis")
			.attr("class", "yaxis")
      			.call(yAxis)
    			.append("text")
      			.attr("class", "label")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 6)
      			.attr("dy", ".71em")
      			.style("text-anchor", "end")
      			.text("Income Growth of lowest 10 percentile");
		   // .attr("transform", `translate(${margin.left}, ${margin.top + 14})`)
		   //  .call(d3.axisLeft(yAxis))

		/*-------------------*/
		/* ...adding dots... */
		/*-------------------*/
		d3.select("#scattChSP2Spots")
  			.selectAll(".dot")
      			.data(currDataBarChart)
    			.enter().append("circle")
      			.attr("class", "dot")
      			.attr("r", 3.5)
      			.attr("cx", xMap)
      			.attr("cy", yMap)
			.attr("stroke-width",1)
 			.attr("stroke","black")
 			.attr("fill", function(d) { 
				     //console.log("d", d)
				     //console.log("giniIndex", d.giniIndex)
				     var col =  d3.interpolateBlues((d.incGrowthTotPop + 6) / 17) 
				     //console.log("col", col)
				     if (col) {
					//console.log("found col", col, "for d", d)
					return col
				     } else {
					return 'white'
				     }
				})
		    .on("mouseover", function(d,i) {
		      console.log("Scatt2 mouseover  ",d.countryNname, d.region, d.incGrowthTotPop, d.incGrowthBot40)	   
		      d3.select(this)
			      .attr("stroke","black").attr("stroke-width",4)
		               return tooltip.style("hidden", false)
			.html( "<b>" + d.countryName + "</b>"  
			      + "<br>" +  "Income Growth Total Pop: "  + "<b>" + d.incGrowthTotPop  + "</b>"
			      + "<br>" +  "Income Growth Bottom 40%: "  + "<b>" + d.incGrowthBot40  + "</b>" )
		      })
		    .on("mousemove",function(d){
		       tooltip.classed("hidden", false)
			       .style("top", (d3.event.pageY) + "px")
			       .style("left", (d3.event.pageX + 10) + "px")
			.html( "<b>" + d.countryName + "</b>"  
			      + "<br>" +  "Income Growth Total Pop: "  + "<b>" + d.incGrowthTotPop  + "</b>"
			      + "<br>" +  "Income Growth Bottom 40%: "  + "<b>" + d.incGrowthBot40  + "</b>" )
		     })	
		     .on("mouseout",function(d,i){
			 d3.select(this)
			 .attr("stroke","black")
			 .attr("stroke-width",1)
			 tooltip.classed("hidden", true)
			 console.log("Mouseout: " + this)  
		      });

		// Title	
		d3.select("#scattChSP2Title").append("text")
			.attr("x", width /2)
			.attr("y", 230)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text("Income Growth: Total Population vs Bottom 40-%ile: for Region " + regionName)
			;
		showScattChartSP1("100"); //should not need this, try to delete
		console.log("dsScattChartSP2: done displaying ", region, " instead of ", priorregionGl);
	} //region ne null	
}

/*============================================================================================================*/
/* End of Scatter Chart - Shared Prosperity, Dollars per Day                                                                                      */
/*============================================================================================================*/
/* Page 3 End                                                                                  */
/*============================================================================================================*/
/*============================================================================================================*/
/*============================================================================================================*/



	

	
async function init() 
{
	// set up location
	d3.select('#mapChartBig').attr("transform",   "translate(10,100)");	
	d3.select('#mapChartWI').attr("transform",   "translate(10,0)");	
	d3.select('#giniBarChart').attr("transform",  "translate(400,15)");	
	d3.select('#scattChartWI').attr("transform",  "translate(400,250)");
	d3.select('#mapChartSP').attr("transform",   "translate(10,0)");	
	d3.select('#scattChartSP1').attr("transform",  "translate(400,15)");	
	d3.select('#scattChartSP2').attr("transform",  "translate(400,250)");
	
	//Show page 1 the first time...
	showPage1();
}	

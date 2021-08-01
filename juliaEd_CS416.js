//Set the initial region value
let regionGl = '';
let regionName = '';	
let priorregionGl = '';	
let currDataBarChart = [];		    	

/*============================================================================================================*/
/* start of Map Chart                                                                                          */
/*------------------------------------------------------------------------------------------------------------*/
function dsMapChart(){
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

	
d3.select("#mapChartWITitle")
        .attr("x", (width / 2))             
        .attr("y", 15)
        .attr("text-anchor", "middle")  
	.attr("class","title")	 
        .text("World Map with Gini Index (click, zoom)");

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
  
d3.select("#mapChartWIPath")	
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
/* End of Map Chart                                                                                          */
/*============================================================================================================*/

	    
/*============================================================================================================*/
/* Start of Scatter Charts 1 and 2                                                                                          */
/*------------------------------------------------------------------------------------------------------------*/	    
 var dataBarChart = [
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

function dataBarChosen(region) {
	var ds = [];
	if (region == "" || region == priorregionGl) {
		console.log("dataBarChosen: region is null or same as before:", region, priorregionGl);
	} //region is null
	else {
		if (region == "All") {
			regionName = "All";
			for (i in dataBarChart) {
				ds.push(dataBarChart[i]);
			}

		} //region is All
		else if (region == "South/Latin America" || region == "North America") {
			regionName = "North and South America";
			for (i in dataBarChart) {
				 if(dataBarChart[i].region=="South/Latin America" || dataBarChart[i].region == "North America"){
					ds.push(dataBarChart[i]);
				} 
			} //region is *America
		}	
		else {
			for (i in dataBarChart) {
				 regionName = region;
				 if(dataBarChart[i].region==region){
					ds.push(dataBarChart[i]);
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
	d3.select('#scattChSP1Spots').attr("opacity", op);
	d3.select('#scattChSP1Xaxis').attr("opacity", op);
	d3.select('#scattChSP1Yaxis').attr("opacity", op);
	d3.select('#scattChSP1Title').attr("opacity", op);
	d3.select('#scattChSP1Labels').attr("opacity", op);
	
	if (op == '0')
	{
	console.log("showScattChartWI: opacity zero and emptied HTML");	
	console.log("...clearing html right now...", regionGl, priorregionGl);
	d3.select('#scattChSP1Spots').html('');
	d3.select('#scattChSP1Xaxis').html('');
	d3.select('#scattChSP1Yaxis').html('');
	d3.select('#scattChSP1Title').html('');
	d3.select('#scattChSP1Labels').html('');
	}
}


function dsScattChartSP1(region) {

	console.log('In dsScattChartSP1, region:', region);
	
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
		    .call(xAxis)
		    .append("text")
      		    .attr("class", "label")
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
      			.attr("class", "label")
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
			.text("Avg $ per day Total Population vs Bottom 40% for Region " + regionName)
			;
		showScattChartSP1("100"); //should not need this, try to delete
		console.log("dsScattChartSP1: done displaying ", region, " instead of ", priorregionGl);
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
	d3.select('#scattChSP2Spots').attr("opacity", op);
	d3.select('#scattChSP2Xaxis').attr("opacity", op);
	d3.select('#scattChSP2Yaxis').attr("opacity", op);
	d3.select('#scattChSP2Title').attr("opacity", op);
	d3.select('#scattChSP2Labels').attr("opacity", op);
	
	if (op == '0')
	{
	console.log("showScattChartWI: opacity zero and emptied HTML");	
	console.log("...clearing html right now...", regionGl, priorregionGl);
	d3.select('#scattChSP2Spots').html('');
	d3.select('#scattChSP2Xaxis').html('');
	d3.select('#scattChSP2Yaxis').html('');
	d3.select('#scattChSP2Title').html('');
	d3.select('#scattChSP2Labels').html('');
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
      		    .attr("class", "label")
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
			.attr("class", "y axis")
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
			.text("Income Growth Total Population vs Bottom 40% for Region " + regionName)
			;
		showScattChartSP1("100"); //should not need this, try to delete
		console.log("dsScattChartSP2: done displaying ", region, " instead of ", priorregionGl);
	} //region ne null	
}

/*============================================================================================================*/
/* End of Scatter Chart - Shared Prosperity, Dollars per Day                                                                                      */
/*============================================================================================================*/


/*============================================================================================================*/
/* ...Run dsMapChart now... 
 *    dsMapChart detects a click on a Country, whereupon only the Region of Country is read from the CSV data.
 *    The CSV data is displayed on the bar chart and line chart. The map will tell them to refresh if the
 *    region has changed, and thus the data to present has changed, due to a click on one of the map countries */
/*============================================================================================================*/
  
    dsMapChart(); //mapChart will cause barChart and lineChart to refresh if necessary
	

	
async function init() 
{
	// set up location
	//d3.select('#mapChartWITitle').attr("transform",  "translate(10,0)");	
	d3.select('#mapChartWI').attr("transform",   "translate(10,0)");	
	d3.select('#scattChartSP1').attr("transform",  "translate(400,15)");	
	d3.select('#scattChartSP2').attr("transform",  "translate(400,250)");	
}	

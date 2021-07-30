function BarChartWI() {
var width = 800;
var height = 600;
var margin = 20;	
console.log("In Barchart_WealthInequality");	

d3.selectAll('svg > g > *').remove(); 

//Read CSV containing wealth inequality information
var econcsv = d3.csv("MatchTopo_Distribution_of_Income.csv", function(data) {
    return {	
            countryName: data.DISPCountry,
	    region:     data.DISPRegion,
	    giniIndex: +data.DIGiniIndex,
	    incPctHi10: +data.DIPctIncShareHighest10,
	    incPctLo10: +data.DIPctIncShareLowest10
    }	    
});					        
console.log("econcsv: " + econcsv);

Promise.all([econcsv]).then(values => {
	
	console.log("values[0]: " + values[0]);


})
}

var datasetBarChart = [
{ group: "All", category: "Oranges", measure: 63850.4963 }, 
{ group: "All", category: "Apples", measure: 78258.0845 }, 
{ group: "All", category: "Grapes", measure: 60610.2355 }, 
{ group: "All", category: "Figs", measure: 30493.1686 }, 
{ group: "All", category: "Mangos", measure: 56097.0151 }, 
{ group: "Sam", category: "Oranges", measure: 19441.5648 }, 
{ group: "Sam", category: "Apples", measure: 25922.0864 }, 
{ group: "Sam", category: "Grapes", measure: 9720.7824 }, 
{ group: "Sam", category: "Figs", measure: 6480.5216 }, 
{ group: "Sam", category: "Mangos", measure: 19441.5648 }, 
{ group: "Peter", category: "Oranges", measure: 22913.2728 }, 
{ group: "Peter", category: "Apples", measure: 7637.7576 }, 
{ group: "Peter", category: "Grapes", measure: 23549.7526 }, 
{ group: "Peter", category: "Figs", measure: 1909.4394 }, 
{ group: "Peter", category: "Mangos", measure: 7637.7576 }, 
{ group: "John", category: "Oranges", measure: 1041.5124 }, 
{ group: "John", category: "Apples", measure: 2430.1956 }, 
{ group: "John", category: "Grapes", measure: 15275.5152 }, 
{ group: "John", category: "Figs", measure: 4166.0496 }, 
{ group: "John", category: "Mangos", measure: 11803.8072 }, 
{ group: "Rick", category: "Oranges", measure: 7406.3104 }, 
{ group: "Rick", category: "Apples", measure: 2545.9192 }, 
{ group: "Rick", category: "Grapes", measure: 1620.1304 }, 
{ group: "Rick", category: "Figs", measure: 8563.5464 }, 
{ group: "Rick", category: "Mangos", measure: 3008.8136 }, 
{ group: "Lenny", category: "Oranges", measure: 7637.7576 }, 
{ group: "Lenny", category: "Apples", measure: 35411.4216 }, 
{ group: "Lenny", category: "Grapes", measure: 8332.0992 }, 
{ group: "Lenny", category: "Figs", measure: 6249.0744 }, 
{ group: "Lenny", category: "Mangos", measure: 11803.8072 }, 
{ group: "Paul", category: "Oranges", measure: 3182.399 }, 
{ group: "Paul", category: "Apples", measure: 867.927 }, 
{ group: "Paul", category: "Grapes", measure: 1808.18125 }, 
{ group: "Paul", category: "Figs", measure: 795.59975 }, 
{ group: "Paul", category: "Mangos", measure: 578.618 }, 
{ group: "Steve", category: "Oranges", measure: 2227.6793 }, 
{ group: "Steve", category: "Apples", measure: 3442.7771 }, 
{ group: "Steve", category: "Grapes", measure: 303.77445 }, 
{ group: "Steve", category: "Figs", measure: 2328.93745 }, 
{ group: "Steve", category: "Mangos", measure: 1822.6467 }, 
]
;

// set initial group value
var group = "All";

function datasetBarChosen(group) {
	var ds = [];
	for (x in datasetBarChart) {
		 if(datasetBarChart[x].group==group){
		 	ds.push(datasetBarChart[x]);
		 } 
		}
	return ds;
}


function dsBarChartBasics() {

		var margin = {top: 30, right: 5, bottom: 20, left: 50},
		width = 500 - margin.left - margin.right,
	   height = 250 - margin.top - margin.bottom,
		colorBar = d3.scale.category20(),
		barPadding = 1
		;
		
		return {
			margin : margin, 
			width : width, 
			height : height, 
			colorBar : colorBar, 
			barPadding : barPadding
		}			
		;
}

function dsBarChart() {

	var firstDatasetBarChart = datasetBarChosen(group);         	
	
	var basics = dsBarChartBasics();
	
	var margin = basics.margin,
		width = basics.width,
	   height = basics.height,
		colorBar = basics.colorBar,
		barPadding = basics.barPadding
		;
					
	var 	xScale = d3.scale.linear()
						.domain([0, firstDatasetBarChart.length])
						.range([0, width])
						;
						
	// Create linear y scale 
	// Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
	// get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
	var yScale = d3.scale.linear()
			// use the max funtion to derive end point of the domain (max value of the dataset)
			// do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
		   .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
		   // As coordinates are always defined from the top left corner, the y position of the bar
		   // is the svg height minus the data value. So you basically draw the bar starting from the top. 
		   // To have the y position calculated by the range function
		   .range([height, 0])
		   ;
	
	//Create SVG element
	
	var svg = d3.select("#barChart")
			.append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .attr("id","barChartPlot")
		    ;
	
	var plot = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    ;
	            
	plot.selectAll("rect")
		   .data(firstDatasetBarChart)
		   .enter()
		   .append("rect")
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / firstDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", "lightgrey")
			;
	
		
	// Add y labels to plot	
	
	plot.selectAll("text")
	.data(firstDatasetBarChart)
	.enter()
	.append("text")
	.text(function(d) {
			return formatAsInteger(d3.round(d.measure));
	})
	.attr("text-anchor", "middle")
	// Set x position to the left edge of each bar plus half the bar width
	.attr("x", function(d, i) {
			return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
	})
	.attr("y", function(d) {
			return yScale(d.measure) + 14;
	})
	.attr("class", "yAxis")
	/* moved to CSS			   
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "white")
	*/
	;
	
	// Add x labels to chart	
	
	var xLabels = svg
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
		    ;
	
	xLabels.selectAll("text.xAxis")
		  .data(firstDatasetBarChart)
		  .enter()
		  .append("text")
		  .text(function(d) { return d.category;})
		  .attr("text-anchor", "middle")
			// Set x position to the left edge of each bar plus half the bar width
						   .attr("x", function(d, i) {
						   		return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
						   })
		  .attr("y", 15)
		  .attr("class", "xAxis")
		  //.attr("style", "font-size: 12; font-family: Helvetica, sans-serif")
		  ;			
	 
	// Title
	
	svg.append("text")
		.attr("x", (width + margin.left + margin.right)/2)
		.attr("y", 15)
		.attr("class","title")				
		.attr("text-anchor", "middle")
		.text("Overall Sales Breakdown 2012")
		;
}

dsBarChart();

 /* ** UPDATE CHART ** */
 
/* updates bar chart on request */

function updateBarChart(group, colorChosen) {
	
		var currentDatasetBarChart = datasetBarChosen(group);
		
		var basics = dsBarChartBasics();
	
		var margin = basics.margin,
			width = basics.width,
		   height = basics.height,
			colorBar = basics.colorBar,
			barPadding = basics.barPadding
			;
		
		var 	xScale = d3.scale.linear()
			.domain([0, currentDatasetBarChart.length])
			.range([0, width])
			;
		
			
		var yScale = d3.scale.linear()
	      .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
	      .range([height,0])
	      ;
	      
	   var svg = d3.select("#barChart svg");
	      
	   var plot = d3.select("#barChartPlot")
	   	.datum(currentDatasetBarChart)
		   ;
	
	  		/* Note that here we only have to select the elements - no more appending! */
	  	plot.selectAll("rect")
	      .data(currentDatasetBarChart)
	      .transition()
			.duration(750)
			.attr("x", function(d, i) {
			    return xScale(i);
			})
		   .attr("width", width / currentDatasetBarChart.length - barPadding)   
			.attr("y", function(d) {
			    return yScale(d.measure);
			})  
			.attr("height", function(d) {
			    return height-yScale(d.measure);
			})
			.attr("fill", colorChosen)
			;
		
		plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
			.data(currentDatasetBarChart)
			.transition()
			.duration(750)
		   .attr("text-anchor", "middle")
		   .attr("x", function(d, i) {
		   		return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
		   })
		   .attr("y", function(d) {
		   		return yScale(d.measure) + 14;
		   })
		   .text(function(d) {
				return formatAsInteger(d3.round(d.measure));
		   })
		   .attr("class", "yAxis")					 
		;
		

		svg.selectAll("text.title") // target the text element(s) which has a title class defined
			.attr("x", (width + margin.left + margin.right)/2)
			.attr("y", 15)
			.attr("class","title")				
			.attr("text-anchor", "middle")
			.text(group + "'s Sales Breakdown 2012")
		;
}


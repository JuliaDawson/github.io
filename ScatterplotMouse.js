var data = [
[4,35,25],[6,28,21],[4,33,24],[6,24,17],[12,19,12],[4,30,23],[6,27,19],[8,26,17],[10,22,14],[4,32,24],
[8,22,13],[12,20,12],[4,41,30],[6,29,23],[0,109,133],[2,33,36],[3,29,28],[4,32,23],[6,28,19],[8,23,15],[12,20,13],[4,27,20],
[4,31,23],[6,26,18],[4,30,22],[6,25,17],[8,21,14],[4,32,22],[6,26,18],[8,21,15],[4,29,21],[0,110,128],
[4,31,21],[8,23,15],[4,34,27],[6,24,17],[8,21,15],[8,25,16],[4,36,23],[6,29,20],[8,24,15],[8,23,14],
[10,19,12],[4,25,19],[6,27,18],[8,22,16],[12,16,12],[0,103,121],[4,34,26],[4,30,22],[0,96,118],[4,25,19],
[6,18,11],[8,21,14],[3,40,29],[4,31,24],[6,23,17],[8,22,15],[6,24,17],[8,23,15],[6,27,17],[4,29,21],[4,27,20],[6,23,17],
[8,21,15],[4,38,30],[4,37,29],[6,28,19],[0,122,150],[4,34,27],[6,25,18],[4,30,22],[6,27,20],[8,22,15],
[4,27,25],[4,39,30],[4,30,21],[6,26,18],[8,23,15],[6,27,19],[8,22,14],[4,31,24],[8,19,13],[4,27,21],
[6,22,17],[0,92,120],[8,23,15],[4,33,27],[6,25,18],[10,21,14],[12,17,10],[6,28,22],[4,27,20],
[6,23,17],[8,19,14],[4,30,22],[6,28,21],[8,22,16],[4,36,39],[6,28,20],[4,29,23],[6,24,16],
[6,24,17],[6,24,16],[8,20,14],[4,34,26],[4,35,27],[8,23,16],[0,82,85],[4,30,23],[6,25,19],
[8,22,16],[12,20,13],[4,33,24],[0,102,121],[6,27,20],[3,42,35],[4,31,24],[0,101,124],
[4,31,26],[6,26,18],[4,33,26],[6,25,18],[8,20,14],[4,27,21],[6,26,19],[8,21,14],[8,21,14],
[4,28,21],[6,24,17],[12,19,12],[8,23,14],[3,39,32],[4,27,21],[4,33,25],[6,28,20],[0,98,92],
[4,30,23],[4,35,32],[6,25,20],[8,18,13],[4,28,21],[4,33,24],[6,25,18],[4,29,22],[4,32,23]]

console.log("in ScatterplotMouse");

// set the dimensions and margins of the graph
var svg = d3.select("svg"),
        width = 300,
        height = 300,
        margin = 50;
        g = svg.append("g").attr("transform", "translate(" +margin+ "," +margin+ ")");
var xscale = d3.scaleLog().domain([10, 150]).range([0, width - 100]);
var yscale = d3.scaleLog().domain([10, 150]).range([height - 100, 0]);

var x_axis = d3.axisBottom().scale(xscale).tickValues([10, 20, 50, 100])
    .tickFormat(d3.format(",.0f"));

var y_axis = d3.axisLeft().scale(yscale).tickValues([10, 20, 50, 100]) 
    .tickFormat(d3.format(",.0f"));

	
var xAxisTranslate = height/2 + 10;

d3.select("svg")
.attr("width", width)
.attr("height", height)
 .selectAll("dot").data(data).enter().append("circle")
 .attr("transform", "translate(50,50)") 
 .attr("cx", function(d) {return xscale(d[2])})
 .attr("cy", function(d) {return yscale(d[1])})
 .attr("r", function(d) {return d[0] + 2})
 .attr("fill","lightblue")
 .attr("stroke","black")
 .on("mouseover", handleMouseOver)
 .on("mouseout", handleMouseOut);

d3.select("svg")
.attr("width", width+2*margin)
.attr("height",height+2*margin)
.append("g")
   .attr("transform", "translate("+margin+","+margin+")").call(y_axis)
.append("g")
   .attr("transform", "translate(0,200)").call(x_axis);

      //from  http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774
      // Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity
            console.log("in handleMouseOver ",d, i);
            // Use D3 to select element, change color and size
            d3.select(this).attr({"fill": "orange"});
          }

      function handleMouseOut(d, i) {
            console.log("in handleMouseOut ",d, i);	      
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({"fill": "lightblue"});
         }

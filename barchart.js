var margin = 50;
var width = 300;
var height = 300;
var xscale = d3.scaleBand().domain([0,1,2,3,4,5]).range([0,200]);
var yscale = d3.scaleLinear().domain([0, d3.max(data)]).range([200,0]);

var x_axis = d3.axisBottom().scale(xscale);
var y_axis = d3.axisLeft().scale(yscale);

d3.select("svg")
  .attr("width",width)
  .attr("height",height)
  .append("g")
    .attr("transform","translate("+margin+","+margin+")")
    .selectAll("rect").data(data).enter().append("rect")
       .attr("x",function(d,i) { return (33.3333333*i)+0; }) 
       .attr("y",function(d) { return 200-(200*d/42); })
       .attr("width",33.3333)
       .attr("height",function(d) { return (200*d/42); }); 
d3.select("svg")
  .attr("width",width+2*margin)
  .attr("height",height+2*margin)
  .append("g")
    .attr("transform", "translate("+margin+","+margin+")").call(y_axis)
  .append("g")
    .attr("transform", "translate("+margin+",250)").call(x_axis);


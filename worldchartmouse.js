var width = 900;
var height = 600;

//https://www.youtube.com/watch?v=urfyp-r255A
//cdn.jsdeliv.net/npm/world-atlas@2/countries-110m.json		
//github.com/d3/d3-geo
//https://www.youtube.com/watch?v=dJbpo8R47D0
var projection = d3.geoMercator().translate([width/2,height/2]).scale(140);
var path = d3.geoPath().projection(projection);

var svg = d3.select('body')
	.append('svg')
        .attr('width',width)
	.attr('height',height)
  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'white');
  // Append empty placeholder g element to the SVG
  // g will contain geometry elements
  var g = svg.append("g");


  
  //add a call to d3.json to load the TopoJSON file
  //so it loads into our visualization
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(data => {
    g.append('path')
      .datum(topojson.feature(data, data.objects.countries))
      .attr('d', path);
    
    //create the zoom effect
    var zoom = d3.behavior.zoom()
      .on("zoom", function() {
        g.attr("transform", "translate(" +
          d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
        g.selectAll("path")
          .attr("d", path.projection(projection));
      });
    svg.call(zoom);
    
    // Load the data from the json file
    d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json', function(error, data) {
      if (error) 
        console.error(error);
      
      var locations = data.features;
      var hue = 0; //create the circles
      
      // we will pass our data (the TopoJSON) as an argument, then create SVG elements using a classic D3 append. Selecting all paths, the TopoJSON is bound in the data method. From here, we can perform work on each element.
      
      
      locations.map(function(d) {  // Create an object for holding dataset
        hue += 0.36                // Create property for each circle, give it value from color
        d.color = 'hsl(' + hue + ', 100%, 50%)';
      });
      
      // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
      g.selectAll('circle')
        .data(locations)
        .enter()
        .append('circle') //show the circles
        .attr('cx', function(d) {
          if (d.geometry) {
            return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
          }
        })
        .attr('cy', function(d) {
          if (d.geometry) {
            return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
          }
        })
        .attr('r', function(d) {
          if (d.properties.mass) {
            return Math.pow(parseInt(d.properties.mass), 1 / 9);
          }
        })
        .style('fill', function(d) {
        //Use the Color Function to set the Fill Value for each circle
          return d.color;
        })
      
      //Next, we need to write two pieces of code, one that listens for when the value of the tooltip changes, and one that updates the SVG elements.
      //We are going to use some D3 code to listen for an input change on the tooltip elements
      
      //Add Event Listeners | mouseover
        .on('mouseover', function(d) {
          d3.select(this).style('fill', 'black'); 
          d3.select('#name').text(d.properties.name);
          d3.select('#nametype').text(d.properties.nametype);
          d3.select('#fall').text(d.properties.fall);
          d3.select('#mass').text(d.properties.mass);
          d3.select('#recclass').text(d.properties.recclass);
          d3.select('#reclat').text(d.properties.reclat);
          d3.select('#reclong').text(d.properties.reclong);
          d3.select('#year').text(d.properties.year);
          d3.select('#tooltip')
            .style('left', (d3.event.pageX + 20) + 'px')
            .style('top', (d3.event.pageY - 80) + 'px')
            .style('display', 'block')
            .style('opacity', 0.8)
        })
        //Add Event Listeners | mouseout
        .on('mouseout', function(d) { 
          d3.select(this).style('fill', d.color);
          d3.select('#tip')
            .style('display', 'none');
        });
    });
  });

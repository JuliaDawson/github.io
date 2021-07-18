<html>
<script src='https://d3js.org/d3.v5.min.js'></script>
<style> path {stroke: black;}</style>
<body>
<svg width=300 height=300>
</svg>
<script>
var data = [4,8,15,16,23,42];
var color = ['pink','lightyellow','lightgreen','lightcyan','lightblue','violet'];
var pie = d3.pie();
var arc = d3.arc().innerRadius(0).outerRadius(100);
var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        margin = 50
        radius = Math.min(width-2*margin, height-2*margin) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(color);

    // Generate the arcs
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    //Generate groups
    var arcs = g.selectAll("path")
                .data(pie(data))
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", function(d, i) {
                     return color(i);
                 });

</script>
</body>
</html>
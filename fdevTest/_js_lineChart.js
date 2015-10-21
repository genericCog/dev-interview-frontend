var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
  .range([0, width]);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var line = d3.svg.line()
  .x(function(d) {
    return x(d.receive_date);
  })
  .y(function(d) {
    return y(d.responses);
  });

var svg = d3.select("#lineChart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Get data from JSON file store in data variable
d3.json("firstmonth.json", function(error, data) {
  if (error) throw error;
  //console.debug(error);
    //alert(JSON.stringify(data));
  
  data.forEach(function(d) {
    d.receive_date = parseDate(d.receive_date);
    d.responses = +d.responses;
  });
  
  /*
    var nested_data = d3.nest()
    .key(function(d) { return d.group; })
    .entries(array_data);
    
    console.debug(nested_data);
    alert(JSON.stringify(nested_data));
  */

  x.domain(d3.extent(data, function(d) {
    return d.receive_date;
  }));
  y.domain(d3.extent(data, function(d) {
    return d.responses;
  }));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Responses");

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
  // title 
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 4))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("November Responses");
});
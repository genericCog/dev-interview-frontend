
d3.json('occupations.json', function(data) {
      //alert(JSON.stringify(data));
var w = 800;
var h = 450;
var margin = {
top: 58,
bottom: 100,
left: 80,
right: 40

};
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .domain(data.map(function(entry){
        return entry.occupation;
    }))
    .rangeBands([0, width],.2);
var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d){
        return d.responses;
    })])
    .range([height, 0]);
var xAxis = d3.svg.axis()   
                  .scale(x)
                  .orient("bottom");
var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left");
var yGridLines = d3.svg.axis()
                         .scale(y)
                         .tickSize(-width, 0, 0)
                         .tickFormat("")
                         .orient("left");
var svg = d3.select("#vertBarRegion").append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h);
var chart = svg.append("g")
        .classed("display", true)
        .attr("transform", "translate(" + margin.left + "," + margin.top +           ")");

function plot(params){
this.append("g")
     .call(yGridLines)
     .classed("gridline", true)
     .attr("transform", "translate(0,0)")
this.selectAll(".bar")
    .data(params.data)
    .enter()
        .append("rect")
        .classed("bar", true)
        .attr("x", function (d,i){
            return x(d.occupation);
        })
        .attr("y", function(d,i){
            return y(d.responses);
        })
        .attr("height", function(d,i){
            return height - y(d.responses);
        })
        .attr("width", function(d){
            return x.rangeBand();
        });
this.selectAll(".bar-label")
    .data(params.data)
    .enter()
        .append("text")
        .classed("bar-label", true)
        .attr("x", function(d,i){
            return x(d.occupation) + (x.rangeBand()/2)
        })
        .attr("dx", 0)
        .attr("y", function(d,i){
            return y(d.responses);
        })
        .attr("dy", -6)
        .text(function(d){
            return d.responses;
        })
this.append("g")
     .classed("x axis", true)
     .attr("transform", "translate(" + 0 + "," + height + ")")
     .call(xAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", -8)
                .attr("dy" ,8)
                .attr("transform", "translate(0,0) rotate(-45)");

this.append("g")
     .classed("y axis", true)
     .attr("transform", "translate(0,0)")
     .call(yAxis);

this.select(".y.axis")
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(-50," + height/2 + ") rotate(-90)")
    .text("Responses");

this.select(".x.axis")
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + width/2 + ",80)")
    .text("[Occupation]");    
    // title 
this.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Occupation Survey");    
}


plot.call(chart, {data: data});
});
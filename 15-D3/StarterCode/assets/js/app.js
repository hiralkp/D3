// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv")
  .then(function(data1) {
  	console.log(data1);

    // Step 1: Parse Data/Cast as numbers As D3 reads .csv data as TEXT we need to convert number columns back in to numbers.
    // ==============================
    data.forEach(function(data1) {
      data1.smokes = +data1.smokes;
      data1.age = +data1.age;
    });
// Step 2: Create scale functions Define scale of each axis ( e.g 0-100 ) and scaleLinear will scale the pixels accordingly.
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.smokes), d3.max(data, d => d.smokes)])
      .range([0, width]);
 
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.age), d3.max(data, d => d.age)]
      .range([height, 0]);


 // Step 3: Create axis functions. Till now we just created an axis we now are going to plot it on a graph.
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

// Step 5: Create Circles for each data point for smokes/age on a plot
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", "15")
    .attr("fill", "sea green")
    .attr("opacity", ".5");

    // Step 6: Initialize tool tip so that on moving a tool tip on each circle on a plot will display the information set in this piece of code.



	var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Smokes per Person: ${d.smokes}<br>Age of a person is: ${d.age}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data1) {
      toolTip.show(data1, this);
    })
      // onmouseout event
      .on("mouseout", function(data1, index) {
        toolTip.hide(data1);
      });

 // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Average smokes per person");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age of a person");
  });

























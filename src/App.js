import React from "react";
import {csv} from "d3-fetch";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear } from "d3-scale";
import { extent, max, min } from "d3-array";

const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/dma150/react-parcel-example-1/main/weather.csv"
    );

    csv("https://raw.githubusercontent.com/dma150/react-parcel-example-1/main/weather.csv")
    .then(data => console.log(data));

    //console.log("from hook", loading, data);
    const dataSmallSample = data.slice(0, 1000);

    const TMAXextent = extent(dataSmallSample, (d) => {
        return +d.TMAX;
    });

    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3;
    const yScale = scaleLinear()
        .domain(TMAXextent)
        .range([size - margin, size - 400]); //unit: pixels
    
    return (
        <div>
            <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
            <p>{loading && "Loading data!"}</p>

            <h3>Summary Write-up</h3>
            <p>Some of the questions I wanted to explore was how the distribution of TMAX looked like, then apply that to different stations and <br></br>compare those stations to each other. I chose the Kalispell Glacier in Montana and Dryden Terrell County in Texas - two very different areas. <br></br>I fisrt looked at what the distribution looked like of TMAX. Then I looked at and highlighted and seperated out the TMAX from the points in <br></br>Montana and Texas to compare. Next, I looked at barcode distributions of each area as well as a scatterplot distribution. Lastly I incorporated <br></br>D3 Scales to build a scalable barcode plot which was very interesting and cool to see how scalable it was hence the name.</p>
            <p> The main lessons learned here are: <br></br>1. I did not realize how JS can make so many different visualizations by the pixel. I thought that tableau and those kinds of software were the only tools. <br></br>2. JS is extremely powerful and I am excited to learn and incorporate more from class and create more interesting visualizations!</p>
            
            <h3> Scales in D3 TMAX distribution </h3>
            <p>Using D3 to scale the barcode plot is very powerful. After creating a variable called yScale, I am able to scale the y-axis <br></br>of the barcode plot into any height I want. D3 allows all the points to properly scale to any height or range of pixels. It is <br></br>very convenient to expand it out and view highlighted points now. It is less congested and offers a better view of the information. </p>
            <p>Using the scales in D3, I compared it with datapoints from Texas on the right graph. We can clearly see red lines near the top <br></br>meaning higher max temperatures compared to the left graph of Kalispell Glacier Montana.</p>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text
                x={size / 2 - 12}
                y={yScale(0) + axisTextAlignmentFactor}
                textAnchor="end" 
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  0
                </text>
                <text 
                x={size / 2 - 12}
                y={yScale(100) + axisTextAlignmentFactor} 
                textAnchor="end"
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  100 
                </text>

                <line
                    x1={size / 2 - 10}
                    y1={yScale(100)}
                    x2={size / 2 - 5}
                    y2={yScale(100)}
                    stroke={"black"}
                />

                <line
                    x1={size / 2 - 10}
                    y1={yScale(0)}
                    x2={size / 2 - 5}
                    y2={yScale(0)}
                    stroke={"black"}
                />
                
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP"
                    return (
                        <line
                            key={index} 
                            x1={size / 2}
                            y1={yScale(measurement.TMAX)}
                            x2={size / 2 + 20}
                            y2={yScale(measurement.TMAX)}
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight ? 1 : 0.1}
                        />
                    );
                })}
            </svg>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text
                x={size / 2 - 12}
                y={yScale(0) + axisTextAlignmentFactor}
                textAnchor="end" 
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  0
                </text>
                <text 
                x={size / 2 - 12}
                y={yScale(100) + axisTextAlignmentFactor} 
                textAnchor="end"
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  100 
                </text>

                <line
                    x1={size / 2 - 10}
                    y1={yScale(100)}
                    x2={size / 2 - 5}
                    y2={yScale(100)}
                    stroke={"black"}
                />

                <line
                    x1={size / 2 - 10}
                    y1={yScale(0)}
                    x2={size / 2 - 5}
                    y2={yScale(0)}
                    stroke={"black"}
                />
                
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "DRYDEN TERRELL CO AP"
                    return (
                        <line
                            key={index} 
                            x1={size / 2}
                            y1={yScale(measurement.TMAX)}
                            x2={size / 2 + 20}
                            y2={yScale(measurement.TMAX)}
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight ? 1 : 0.1}
                        />
                    );
                })}
            </svg>

            <h3> Scatterplot distribution of TMAX </h3> 
            <p>I wanted to see what the distribution would look like with a simple scatterplot. We can see that temperatures is the y-axis <br></br>in degrees. So TMAX trends downwards as we move to the right of the x-axis. This translates pretty well basing off the <br></br>barcode plot. When you look top to bottom from the barcode plot, you can see a red line at the 1/4 point. Then in the <br></br>scatterplot you can kind of see the same red circle at the 1/4 point behind some points. The scatterplot is good at looking <br></br>for different clusters and outliers.</p> 
            <p>This time using the scatterplot we can 'see' that the points are covered up because most of the points are clustered near the <br></br>top so the points are buried. Hotter max temperatures in Texas.</p> 
            <svg 
                width={size} 
                height={size} 
                style={{ border: "1px solid black" }}
            >
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP"
                    return (
                        <circle 
                            key={index} 
                            cx={100 - measurement.TMIN} 
                            cy={size - margin - measurement.TMAX} 
                            r="3" 
                            fill="none"
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity=".2"
                        />
                    );
                })}
            </svg>
            <svg 
                width={size} 
                height={size} 
                style={{ border: "1px solid black" }}
            >
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "DRYDEN TERRELL CO AP"
                    return (
                        <circle 
                            key={index} 
                            cx={100 - measurement.TMIN} 
                            cy={size - margin - measurement.TMAX} 
                            r="3" 
                            fill="none"
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity=".2"
                        />
                    );
                })}
            </svg>

            <h3> TMAX Distribution with barcode plot</h3>
            <p>To answer the question, "What does the distribution of TMAX look like at Kalispell Glacier station using a barcode plot?"<br></br>I created a barcode plot, each line representing a point of data. You can also see the red lines, which are the points from <br></br>Kalispell Glacier station signified in the barcode plot. I also added indicators of 0 and 100 to show where 0 and 100 degrees <br></br>would be on the graph, as well as adding accompanying ticks to estimate where the 'barcode' points would be.</p> 
            <p>Again we can see how most of the lines in the barcode plot for the weather station in Texas is near the top of the graph <br></br>compared to the left graph of Kalispell Glacier Montana.</p>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text
                x={size / 2 - 12}
                textAnchor="end"
                y={size - margin + axisTextAlignmentFactor} 
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  0
                </text>
                <text 
                x={size / 2 - 12}
                textAnchor="end"
                y={size - margin - 100 + axisTextAlignmentFactor} 
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  100 
                </text>

                <line
                    x1={size / 2 - 10}
                    y1={size - margin - 100}
                    x2={size / 2 - 5}
                    y2={size - margin - 100}
                    stroke={"black"}
                />

                <line
                    x1={size / 2 - 10}
                    y1={size - margin}
                    x2={size / 2 - 5}
                    y2={size - margin}
                    stroke={"black"}
                />
                
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP"
                    return (
                        <line
                            key={index} 
                            x1={size / 2}
                            y1={size - margin - measurement.TMAX}
                            x2={size / 2 + 20}
                            y2={size - margin - measurement.TMAX}
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight ? 1 : 0.1}
                        />
                    );
                })}
            </svg>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text
                x={size / 2 - 12}
                textAnchor="end"
                y={size - margin + axisTextAlignmentFactor} 
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  0
                </text>
                <text 
                x={size / 2 - 12}
                textAnchor="end"
                y={size - margin - 100 + axisTextAlignmentFactor} 
                style={{fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >
                  100 
                </text>

                <line
                    x1={size / 2 - 10}
                    y1={size - margin - 100}
                    x2={size / 2 - 5}
                    y2={size - margin - 100}
                    stroke={"black"}
                />

                <line
                    x1={size / 2 - 10}
                    y1={size - margin}
                    x2={size / 2 - 5}
                    y2={size - margin}
                    stroke={"black"}
                />
                
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "DRYDEN TERRELL CO AP"
                    return (
                        <line
                            key={index} 
                            x1={size / 2}
                            y1={size - margin - measurement.TMAX}
                            x2={size / 2 + 20}
                            y2={size - margin - measurement.TMAX}
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight ? 1 : 0.1}
                        />
                    );
                })}
            </svg>

            <h3> TMAX Distribution of Kalispell Glacier station </h3>
            
            <p>To answer the question, "What does the distribution of TMAX look like at Kalispell Glacier station?" <br></br> I used the same distribution graph as the one below but added and moved points to the right of the <br></br>distribution (marked in red) to show the max temperatures at Kalispell Glacier station.</p>
            <p> Putting another graph of the distribution side by side, I changed the weather station to be in Texas, to <br></br>compare with Kalispell Glacier in Montana. Now we can see the highlighted points near the top, meaning higher temperatures. </p>
            <svg 
                width={size} 
                height={size} 
                style={{ border: "1px solid black" }}
            >
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP"
                    return (
                        <circle 
                            key={index} 
                            cx={highlight ? size / 2 : size / 2 - 20} 
                            cy={size - margin - measurement.TMAX} 
                            r="3" 
                            fill="none"
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity=".2"
                        />
                    );
                })}
            </svg>
            <svg 
                width={size} 
                height={size} 
                style={{ border: "1px solid black" }}
            >
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "DRYDEN TERRELL CO AP"
                    return (
                        <circle 
                            key={index} 
                            cx={highlight ? size / 2 : size / 2 - 20} 
                            cy={size - margin - measurement.TMAX} 
                            r="3" 
                            fill="none"
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity=".2"
                        />
                    );
                })}
            </svg>

            <h3> TMAX Distribution</h3>
            <p>To answer the question, "What does the distribution of TMAX (Max Temperature) look like in a univariate graph?" <br></br> I created an svg, with each point representing a circle. You can see that each circle is not filled in so that it's not just <br></br>all one blob. With the circles not filled, you can see where each point overlaps with a datasize of 1000 or less. So you <br></br>can see the distribution of all the max temperatures. </p>
            <svg 
                width={size} 
                height={size} 
                style={{ border: "1px solid black" }}
            >
                {dataSmallSample.map((measurement, index) => {
                    return (
                        <circle 
                            key={index} 
                            cx={size / 2} 
                            cy={size - margin - measurement.TMAX} 
                            r="3" 
                            fill="none"
                            stroke={"steelblue"}
                            strokeOpacity=".2"
                        />
                    );
                })}
            </svg>
            
        </div>
    ); // outer brace = js / inner brace = object
};

export default App;

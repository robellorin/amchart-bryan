import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import data from './data'

// Themes
am4core.useTheme(am4themes_animated);

export const Skills = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    let chart = am4core.create(
      'chartdiv',
      am4plugins_forceDirected.ForceDirectedTree
    );
    chartRef.current = chart;
    chart.legend = new am4charts.Legend();


    let networkSeries = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );

    networkSeries.data = data

    networkSeries.dataFields.linkWith = "linkWith";
    networkSeries.dataFields.name = "name";
    networkSeries.dataFields.id = "name";
    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.children = "children";

    networkSeries.nodes.template.tooltipText = "{name}";
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = "{name}";
    networkSeries.fontSize = 15;

    // Start with all nodes collapsed
    networkSeries.maxLevels = 1;

    // Expand single level only
    networkSeries.nodes.template.expandAll = false;

    // Close other nodes when one is opened
    networkSeries.nodes.template.events.on("hit", function(ev) {
      var targetNode = ev.target;
      if (targetNode.isActive) {
        networkSeries.nodes.each(function(node) {
          if (
            targetNode !== node &&
            node.isActive &&
            targetNode.dataItem.level === node.dataItem.level
          ) {
            node.isActive = false;
          }
        });
      }
    });

    networkSeries.minRadius = am4core.percent(2);
    networkSeries.maxRadius = am4core.percent(8);
    networkSeries.manyBodyStrength = -16;
    networkSeries.nodes.template.label.hideOversized = true;
    networkSeries.nodes.template.label.truncate = true;
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    }
  }, []);
  
  return (
    <div>
      <div ref={chartRef} id="chartdiv"></div>
    </div>
  );
}
export default Skills;

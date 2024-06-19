import React, { Component } from 'react';
import CanvasJSReact from '../../assets/chartFils/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartComp extends Component {
  render() {
    const options = {
      animationEnabled: true,
      // exportEnabled: true,

      // title: {
      //   text: this.props.name,
      // },
      // width: 300,
      height: 300,

      data: [
        {
          type: 'pie',
          startAngle: 85,
          radius: '100%',
          toolTipContent: '<b>{label}</b>: {y}%',
          showInLegend: 'true',
          legendText: '{label}',
          indexLabelFontSize: 14,
          indexLabel: '{label}',
          dataPoints: this.props.data,
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          width={'100%'}
          style={this.props.style}
        /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default PieChartComp;

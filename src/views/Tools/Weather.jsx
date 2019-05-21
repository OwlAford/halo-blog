import React from 'react';
import { observer, inject } from 'mobx-react';
import G2 from '@antv/g2';

@inject(stores => {
  const {
    home: { weatherChart, ipCity, updateTime, weatherDetails },
  } = stores;

  return {
    weatherChart,
    ipCity,
    updateTime,
    weatherDetails,
  };
})
@observer
class Weather extends React.Component {
  componentDidMount() {
    const chart = new G2.Chart({
      container: 'c1',
      // forceFit: true,
      height: 340,
      width: 520,
      padding: [30, 30, 40, 50],
    });

    chart.source(this.props.weatherChart, {
      month: {
        range: [0, 1],
      },
    });

    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });

    chart.axis('temperature', {
      label: {
        formatter(val) {
          return val + '°C';
        },
      },
    });

    chart
      .line()
      .position('week*temperature')
      .color('type');
    chart
      .point()
      .position('week*temperature')
      .color('type')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    chart.render();
  }

  render() {
    return (
      <div className="tools-card full">
        <div className="title row">
          <div className="inner">
            <i className="iconfont">&#xe60b;</i>
            <span>{this.props.ipCity}一周天气</span>
          </div>
          <div className="timestamp">更新时间：{this.props.updateTime}</div>
        </div>
        <div className="fn-area">
          <div className="row">
            <div id="c1" />
            <div className="previewTable app-skew-shadow">
              <table border="0" cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>天气</th>
                    <th>风力</th>
                    <th>紫外线</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.weatherDetails.map((item, i) => (
                    <tr key={i}>
                      <td>{item.date}</td>
                      <td>
                        {item.wea} {item.air && `（空气污染：${item.air}）`}
                      </td>
                      <td>{item.wind}</td>
                      <td>{item.sun}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;

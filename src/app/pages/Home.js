import React, { useEffect, useRef, useState } from 'react';

import SelectInput from '../components/SelectInput';
import { dataMonth, itemCode } from '../config/dataConfig';
import PieChartComp from '../components/chart/PieChartComp';
import { logo } from '../assets/images';
import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
const Home = () => {
  let optionItem = [];
  const [getItemCode, setGetItemCode] = useState([]);
  const getItemCodeData = async () => {
    try {
      const res = await axios.get(`${API_CONFIG}text/get_itemdata`);

      setGetItemCode(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialFormDatas = {
    item_code: '',
    month: '',
  };

  const [formDatas, setFormDatas] = useState(initialFormDatas);
  const [getReportData, setGetReportData] = useState([]);
  const handleChange = (e) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
    if (e.target.name === 'type') {
      financeReportData(formDatas.item_code, e.target.value);
    }
  };
  // console.log('getData', getReportData);

  const financeReportData = async (item_code, month_value) => {
    console.log('formdatas on financeReport', formDatas);
    try {
      const res = await axios.get(
        `${API_CONFIG}text/getdata/${item_code}/${month_value}`
      );
      console.log('fetchDatas', res.data);

      const responseHard = res.data;

      // {"msg":"Data Fetch Successfully","dataone":[{"Description":"SUBCODE","value":0.6},{"Description":"SUBCODE 1","value":0.6},{"Description":"SUBCODE 2","value":0.5}],"datatwo":[{"Description":"U","value":0.6},{"Description":"U1","value":0.8},{"Description":"U2","value":0.9}],"datathree":[{"Description":"v1","value":22},{"Description":"v2","value":32},{"Description":"v3","value":42}],"datafour":[{"Description":"w1","value":200},{"Description":"w2","value":80},{"Description":"w3","value":90}],"dataFive":[{"Description":"x1","value":61},{"Description":"x2","value":62},{"Description":"x3","value":63}],"datasix":[{"Description":"y1","value":100},{"Description":"y2","value":220},{"Description":"y3","value":340}]}
      // console.log('responseHard',responseHard.dataone)

      let dataOneTotal = 0;
      let dataTwoTotal = 0;
      let dataThreeTotal = 0;
      let dataFourTotal = 0;
      let dataFiveTotal = 0;
      let dataSixTotal = 0;

      const loops = [
        {
          key: 'dataone',
          totalkey: dataOneTotal,
          value: [],
        },
        {
          key: 'datatwo',
          totalkey: dataTwoTotal,
          value: [],
        },
        {
          key: 'datathree',
          totalkey: dataThreeTotal,
          value: [],
        },
        {
          key: 'datafour',
          totalkey: dataFourTotal,
          value: [],
        },
        {
          key: 'dataFive',
          totalkey: dataFiveTotal,
          value: [],
        },
        {
          key: 'datasix',
          totalkey: dataSixTotal,
          value: [],
        },
      ];
      loops.map((loop) => {
        responseHard[loop.key].map(
          (dataItem) => (loop.totalkey += Number(dataItem.value))
        );
        const loopdata = responseHard[loop.key].map((dataItem) => {
          return {
            ...dataItem,
            total: loop.totalkey,
            percentage: (dataItem.value / loop.totalkey) * 100,
          };
        });
        loop.value = loopdata;
      });
      const value = loops.map((looop) => {
        return { [looop.key]: looop.value };
      });
      console.log('value', ...value);
      const returnData = {
        ...responseHard,
        dataone: value[0].dataone,
        datatwo: value[1].datatwo,
        datathree: value[2].datathree,
        datafour: value[3].datafour,
        dataFive: value[4].dataFive,
        datasix: value[5].datasix,
      };
      console.log('returnData', returnData);

      setGetReportData(returnData);
      // setGetReportData(res.data);

      // setFormDatas(initialFormDatas)
    } catch (error) {
      console.log(error);
    }
  };

  let reportOne = [];
  let reportTwo = [];
  let reportThree = [];
  let reportFour = [];
  let reportFive = [];
  let reportSix = [];

  console.log('report on 76', getReportData);
  if (getReportData.msg === 'Data Fetch Successfully') {
    getReportData?.dataone?.map((dat) => {
      reportOne.push({
        label: dat?.Description,
        y: dat?.percentage.toFixed(2),
      });
    });
    getReportData?.datatwo?.map((dat) => {
      reportTwo.push({
        label: dat?.Description,
        y: dat?.percentage.toFixed(2),
      });
    });
    getReportData?.datathree?.map((dat) => {
      reportThree.push({
        label: dat?.Description,
        y: dat?.percentage.toFixed(2),
      });
    });
    getReportData?.datafour?.map((dat) => {
      reportFour.push({
        label: dat?.Description,
        y: dat?.percentage.toFixed(2),
      });
    });
    getReportData?.dataFive?.map((dat) => {
      reportFive.push({
        label: dat?.Description,
        y: dat?.percentage.toFixed(2),
      });
    });
    getReportData?.datasix?.map((dat) => {
      reportSix.push({
        label: dat?.Description,
        y: dat?.percentage.toFixed(2),
      });
    });
  }
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Report',
  });

  useEffect(() => {
    getItemCodeData();
  }, []);
  // setTimeout(() => {
  // }, 500);

  return (
    <>
      <div className='total_sec'>
        {/* <h1 className='heading'>Wittur Finance</h1> */}
        {/* <div className='logosec'>
          <img src={logo} alt='logo' className='client_logo' />
        </div> */}
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <label>Select Item Code</label>
              <select
                className='form-control '
                name='item_code'
                required
                value={formDatas.item_code}
                onChange={handleChange}>
                <option value=''>Choose...</option>
                {getItemCode?.map((item, index) => (
                  <option key={index} value={item.item_code}>
                    {item?.item_code}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-5'>
              <label>Select Month</label>
              <select
                className='form-control '
                name='month_value'
                required
                value={formDatas.month_value}
                onChange={handleChange}>
                <option value=''>Choose...</option>
                {dataMonth?.map((item, index) => (
                  <option key={index} value={item.month_value}>
                    {item?.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-1'>
              <button onClick={handlePrint} className='btn export_btn'>
                <AiOutlineFilePdf />
              </button>
            </div>
          </div>
        </div>
        <div className='data_sec' ref={componentRef}>
          <div className='container'>
            {getReportData?.dataone?.length > 0 ? (
              <div className='row'>
                <div className='col-6'>
                  <div className='card_sec'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>SFG CATEGORY</th>
                          <th>Values</th>
                          <th>Percentage %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData?.dataone?.map((dat, index) => {
                          return (
                            <tr key={index}>
                              <td>{dat?.Description}</td>
                              <td>{dat?.value}</td>
                              <td>{dat?.percentage.toFixed(2)} % </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='card_sec'>
                    <PieChartComp data={reportOne} name={'Accounts Data'} />
                  </div>
                </div>
              </div>
            ) : null}
            {getReportData?.datatwo?.length > 0 ? (
              <div className='row mt-4'>
                <div className='col-6'>
                  <div className='card_sec'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>CURRENCY</th>
                          <th>Values</th>
                          <th>Percentage %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData?.datatwo.map((dat, index) => {
                          return (
                            <tr key={index}>
                              <td>{dat?.Description}</td>
                              <td>{dat?.value}</td>
                              <td>{dat?.percentage.toFixed(2)} % </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='card_sec'>
                    <PieChartComp data={reportTwo} name={'Accounts Data'} />
                  </div>
                </div>
              </div>
            ) : null}
            {getReportData?.datathree?.length > 0 ? (
              <div className='row mt-4'>
                <div className='col-6'>
                  <div className='card_sec'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>PRODUCT CLASS</th>
                          <th>Values</th>
                          <th>Percentage %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData?.datathree.map((dat, index) => {
                          return (
                            <tr key={index}>
                              <td>{dat?.Description}</td>
                              <td>{dat?.value}</td>
                              <td>{dat?.percentage.toFixed(2)} % </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='card_sec'>
                    <PieChartComp data={reportThree} name={'Accounts Data'} />
                  </div>
                </div>
              </div>
            ) : null}
            {getReportData?.datafour?.length > 0 ? (
              <div className='row mt-4'>
                <div className='col-6'>
                  <div className='card_sec'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>SHEET FINISH</th>
                          <th>GROSS USAGE</th>
                          <th>Percentage %</th>
                          <th>NET USAGE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData?.datafour.map((dat, index) => {
                          return (
                            <tr key={index}>
                              <td>{dat?.Description}</td>
                              <td>{dat?.value}</td>
                              <td>{dat?.percentage.toFixed(2)} % </td>
                              <td>{dat?.NET.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='card_sec'>
                    <PieChartComp data={reportFour} name={'Accounts Data'} />
                  </div>
                </div>
              </div>
            ) : null}
            {getReportData?.dataFive?.length > 0 ? (
              <div className='row mt-4'>
                <div className='col-6'>
                  <div className='card_sec'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>SFG GROUP</th>
                          <th>MATERIAL COST</th>
                          <th>MATERIAL COST LANDED</th>
                          <th>DIFFERENCE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData?.dataFive.map((dat, index) => {
                          return (
                            <tr key={index}>
                              <td>{dat?.Description}</td>
                              <td>{dat?.value}</td>
                              <td>{dat?.landed.toFixed(2)}</td>
                              <td>{dat?.diff.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  {/* <div className='card_sec'>
                    <PieChartComp data={reportFive} name={'Accounts Data'} />
                  </div> */}
                </div>
              </div>
            ) : null}
            {getReportData?.datasix?.length > 0 ? (
              <div className='row mt-4'>
                <div className='col-6'>
                  <div className='card_sec'>
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>ITEM CODE</th>
                          <th>SHEET FINISH</th>
                          <th>P.O RATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getReportData?.datasix.map((dat, index) => {
                          return (
                            <tr key={index}>
                              <td>{dat?.Description}</td>
                              <td>{dat?.category.toFixed(2)}</td>
                              <td>{dat?.value}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='col-6'>
                  {/* <div className='card_sec'>
                    <PieChartComp data={reportSix} name={'Accounts Data'} />
                  </div> */}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

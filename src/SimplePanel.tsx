import React, { useState } from 'react';
import {
  PanelProps,
  DataSourceInstanceSettings,
  DataSourceJsonData,
  DataQueryRequest,
  DataQueryResponse,
} from '@grafana/data';
import { SimpleOptions, MyQuery } from 'types';
import { getDataSourceSrv } from '@grafana/runtime';
import { Observable } from 'rxjs';
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';
// import Select from 'react-select';
// import Dropdown, { Option } from 'react-dropdown';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [value, setValue] = useState('');
  const [fetchedData, setFetchedData] = useState('');
  // const [dropDownVal, setDropDownVal] = useState('');

  // setDropDownVal('Whatever!');
  // const opt = ['one', 'two', 'three'];
  //
  // const handleOptions: (e: string) => {
  //   setDropDownVal(e: any): any;
  // }

  // console.log('Data from Panel Props:')
  // console.log(data)
  let dssrv = getDataSourceSrv();
  console.log('dssrv is: ');
  console.log(dssrv);
  console.log('getList returns: ');
  console.log(dssrv.getList());
  console.log('get("VOLTTRON") returns:');
  console.log(dssrv.get('VOLTTRON'));
  console.log('getInstanceSettings returns:');
  const instance_settings: DataSourceInstanceSettings<DataSourceJsonData> | undefined = dssrv.getInstanceSettings(
    options.DataSourceName
  );
  console.log(instance_settings);
  //const  url = '' ? instance_settings === undefined : instance_settings.url

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    alert(`Submitting Value: ${value}`);

    let dsprms = dssrv.get(options.DataSourceName).then(async (DataSource) => {
      let q = {
        refId: DataSource.id.toString(),
        http_method: 'PUT',
        route: options.platformDevice + options.URL,
        data: { value: value },
      } as MyQuery;
      let request = {} as DataQueryRequest;
      request.targets = [q];
      let resp = (await DataSource.query(request)) as unknown as Observable<DataQueryResponse>;
      console.log('resp from query is:');
      console.log(resp);

      resp.subscribe({
        next(obsData) {
          console.log('Observable Return is: ');
          let setError = JSON.parse(obsData.data[0].fields[0].values.buffer[0]);
          let respKey = Object.keys(setError)[0];
          console.log(setError);
          if (setError[respKey].set_error == null) {
            setFetchedData(value);
          } else {
            setFetchedData('Error Setting Value');
          }
        },
        error(err) {
          console.error('Something went wrong: ' + err);
          setFetchedData('Error Setting Value');
        },
      });

      // let setError = JSON.parse(resp.data[0].fields[0].values.buffer[0]);
      // console.log('Value of set_error:');
      // console.log(setError);
      // console.log(setError[options.URL].set_error)
      // if (setError[options.URL].set_error == null){
      //     setFetchedData(value);
      // } else {
      //     setFetchedData("Error Setting Value")
      // }
      //onRunQuery()
      //return request;
    });
    console.log('Datasource param response');
    console.log(dsprms);
  };

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {/*<Dropdown options={opt} onChange={handleOptions} value={dropDownVal} placeholder="Select an option" />;*/}
      <div>
        <h1>Set Point Value: {fetchedData}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Set Point Value:
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

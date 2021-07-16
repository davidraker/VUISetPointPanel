import React, {useState} from 'react';
import {
    PanelProps,
    DataSourceInstanceSettings,
    DataSourceJsonData,
    DataQueryRequest
} from '@grafana/data';
import {SimpleOptions, MyQuery} from 'types';
import {getDataSourceSrv} from '@grafana/runtime';
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {
}

export const SimplePanel: React.FC<Props> = ({options, data, width, height}) => {
    const [value, setValue] = useState('');
    const [fetchedData , setFetchedData] = useState('');

    // console.log('Data from Panel Props:')
    // console.log(data)

    const handleSubmit = (evt: { preventDefault: () => void }) => {
        evt.preventDefault();
        alert(`Submitting Value: ${value}`);
        let dssrv = getDataSourceSrv();
        console.log('dssrv is: ');
        console.log(dssrv);
        console.log('getList returns: ');
        console.log(dssrv.getList());
        console.log('get("VOLTTRON") returns:');
        console.log(dssrv.get('VOLTTRON'));
        console.log('getInstanceSettings returns:');
        const instance_settings: DataSourceInstanceSettings<DataSourceJsonData> | undefined =
            dssrv.getInstanceSettings(options.DataSourceName);
        console.log(instance_settings);
        //const  url = '' ? instance_settings === undefined : instance_settings.url
        let dsprms = dssrv.get(options.DataSourceName).then(async (DataSource) => {
            let q = {
                refId: DataSource.id.toString(),
                http_method: 'PUT',
                route: '/platforms/' + options.VolttronNode + '/devices/' + options.URL,
                data: {value: value},
            } as MyQuery;
            let request = {} as DataQueryRequest;
            request.targets = [q];
            let resp = await DataSource.query(request);
            console.log('resp from query is:');
            console.log(resp);

            let setError = JSON.parse(resp['data']['0'].first.buffer['0'])
            console.log(setError['Campus/Building1/Fake2/SampleWritableFloat1'].set_error)
            if (setError[options.URL].set_error == null){
                setFetchedData(value);
            } else {
                setFetchedData("Error Setting Value")
            }
            //onRunQuery()
            //return request;
        })

        console.log("Datasource param response")
        console.log(dsprms);
    };

    return (
        <div
            style={{
                width,
                height,
            }}
        >
            <div>
                <h1>Set Point Value: {fetchedData}</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter Set Point Value:
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    );
};

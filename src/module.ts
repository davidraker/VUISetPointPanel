import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './types';
import {SimplePanel} from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
    return builder
        .addTextInput({
            path: 'DataSourceName',
            name: 'DataSource Plugin Name',
            description: 'Enter the name of DataSource Plugin Used',
            defaultValue: 'VOLTTRON',
        })
        .addTextInput({
            path: 'platformDevice',
            name: 'Platform Device',
            description: 'Enter the Platform Device Path',
            defaultValue: '/platforms/labtestlion',
        })
        .addTextInput({
            path: 'URL',
            name: 'API Endpoint Input',
            description: 'Enter the API endpoint to send data',
            defaultValue: '/devices/Campus/Building1/Fake2/SampleWritableFloat1',
        })
        // .addBooleanSwitch({
        //     path: 'showSeriesCount',
        //     name: 'Show series counter',
        //     defaultValue: false,
        // })
        // .addRadio({
        //     path: 'seriesCountSize',
        //     defaultValue: 'sm',
        //     name: 'Series counter size',
        //     settings: {
        //         options: [
        //             {
        //                 value: 'sm',
        //                 label: 'Small',
        //             },
        //             {
        //                 value: 'md',
        //                 label: 'Medium',
        //             },
        //             {
        //                 value: 'lg',
        //                 label: 'Large',
        //             },
        //         ],
        //     },
        //     showIf: (config) => config.showSeriesCount,
        // })
});

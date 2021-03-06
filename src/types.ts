import { DataQuery } from '@grafana/data';

type SeriesSize = 'sm' | 'md' | 'lg';
type CircleColor = 'red' | 'green' | 'blue';

export interface SimpleOptions {
  platformDevice: string;
  DataSourceName: string;
  URL: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  color: CircleColor;
}

export interface MyQuery extends DataQuery {
  route?: string;
  http_method?: string;
  data?: object;
}

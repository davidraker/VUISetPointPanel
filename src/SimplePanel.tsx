import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> { }

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [value, setValue] = useState('');
  const [fetchedData, setFetchedData] = useState('');

  let URL = 'https://jsonplaceholder.typicode.com/posts/1';

  const fetchAPI = async (url: string) => {
    //Request Payload for the PUT/POST req.
    const sendData = {
      "id": 1,
      "title": value,
      "body": "bar",
      "userId": 1
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData)
    };
    try {
      const response = await fetch(url, requestOptions);
      const json = await response.json();
      setFetchedData(json.title) //Set the required API response data to state variable
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    alert(`Submitting Value: ${value}`);

    fetchAPI(URL);
  };

  return (
    <div style={{
      width,
      height
    }}>
      <div>
        <h1>Set Point Value: {fetchedData}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Set Point Value:
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

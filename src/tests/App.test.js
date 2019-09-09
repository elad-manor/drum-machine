import React from 'react';
import ReactDOM from 'react-dom';
import DrumMachineContainer from '../containers/drumMachineContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DrumMachineContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
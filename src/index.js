import React from 'react';
import ReactDOM from 'react-dom';
import DrumMachineContainer from './containers/drumMachineContainer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AcousticSamples from './constants/acousticSamples';
import ElectronicSamples from './constants/electronicSamples';
import Utils from './utils/utils';

const initialState = {
    activeSounds: Utils.createSoundsObject(AcousticSamples),
    isElectronic: false,
    isTouchDevice: "ontouchstart" in document.documentElement,
    customizeMode: false,
    assignKeyMode: false,
    existingKeySelected: false,
    recordMode: false,
    playMode: false
};

function reducer(state = initialState, action) {
    const {activeSounds, customizeMode, assignKeyMode, existingKeySelected} = state;

    switch (action.type) {
        case 'CHANGE-SAMPLES':
            return {
                activeSounds: Utils.createSoundsObject(action.isElectronic ? ElectronicSamples : AcousticSamples, activeSounds),
                isElectronic: action.isElectronic,
                ...state
            };
        // case 'HANDLE-CUSTOMIZE':
        //     return !customizeMode && !assignKeyMode && !existingKeySelected ? {
        //         customizeMode: true,
        //         ...state
        //     } : {
        //         customizeMode: false,
        //         assignKeyMode: false,
        //         existingKeySelected: false,
        //         ...state
        //     };
        case 'HANDLE-CUSTOMIZE':
            return  {
                customizeMode: true
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
      <DrumMachineContainer/>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
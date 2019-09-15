import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrumMachineContainer from '../containers/drumMachineContainer';

configure({ adapter: new Adapter() });
window.HTMLMediaElement.prototype.load = () => {};

describe('Test DrumMachineContainer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<DrumMachineContainer />);
    });

    it('Should render DrumMachineContainer children', () => {
        const drumContainer = wrapper.find('DrumContainer');
        const soundSelectorContainer = wrapper.find('SoundSelectorContainer');
        const buttonContainer = wrapper.find('ButtonContainer');
        const messageContainer = wrapper.find('MessageContainer');

        expect(drumContainer).toBeDefined();
        expect(soundSelectorContainer).toBeDefined();
        expect(buttonContainer).toBeDefined();
        expect(messageContainer).toBeDefined();
    });
});
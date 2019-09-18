import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrumMachineContainer from '../containers/drumMachineContainer';

configure({ adapter: new Adapter() });
window.HTMLMediaElement.prototype.load = () => {};

describe('Test DrumMachineContainer', () => {
    let wrapper;

    it('Should render DrumMachineContainer children', () => {
        wrapper = shallow(<DrumMachineContainer />);

        expect(wrapper.find('DrumContainer')).toBeDefined();
        expect(wrapper.find('SoundSelectorContainer')).toBeDefined();
        expect(wrapper.find('ButtonContainer')).toBeDefined();
        expect(wrapper.find('MessageContainer')).toBeDefined();
    });
});
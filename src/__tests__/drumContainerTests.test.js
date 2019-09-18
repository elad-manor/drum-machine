import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DrumContainer from '../containers/drumContainer';

configure({ adapter: new Adapter() });

describe('Test DrumContainer', () => {
    let wrapper;
    let sounds = {
        snare: {
            sound: null,
            keycode: 1
        }
    };

    it('Should render div with drum-container class', () => {
        wrapper = shallow(<DrumContainer
            activeSounds={sounds}/>);

        expect(wrapper.find('.drum-container')).toBeDefined();
    });

    it('handleClick should be invoked when drum is clicked', () => {
        const mockFn = jest.fn();

        wrapper = shallow(<DrumContainer
            activeSounds={sounds}
            handleClick={mockFn}/>);

        wrapper.find('#snare').simulate('click');

        expect(mockFn.mock.calls.length).toEqual(1);
    });

    it('Should render drum-key when not on touch device', () => {
        wrapper = shallow(<DrumContainer
            activeSounds={sounds}
            isTouchDevice={false}/>);

        expect(wrapper.find('.drum-key')).toBeDefined();
    });

    it('Should not render drum-key when on touch device', () => {
        wrapper = shallow(<DrumContainer
            activeSounds={sounds}
            isTouchDevice={true}/>);

        expect(wrapper.find('.drum-key')).toEqual({});
    });
});
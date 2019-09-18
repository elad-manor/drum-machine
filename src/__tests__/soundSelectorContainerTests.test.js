import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SoundSelectorContainer from '../containers/soundSelectorContainer';

configure({ adapter: new Adapter() });

describe('Test SoundSelectorContainer', () => {
    let wrapper;

    it('Should render sound-selector-container, sound-selector-label and toggle-switch', () => {
        wrapper = shallow(<SoundSelectorContainer />);

        expect(wrapper.find('.sound-selector-container')).toBeDefined();
        expect(wrapper.find('.sound-selector-label')).toBeDefined();
        expect(wrapper.find('.toggle-switch')).toBeDefined();
    });

    it('handleOptionChange should be invoked when the option is changed', () => {
        const mockFn = jest.fn();

        wrapper = shallow(<SoundSelectorContainer
            handleOptionChange={mockFn}/>
        );

        wrapper.find('.toggle-switch').simulate('change');

        expect(mockFn.mock.calls.length).toEqual(1);
    });

    it('Toggle should be "unchecked" when isElectronic is false', () => {
        wrapper = shallow(<SoundSelectorContainer
            isElectronic={false}/>
        );

        expect(wrapper.find('.toggle-switch').props().checked).toEqual(false);
    });

    it('Toggle should be "checked" when isElectronic is true', () => {
        wrapper = shallow(<SoundSelectorContainer
            isElectronic={true}/>
        );

        expect(wrapper.find('.toggle-switch').props().checked).toEqual(true);
    });
});
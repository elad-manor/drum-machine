import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonContainer from '../containers/buttonContainer';
import ButtonLabels from '../constants/buttonLabels';

configure({ adapter: new Adapter() });

describe('Test ButtonContainer', () => {
    let wrapper;

    it('Should render div with button-container class and record and play buttons', () => {
        wrapper = shallow(<ButtonContainer />);

        expect(wrapper.find('.button-container')).toBeDefined();
        expect(wrapper.find('.record-button')).toBeDefined();
        expect(wrapper.find('.play-button')).toBeDefined();
    });

    it('Should render customize button when not on touch device', () => {
        wrapper = shallow(
            <ButtonContainer
                isTouchDevice={false}/>
        );

        expect(wrapper.find('.customize-button')).toBeDefined();
    });

    it('Should not render customize button when not on touch device', () => {
        wrapper = shallow(
            <ButtonContainer
                isTouchDevice={true}/>
        );

        expect(wrapper.find('.customize-button')).toEqual({});
    });

    it('Customize button text should be "Customize" when editMode is false', () => {
        wrapper = shallow(
            <ButtonContainer
                isTouchDevice={false}
                editMode={false}/>
        );

        expect(wrapper.find('.customize-button').text()).toEqual(ButtonLabels.customize);
    });

    it('Customize button text should be "Cancel" when editMode is true', () => {
        wrapper = shallow(
            <ButtonContainer
                isTouchDevice={false}
                editMode={true}/>
        );

        expect(wrapper.find('.customize-button').text()).toEqual(ButtonLabels.cancel);
    });

    it('Record button icon should be "record" when recordMode is false', () => {
        wrapper = shallow(
            <ButtonContainer
                recordMode={false}/>
        );

        expect(wrapper.find('.record-button').text()).toEqual(ButtonLabels.record);
    });

    it('Record button icon should be "stop" when recordMode is true', () => {
        wrapper = shallow(
            <ButtonContainer
                recordMode={true}/>
        );

        expect(wrapper.find('.record-button').text()).toEqual(ButtonLabels.stop);
    });

    it('Play button icon should be "play" when playMode is false', () => {
        wrapper = shallow(
            <ButtonContainer
                playMode={false}/>
        );

        expect(wrapper.find('.play-button').text()).toEqual(ButtonLabels.play);
    });

    it('Play button icon should be "stop" when playMode is true', () => {
        wrapper = shallow(
            <ButtonContainer
                playMode={true}/>
        );

        expect(wrapper.find('.play-button').text()).toEqual(ButtonLabels.stop);
    });

    it('handleCustomize should be invoked when customize button is clicked', () => {
        const mockFn = jest.fn();

        wrapper = shallow(
            <ButtonContainer
                isTouchDevice={false}
                handleCustomize={mockFn}/>
        );

        wrapper.find('.customize-button').simulate('click');

        expect(mockFn.mock.calls.length).toEqual(1);
    });

    it('handleRecord should be invoked when record button is clicked', () => {
        const mockFn = jest.fn();

        wrapper = shallow(
            <ButtonContainer
                handleRecord={mockFn}/>
        );

        wrapper.find('.record-button').simulate('click');

        expect(mockFn.mock.calls.length).toEqual(1);
    });

    it('handlePlay should be invoked when play button is clicked', () => {
        const mockFn = jest.fn();

        wrapper = shallow(
            <ButtonContainer
                handlePlay={mockFn}/>
        );

        wrapper.find('.play-button').simulate('click');

        expect(mockFn.mock.calls.length).toEqual(1);
    });
});
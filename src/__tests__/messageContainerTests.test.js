import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageContainer from '../containers/messageContainer';
import MessageTexts from '../constants/messageTexts';

configure({ adapter: new Adapter() });

describe('Test MessageContainer', () => {
    let wrapper;

    it('Should render div with message-container class', () => {
        wrapper = shallow(<MessageContainer />);

        expect(wrapper.find('.message-container')).toBeDefined();
    });

    it('Message text should be "customize" message when customizeMode is true', () => {
        wrapper = shallow(<MessageContainer
            customizeMode={true}/>);

        expect(wrapper.find('.message-text').text()).toEqual(MessageTexts.customizeMessage);
    });

    it('Message text should be "assign key" message when customizeMode is true', () => {
        wrapper = shallow(<MessageContainer
            assignKeyMode={true}/>);

        expect(wrapper.find('.message-text').text()).toEqual(MessageTexts.assignKeyMessage);
    });

    it('Message text should be "existing key" message when customizeMode is true', () => {
        wrapper = shallow(<MessageContainer
            existingKeySelected={true}/>);

        expect(wrapper.find('.message-text').text()).toEqual(MessageTexts.existingKeyMessage);
    });
});
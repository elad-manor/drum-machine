import React from 'react';
import classNames from "classnames";
import { connect } from 'react-redux';

class SoundSelectorContainer extends React.Component {
    render() {
        const {isElectronic, handleOptionChange} = this.props;

        return (
            <div className='sound-selector-container'>
                <span className={classNames('sound-selector-label', {'sound-selector-label__selected': !isElectronic})} title='Acoustic'>Acoustic</span>
                <input type='checkbox' className='toggle-switch' onChange={handleOptionChange} checked={isElectronic} />
                <span className={classNames('sound-selector-label', {'sound-selector-label__selected': isElectronic})} title='Electronic'>Electronic</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isElectronic: state.isElectronic
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleOptionChange: (e) => {
            dispatch({
                type: 'CHANGE-SAMPLES',
                isElectronic: e.currentTarget.checked
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundSelectorContainer);
import React from 'react';
import { connect } from 'react-redux';
import ButtonLabels from '../constants/buttonLabels';

class ButtonContainer extends React.Component {
    render() {
        const {isTouchDevice, handleCustomize, handleRecord, handlePlay, playMode, recordMode, customizeMode, assignKeyMode, existingKeySelected, isRecorded} = this.props;
        const editMode = customizeMode || assignKeyMode || existingKeySelected;
        const disablePlay = isRecorded || recordMode || editMode;

        return (
            <div className='button-container'>
                {!isTouchDevice && <button className='customize-button' onClick={handleCustomize} disabled={playMode || recordMode}>{editMode ? ButtonLabels.cancel : ButtonLabels.customize}</button>}
                <button className='record-button' onClick={handleRecord} disabled={playMode || editMode}>{recordMode ? ButtonLabels.stop : ButtonLabels.record}</button>
                <button className='play-button' onClick={handlePlay} disabled={disablePlay}>{playMode ? ButtonLabels.stop : ButtonLabels.play}</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    customizeMode: state.customizeMode,
    assignKeyMode: state.assignKeyMode,
    existingKeySelected: state.existingKeySelected,
    isTouchDevice: state.isTouchDevice,
    playMode: state.playMode,
    recordMode: state.recordMode,
});

const mapDispatchToProps = (dispatch) => {
    return {
        handleCustomize: () => {
            dispatch({
                type: 'HANDLE-CUSTOMIZE'
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonContainer);
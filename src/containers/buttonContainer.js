import React from 'react';
import ButtonLabels from '../constants/buttonLabels';

class ButtonContainer extends React.Component {
    render() {
        const {isTouchDevice, handleCustomize, handleRecord, handlePlay, playMode, recordMode, editMode, disablePlay} = this.props;

        return (
            <div className='button-container'>
                {!isTouchDevice && <button className='customize-button' onClick={handleCustomize} disabled={playMode || recordMode}>{editMode ? ButtonLabels.cancel : ButtonLabels.customize}</button>}
                <button className='record-button' onClick={handleRecord} disabled={playMode || editMode}>{recordMode ? ButtonLabels.stop : ButtonLabels.record}</button>
                <button className='play-button' onClick={handlePlay} disabled={disablePlay}>{playMode ? ButtonLabels.stop : ButtonLabels.play}</button>
            </div>
        );
    }
}

export default ButtonContainer;
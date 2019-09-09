import React from 'react';

class ButtonContainer extends React.Component {
    render() {
        const {isTouchDevice, handleCustomize, handleRecord, handlePlay, playMode, recordMode, editMode, disablePlay} = this.props;

        return (
            <div className='button-container'>
                {!isTouchDevice && <button onClick={handleCustomize} disabled={playMode || recordMode}>{editMode ? 'Cancel' : 'Customize'}</button>}
                <button onClick={handleRecord} disabled={playMode || editMode}>{recordMode ? '■' : '●'}</button>
                <button onClick={handlePlay} disabled={disablePlay}>{playMode ? '■' : '▶'}</button>
            </div>
        );
    }
}

export default ButtonContainer;
import React from 'react';
import { connect } from 'react-redux';
import DrumOrder from '../constants/drumOrder';

class DrumContainer extends React.Component {
    constructor(props) {
        super(props);

        this.getDrumsByOrder = this.getDrumsByOrder.bind(this);
    }

    render() {
        const {activeSounds, isTouchDevice, handleClick} = this.props;

        return (
            <div className='drum-container'>
                {DrumOrder.map((item, i) => {
                    return <div className='drum-line' key={i}>
                        {Object.keys(this.getDrumsByOrder(item)).map((key, i) => {
                            return <div className='drum' key={i} id={key} onClick={handleClick}>
                                <div className='drum-text-container'>
                                    <div className='drum-name'>{key.toUpperCase()}</div>
                                    {!isTouchDevice && <div className='drum-key'>{String.fromCharCode(activeSounds[key].keyCode)}</div>}
                                </div>
                            </div>
                        })}
                    </div>
                })}
            </div>
        );
    }

    getDrumsByOrder(selectedDrums) {
        const {activeSounds} = this.props;
        let drums = {};

        for (let i = 0; i < selectedDrums.length; i++) {
            if (activeSounds.hasOwnProperty(selectedDrums[i])) {
                drums[selectedDrums[i]] = activeSounds[selectedDrums[i]];
            }
        }

        return drums;
    }

    // handleClick(e) {
    //     const {customizeMode, assignKeyMode, existingKeySelected, recordMode} = this.state;
    //
    //     if (customizeMode) {
    //         this.setState({
    //             customizeMode: false,
    //             assignKeyMode: true,
    //             selectedDrum: e.currentTarget.id
    //         });
    //     } else if (!assignKeyMode || !existingKeySelected) {
    //         let drum = e.currentTarget.id;
    //         this.playSound(drum);
    //         recordMode && this.recordSound(drum);
    //     }
    // }
}

const mapStateToProps = (state) => ({
    activeSounds: state.activeSounds,
    isTouchDevice: state.isTouchDevice
});

export default connect(mapStateToProps)(DrumContainer);
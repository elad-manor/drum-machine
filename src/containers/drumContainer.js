import React from 'react';
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
                {
                    DrumOrder.map((item) => {
                        return <div className='drum-line'>
                            {Object.keys(this.getDrumsByOrder(item)).map((key) => {
                                return <div className='drum' id={key} onClick={handleClick}>
                                    <div className='drum-text-container'>
                                        <div className='drum-name'>{key.toUpperCase()}</div>
                                        {!isTouchDevice && <div className='drum-key'>{String.fromCharCode(activeSounds[key].keyCode)}</div>}
                                    </div>
                                </div>
                            })}
                        </div>
                    })
                }
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
}

export default DrumContainer;
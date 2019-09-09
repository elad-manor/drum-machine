import React from 'react';
import DrumContainer from './drumContainer';
import SoundSelectorContainer from './soundSelectorContainer';
import MessageContainer from './messageContainer';
import ButtonContainer from './buttonContainer';
import AcousticSamples from '../constants/acousticSamples';
import ElectronicSamples from '../constants/electronicSamples';
import DefaultKeyCodes from '../constants/defaultKeyCodes';
import '../css/drumMachineContainer.scss';
import classNames from "classnames";

class DrumMachineContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customizeMode: false,
            assignKeyMode: false,
            existingKeySelected: false,
            recordMode: false,
            playMode: false,
            activeSounds: this.createSoundsObject(AcousticSamples),
            isElectronic: false,
            recordedSounds: [],
            recordStartTime: 0
        };

        this.playSound = this.playSound.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleCustomize = this.handleCustomize.bind(this);
        this.findDrumByKey = this.findDrumByKey.bind(this);
        this.createSoundsObject = this.createSoundsObject.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.loadSounds = this.loadSounds.bind(this);
        this.handleRecord = this.handleRecord.bind(this);
        this.recordSound = this.recordSound.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.playRecording = this.playRecording.bind(this);
    }

    render() {
        const {customizeMode, assignKeyMode, activeSounds, existingKeySelected, recordMode, playMode, recordedSounds, isElectronic} = this.state;
        const editMode = customizeMode || assignKeyMode || existingKeySelected;
        const isTouchDevice = "ontouchstart" in document.documentElement;

        return (
            <div className={classNames('drum-machine-container', {'drum-machine-container__touch': isTouchDevice})}>
                <DrumContainer
                    activeSounds={activeSounds}
                    isTouchDevice={isTouchDevice}
                    handleClick={this.handleClick}/>
                <SoundSelectorContainer
                    isElectronic={isElectronic}
                    handleOptionChange={this.handleOptionChange}/>
                <ButtonContainer
                    isTouchDevice={isTouchDevice}
                    handleCustomize={this.handleCustomize}
                    handleRecord={this.handleRecord}
                    handlePlay={this.handlePlay}
                    playMode={playMode}
                    recordMode={recordMode}
                    editMode={editMode}
                    disablePlay={!recordedSounds.length || recordMode || editMode}/>
                <MessageContainer
                    customizeMode={customizeMode}
                    assignKeyMode={assignKeyMode}
                    existingKeySelected={existingKeySelected}/>
            </div>
        );
    }

    componentWillMount() {
        this.loadSounds();
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp);
    }

    playSound(drum) {
        const {activeSounds} = this.state;

        document.getElementById(drum).classList.add('drum-click');
        setTimeout(() => {
            document.getElementById(drum).classList.remove('drum-click');
        }, 100);
        new Audio(activeSounds[drum].sound).play();
    }

    handleClick(e) {
        const {customizeMode, assignKeyMode, existingKeySelected, recordMode} = this.state;

        if (customizeMode) {
            this.setState({
                customizeMode: false,
                assignKeyMode: true,
                selectedDrum: e.currentTarget.id
            });
        } else if (!assignKeyMode || !existingKeySelected) {
            let drum = e.currentTarget.id;
            this.playSound(drum);
            recordMode && this.recordSound(drum);
        }
    }

    handleKeyUp(e) {
        const {customizeMode, assignKeyMode, activeSounds, selectedDrum, existingKeySelected, recordMode} = this.state;

        if (assignKeyMode || existingKeySelected) {
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
                if (this.findDrumByKey(e.keyCode)) {
                    this.setState({
                        assignKeyMode: false,
                        existingKeySelected: true
                    });
                } else {
                    activeSounds[selectedDrum].keyCode = e.keyCode;

                    this.setState({
                        activeSounds: activeSounds,
                        assignKeyMode: false,
                        existingKeySelected: false
                    });
                }
            }
        } else if (!customizeMode) {
            let drum = this.findDrumByKey(e.keyCode);

            if (drum) {
                this.playSound(drum);
                recordMode && this.recordSound(drum);
            }
        }
    }

    handleCustomize() {
        const {customizeMode, assignKeyMode, existingKeySelected} = this.state;

        if (!customizeMode && !assignKeyMode && !existingKeySelected) {
            this.setState({
                customizeMode: true
            });
        } else {
            this.setState({
                customizeMode: false,
                assignKeyMode: false,
                existingKeySelected: false
            });
        }
    }

    findDrumByKey(keyCode) {
        const {activeSounds} = this.state;

        for (let key in activeSounds) {
            if (activeSounds.hasOwnProperty(key) && activeSounds[key].keyCode === keyCode) {
                return key;
            }
        }

        return false;
    }

    createSoundsObject(samples) {
        let selectedSounds = {};

        for (let key in samples) {
            if (samples.hasOwnProperty(key)) {
                selectedSounds[key] = {
                    sound: samples[key],
                    keyCode: this.state ? this.state.activeSounds[key].keyCode : DefaultKeyCodes[key]
                };
            }
        }

        return selectedSounds;
    }

    handleOptionChange(e) {
        this.setState({
            isElectronic: e.currentTarget.checked,
            activeSounds: this.createSoundsObject(e.currentTarget.checked ? ElectronicSamples : AcousticSamples)
        });
    }

    loadSounds() {
        for (let key in AcousticSamples) {
            if (AcousticSamples.hasOwnProperty(key)) {
                new Audio(AcousticSamples[key]).load();
            }
        }

        for (let key in ElectronicSamples) {
            if (ElectronicSamples.hasOwnProperty(key)) {
                new Audio(ElectronicSamples[key]).load();
            }
        }
    }

    handleRecord() {
        const {recordMode, recordedSounds, recordStartTime} = this.state;

        this.setState({
            recordMode: !recordMode,
            recordedSounds: recordMode ? recordedSounds : [],
            recordStartTime: recordMode ? recordStartTime : new Date()
        }, () => {
            this.state.recordMode && setTimeout(() => {
                this.setState({
                    recordMode: false
                });
            }, 10000);
        });
    }

    recordSound(sound) {
        const {recordedSounds} = this.state;

        recordedSounds.push({
            sound: sound,
            time: new Date()
        });

        this.setState({
            recordedSounds: recordedSounds
        });
    }

    handlePlay() {
        const {playMode} = this.state;

        this.setState({
            playMode: !playMode
        }, () => {
            this.state.playMode && this.playRecording();
        });
    }

    playRecording() {
        const {recordedSounds, recordStartTime} = this.state;

        let i = 0;

        let soundsLoop = () => {
            let timeout = i === 0 ? recordedSounds[i].time - recordStartTime : recordedSounds[i].time - recordedSounds[i - 1].time;

            setTimeout(() => {
                this.state.playMode && this.playSound(recordedSounds[i].sound);
                i++;
                if (i < recordedSounds.length) {
                    this.state.playMode && soundsLoop();
                } else {
                    setTimeout(() => {
                        this.setState({
                            playMode: false
                        })}, 500);
                }
            }, timeout);
        };

        soundsLoop();
    }
}

export default DrumMachineContainer;
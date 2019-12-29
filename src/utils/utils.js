import DefaultKeyCodes from "../constants/defaultKeyCodes";

export default {
    createSoundsObject: function (newSamples, currentSamples) {
        let selectedSounds = {};

        for (let key in newSamples) {
            if (newSamples.hasOwnProperty(key)) {
                selectedSounds[key] = {
                    sound: newSamples[key],
                    keyCode: currentSamples ? currentSamples[key].keyCode : DefaultKeyCodes[key]
                };
            }
        }

        return selectedSounds;
    }
};
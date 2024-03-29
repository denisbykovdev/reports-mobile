import layout from "./layout";

const scale = layout.width < 600 ? 360 : 900;

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / scale;
    const newSize = Math.round(ratio * layout.width);
    return newSize; 
}

//fontSize
const xxsmall = scaleFontSize(12);
const xsmall = scaleFontSize(13);
const small = scaleFontSize(14);
const regular = scaleFontSize(15);
const medium = scaleFontSize(16);
const large = scaleFontSize(20);
const xlarge = scaleFontSize(25);

export default {
    xxsmall,
    xsmall,
    small,
    regular,
    medium,
    large,
    xlarge
}
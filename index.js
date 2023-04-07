//constants for plot SVG
const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 500;
const HISTO_BARS_GAP = 5;
const HISTO_PLOT_MARGIN = 30;
const HISTO_PLOT_WIDTH = CONTAINER_WIDTH - 2 * HISTO_PLOT_MARGIN;
const HISTO_PLOT_HEIGHT = CONTAINER_WIDTH - 2 * HISTO_PLOT_MARGIN;

//random ranges
const MAX_RANGE_RANDOM = 500;
const MAX_RANGE_COUNT = 20;

//data for histogram
let dataHisto = null;

//Generate Random Histo Data
const generateRandomHistogramData = () => {
    const range = Math.floor(Math.random()*MAX_RANGE_RANDOM)
    const count = Math.floor(Math.random()*MAX_RANGE_COUNT)
    const data = Array(count).fill(0);
    data.forEach((value,idx) => {
        data[idx] = Math.floor(Math.random()*range);
    })
    return data;
}

//Generate Histo Data From User Input
const handleSubmit = () => {
    const inputStr = document.getElementById('textInput').value;
    let isValidString = true;
    if (!inputStr) {
        alert('please input a valid string')
        isValidString = false
    }
    dataHisto = inputStr.split(',')
    dataHisto.every(value => {
        if (isNaN(value)) {
            alert('please input a valid string of comma separated integers') 
            isValidString = false
            return false
        }
        return true
    })
    if (isValidString) {
        clearSvgHisto();
        createSvgHisto(dataHisto);
    }

}
document.getElementById('submit').addEventListener('click', handleSubmit);

//reset button
const handleReset = () => {
    document.getElementById('textInput').value = null;
    clearSvgHisto();
    dataHisto = generateRandomHistogramData();
    createSvgHisto(dataHisto);
    
}
document.getElementById('reset').addEventListener('click', handleReset);

//clear out my svg html
const clearSvgHisto = () => {
    const svgElement = document.getElementById('histogram');
    svgElement.innerHTML = "";
}


//create a HistoGram
const createSvgHisto = (data) => {
    const numBars = data.length
    const largestValue = Math.max(...data)
    const svgElement = document.getElementById('histogram');

    //add X axis 
    const startHorizAxisX = HISTO_PLOT_MARGIN;
    const startHorizAxisY = CONTAINER_HEIGHT - HISTO_PLOT_MARGIN;
    const endHorizAxisX = CONTAINER_WIDTH - HISTO_PLOT_MARGIN;
    const endHorizAxisY = CONTAINER_HEIGHT - HISTO_PLOT_MARGIN;
    svgElement.innerHTML += `<line x1=${startHorizAxisX} y1=${startHorizAxisY} x2=${endHorizAxisX} y2=${endHorizAxisY} style="stroke-width:1px;stroke:rgb(0,0,0);"/>`;

    //add Y axis 
    const startVertAxisX = HISTO_PLOT_MARGIN;
    const startVertAxisY = HISTO_PLOT_MARGIN;
    const endVertAxisX = HISTO_PLOT_MARGIN;
    const endVertAxisY = CONTAINER_HEIGHT - HISTO_PLOT_MARGIN;
    svgElement.innerHTML += `<line x1=${startVertAxisX} y1=${startVertAxisY} x2=${endVertAxisX} y2=${endVertAxisY} style="stroke-width:1px;stroke:rgb(0,0,0);"/>`;

    //add Y axis labels
    svgElement.innerHTML += `<text x="0" y=${HISTO_PLOT_MARGIN} style="fill:black;">${largestValue}</text>`;
    svgElement.innerHTML += `<text x="0" y=${HISTO_PLOT_MARGIN+HISTO_PLOT_HEIGHT} style="fill:black;">0</text>`;

    //add bars
    data.forEach((barValue,idx) => {

        const width = HISTO_PLOT_WIDTH / numBars - HISTO_BARS_GAP;
        const startBarX = idx * HISTO_PLOT_WIDTH / numBars + HISTO_PLOT_MARGIN;
        
        const height = barValue / largestValue * HISTO_PLOT_HEIGHT;
        const startBarY = CONTAINER_HEIGHT - height - HISTO_PLOT_MARGIN; 

        svgElement.innerHTML += `<rect width=${width} height=${height} x=${startBarX} y=${startBarY} style="fill:rgb(0,0,255);" />`;
    })
}

handleReset();



const settings = (() => {
    const xGridCnt = 580;
    const zGridCnt = 1350;

    const xCordinates = [];
    const zCordinates = [];

    const xCenters = [];
    const zCenters = [];

    const spacer = 1;

    // adjust x, z values for 3d environment
    const xAdjust = - (xGridCnt * spacer / 2);
    const zAdjust = - (zGridCnt * spacer / 2);

    for (let x = 0; x < xGridCnt; x++) {
        xCordinates.push(x * spacer + xAdjust);
        if(x !== xGridCnt) {
            xCenters.push(x * spacer + (spacer / 2) + xAdjust);
        }
    }

    for (let z = 0; z < zGridCnt; z++) {
        zCordinates.push(z * spacer + zAdjust);
        if(z !== xGridCnt) {
            zCenters.push(z * spacer + (spacer / 2) + zAdjust);
        }
    }

    return {
        xGridCnt: xGridCnt,
        zGridCnt: zGridCnt,
        xCenters: xCenters,
        zCenters: zCenters,
        xCordinates: xCordinates,
        zCordinates: zCordinates,
        xAdjust: xGridCnt / 2,
        zAdjust: zGridCnt / 2,
        spacer: 10
    }
})();

export default settings;
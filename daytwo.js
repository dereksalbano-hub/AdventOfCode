const fs = require('fs');
const { createInterface } = require('readline');

/**
 * RULES:
 * The levels are either all increasing or all decreasing.
 * Any two adjacent levels differ by at least one and at most three. >=3 difference
 */

const uniformDirection = arr => {
    if (arr.every(n => n > 0)) return arr;
    if (arr.every(n => n < 0)) return arr;

    return null;
};

function CheckDeltaLevels(levels) {
    const reportSet = new Set();
    for (let i = 0; i < levels.length - 1; i++) {
        const delta = levels[i] - levels[i + 1];
        if (Math.abs(delta) > 3) return null;

        reportSet.add(delta);
    }

    return [...reportSet];
};

function isReportSafe(report){
    const levels = report.split(' ');
    const reportSet = CheckDeltaLevels(levels);
    if (!reportSet) return null;

    return uniformDirection(reportSet);
};

async function readFileAsync() {
    let safeReports = [];
    try {
        const fileStream = fs.createReadStream(`${__dirname}/sample.txt`);

        const rl = createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const report of rl) {
            const validatedReport = isReportSafe(report);
            if (!validatedReport) {
                continue;
            }

            safeReports.push(validatedReport);
        }
    } 
    catch (err) {
        console.error('Error reading file:', err);
    }

    console.log(`The number of safe reports are: ${safeReports.length}`);
};

function runSolution() {
    readFileAsync();
};

runSolution();

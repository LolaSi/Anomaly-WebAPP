const fs = require('fs');

/**
 * The TimeSeries class represents a map which holds all the data from csv file provided.
 */
class TimeSeries {
    /**
     * constructor for class
     * @param {string} CSVfile 
     */
    constructor(CSVfile) {
        this.csvfile = CSVfile;
        this.atts = [];
        this.dataSize = 0;
        this.table = this.fillMap(CSVfile); // read csv file and fill the map with its content.
        
    }
    /**
     * This function attempts to read the content of the csv file path provided and stores said content in a map.
     * @param {string} CSVfile 
     * @returns map<string, array<float>>.
     */
    fillMap(CSVfile) {
        let dict = new Object();
        const data = fs.readFileSync(CSVfile, 'utf8'); // start reading the file.
        let lines = data.replace(/\r\n/g,'\n'); // replace all '\r' with '' and split on new line.
        lines = lines.replace(/\r/g,'\n').split('\n');
        for(let i = 0; i < lines.length; i++) { // iterate over each line
            let values = lines[i].split(","); // split line by
            if (i === 0) {
                for (let value of values) { // first line
                    dict[value] = []; // add key value pair to map
                    this.atts.push(value); // add value to attributes
                }
            } else {
                this.dataSize++; // update number of lines.
                'use strict';
                let x = 0;
                for (const [key, value] of Object.entries(dict)) { // iterate over map
                    let value = parseFloat(values[x++]); // add value to array correlated
                    if (isNaN(value)) {
                        throw "not number";
                    }
                    dict[key].push(value);
                }
            }
        }
        
        if (this.atts.length == 0) {
            throw "empty file";
        }
        if (this.dataSize == 0) {
            throw "empty file";
        }
        return dict;
    }

    getAttributes() {
        return this.atts;
    }

    getRowSize() {
        return this.dataSize;
    }

    getData() {
        return this.table;
    }

    getAttData(attribute) {
        return this.table[attribute];
    }
}

module.exports = {
    TimeSeries
};

import './App.css';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';

function App() {
  const [cutFile, setCutFile] = useState(null);
  const [csvData, setCsvData] = useState({
    csv1: '',
    csv2: '',
    csv3: '',
    csv4: '',
  });
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCutFile(file);
  };

  const convertToCsv = async () => {
    if (!cutFile) {
      setError('Please select a .CUT file.');
      return;
    }

    setIsConverting(true);
    setError(null);
    setCsvData({ csv1: '', csv2: '', csv3: '', csv4: '' });

    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target.result;
      try {
        // Simulate processing the .cut file and generating CSV data
        const newCsvData = await processCutFile(fileContent);
        setCsvData(newCsvData);
      } catch (err) {
        setError('Error processing .CUT file: ' + err.message);
      } finally {
        setIsConverting(false);
      }
    };

    reader.readAsText(cutFile);
  };

  const processCutFile = (fileContent) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate CSV data generation, replace with actual logic
        const csv1 = "Header1,Header2\nData1,Data2";
        const csv2 = "Header3,Header4\nData3,Data4";
        const csv3 = "Header5,Header6\nData5,Data6";
        const csv4 = "Header7,Header8\nData7,Data8";

        // Simulated success or error
        const success = true
        if (success) {
          resolve({ csv1, csv2, csv3, csv4 });
        } else {
          reject(new Error('Failed to process file.'));
        }
      }, 2000); // Simulate processing time of 2 seconds
    });
  };

  const downloadCsv = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CUT to CSV Converter</h1>
        <input type="file" accept=".cut" onChange={handleFileChange} />
        <button onClick={convertToCsv} disabled={isConverting}>
          {isConverting ? 'Converting...' : 'Convert to CSV'}
        </button>
        {error && <div className="error">{error}</div>}

        <div className="csv-downloads">
          {csvData.csv1 && (
            <button onClick={() => downloadCsv(csvData.csv1, 'output1.csv')}>
              Download CSV 1
            </button>
          )}
          {csvData.csv2 && (
            <button onClick={() => downloadCsv(csvData.csv2, 'output2.csv')}>
              Download CSV 2
            </button>
          )}
          {csvData.csv3 && (
            <button onClick={() => downloadCsv(csvData.csv3, 'output3.csv')}>
              Download CSV 3
            </button>
          )}
          {csvData.csv4 && (
            <button onClick={() => downloadCsv(csvData.csv4, 'output4.csv')}>
              Download CSV 4
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

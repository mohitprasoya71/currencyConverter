import React, { useEffect, useState } from 'react';

const CurrencyConverter = () => {
  const [currency, setCurrency] = useState([]);
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [convertedRates, setConvertedRates] = useState({});

  // Fetch currency list
  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        setCurrency(['USD', ...Object.keys(data.rates)]);
      })
      .catch((error) => {
        console.error("Error Detected", error);
      });
  }, []);

  // Fetch converted values
  useEffect(() => {
    if (!amount) return;

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        setConvertedRates(data.rates);
      });
  }, [amount, fromCurrency]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8  w-full max-w-md sm:max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Currency Converter</h1>
        
        {/* FROM CURRENCY SECTION */}
        <div className="mb-6">
          <label htmlFor="inputcurr" className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="inputcurr"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
            >
              {currency.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TO CURRENCY SECTION */}
        <div>
          <label htmlFor="outputCurr" className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select
            id="outputCurr"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
          >
            <option value="">-- Select Converted Value --</option>
            {Object.entries(convertedRates).map(([code, value]) => (
              <option key={code} value={code}>
                {code}: {value.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
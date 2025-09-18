import { useState, useId, useEffect } from 'react'
import './App.css'   
import InputBox from './components/InputBox.jsx'
// import currencyinfo from './hooks/currencyinfo'

function currencyinfo(currency){
    const [data, setData] = useState({})
    useEffect(()=>{
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`).
        then((res)=>{
        return res.json()
    }).then((res)=>{
        setData(res[currency])
    }).catch()
    }, [currency])
    return data
}

function App() {
  const [amount, setAmount] = useState(0);
  let [from, setFrom] = useState("usd")
  let [to, setTo] = useState("bdt")
  const [convertedAmount, setConvertedAmount] = useState(0);

  const givenCurrencyInfo = currencyinfo(from)
  const options = Object.keys(givenCurrencyInfo);

  const swap = () =>{
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const convert = () => {
    setConvertedAmount(amount * givenCurrencyInfo[to])
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-fixed bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      {/* semi-transparent centered card */}
      <div className="w-full max-w-md mx-auto rounded-2xl p-6 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert()
          }}
        >
          <div className="w-full mb-3">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              className=""
            />
          </div>

          {/* swap button row */}
          <div className="relative w-full h-0.5 my-2">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/60 rounded-full bg-white/90 text-gray-700 px-3 py-1 text-sm shadow-sm hover:scale-105 transition-transform"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="w-full mt-2 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:brightness-105 focus:ring-4 focus:ring-cyan-200 transition"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;


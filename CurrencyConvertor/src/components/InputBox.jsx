import React, {useId} from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId(); // It generates a unique ID for the amount input field... This is useful for accessibility and associating the label with the input.

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-sm text-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center ${className}`}
    >
      <div className="w-full sm:w-1/2">
        <label htmlFor={amountInputId} className="block text-gray-500 text-xs mb-1">
          {label}
        </label>
        <input
          id={amountInputId}
          className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 outline-none
                     disabled:opacity-60 disabled:cursor-not-allowed
                     focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 transition"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="w-full sm:w-1/2 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-2">
        <p className="text-gray-500 text-xs mb-1 sm:mb-0 sm:mr-2">Currency Type</p>
        <select
          className="rounded-md py-2 px-3 bg-white border border-gray-200 cursor-pointer outline-none
                     disabled:opacity-60 disabled:cursor-not-allowed
                     focus:ring-2 focus:ring-cyan-200 transition"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}


export default InputBox;
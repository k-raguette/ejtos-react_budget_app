import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget, expenses, currency, dispatch } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  //get total expenses
  const totalSpending = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);
  

  const handleBudgetChange = (event) => {
    const inputValue = parseInt(event.target.value);

    if (isNaN(inputValue)) {
      alert('Please enter a valid number.');
    } else if (inputValue < totalSpending) {
      alert('Budget value cannot be lower than spending.');
    } else if (inputValue > 20000) {
      alert('Budget cannot exceed the upper limit of £20,000.');
    } else {
      setNewBudget(inputValue);
      
      // Dispatch the action after successful validation
      dispatch({
        type: 'SET_BUDGET',
        payload: inputValue,
      });
    }
  }

  return (
    <div className='alert alert-secondary'>
      <span>Budget: {currency}</span>
      <input
        type="number"
        step="10"
        value={newBudget}
        onChange={handleBudgetChange}
      ></input>
    </div>
  );
};

export default Budget;
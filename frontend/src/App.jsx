import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await getTransactions();
        setTransactions(transactions);
      } catch (err) {
        toast.error(err.message)
      }
    };

    fetchTransactions();
  }, []);

  async function getTransactions() {
    const url = import.meta.env.VITE_API_URL + '/transactions';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  async function addNewTransaction(e) {
    e.preventDefault();
    const url = import.meta.env.VITE_API_URL + '/transaction';
    const price = name.split(' ')[0];
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          price,
          name: name.substring(price.length + 1),
          description,
          datetime,
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setTransactions([...transactions, json]);
      setName('');
      setDatetime('');
      setDescription('');
    } catch (err) {
      toast.error(err.message)
    }
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += parseFloat(transaction.price);
  }
  balance = balance.toFixed(1);
  const fraction = balance.split('.')[1];

  return (
    <main>
      <h1>${balance}{fraction}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={'+200 new samsung tv'}/>
          <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)}/>
        </div>
        <div className='description'>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder={'description'}/>
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction" key={transaction._id}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>
                {transaction.price}$
              </div>
              <div className="datetime">{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </main>
  );
}

export default App;

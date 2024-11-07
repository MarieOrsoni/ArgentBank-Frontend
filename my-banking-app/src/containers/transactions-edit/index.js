import React, { useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { fetchData } from "../../app/slices";
import CollapsibleList from "../../components/dropdown";

import "./index.css";

const DetailedStatement = () => {

 
  const [transactions] = useState([
    {
      date: "2023-10-01",
      description: "Grocery Store",
      amount: "$50.00",
      balance: "$950.00",
      transactionType: "Debit",
      category: "Groceries",
      note: "Weekly groceries shopping",
    },
    {
      date: "2023-10-02",
      description: "Salary",
      amount: "$2000.00",
      balance: "$2950.00",
      transactionType: "Credit",
      category: "Income",
      note: "Monthly salary",
    }
  ]);

 
  return (
    <>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
        <i className="fa-solid fa-xmark"></i>
        </div>
        </section>
        <section className="statement"> 
        <div className="list-headers">
          <p>Date</p>
          <p>Description</p>
          <p>Amount</p>
          <p>Balance</p>
        </div>
        <div className="transaction-container"> 
      {transactions.map((transaction, index)=>(
        
          <CollapsibleList
            key={index}
            date={transaction.date}
            description={transaction.description}
            amount={transaction.amount}
            balance={transaction.balance}
            transactionType={transaction.transactionType}
            category={transaction.category}
            note={transaction.note}
            isOpen={false} // Initially closed
          />
        ))}
        </div>
        </section>

    </>
    
    
    );
  };
  
     
      
export default DetailedStatement;

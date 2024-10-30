import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../app/slices";
import CollapsibleList from "../../components/dropdown";

const DetailedStatement = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.items);
  const dataStatus = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchData());
    }
  }, [dataStatus, dispatch]);

  return (
    <>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>

        <CollapsibleList
          title1="Date"
          title2="Description"
          title3="Amount"
          title4="Balance"
          isOpen={false}
        >
          {dataStatus === "loading" && <div>Loading...</div>}
          {dataStatus === "succeeded" && (
            <ul>
              {data.map((item, index) => (
                <li key={index}>
                  {item.title} - {item.description}
                </li>
              ))}
            </ul>
          )}
          {dataStatus === "failed" && <div>{error}</div>}
        </CollapsibleList>
      </section>
    </>
  );
};
export default DetailedStatement;

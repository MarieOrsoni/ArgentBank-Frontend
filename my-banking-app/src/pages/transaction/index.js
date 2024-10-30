import React from "react";
import NavMenuUser from "../../components/nav-bar-user-page";
import DetailedTransactions from "../../containers/transactions-edit";

function StatementDetails () {
    return(
        <> 
        <NavMenuUser/>
            <DetailedTransactions />
        </>
    )
};
export default StatementDetails;
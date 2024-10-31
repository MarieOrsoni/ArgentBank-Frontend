import React from "react";
import NavMenuUser from "../../components/nav-bar-user-page";
import DetailedTransactions from "../../containers/transactions-edit";

function StatementDetails () {
    return(
        <> 
        <NavMenuUser/>
        <main>
            <DetailedTransactions />
        </main>
        </>
    )
};
export default StatementDetails;
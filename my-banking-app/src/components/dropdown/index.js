import PropTypes from "prop-types";
import { useCollapse } from "react-collapsed";


const CollapsibleList = ({ date, description, amount, balance, transactionType, category, note, children, isOpen }) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({ isExpanded: isOpen });

  return (
    <div className={`collapsible-list ${isExpanded ? "collapsible-list--active" : ""}`}>
    <div className="collapsible-header">
      <div className="header-column">{date}</div>
      <div className="header-column">{description}</div>
      <div className="header-column">{amount}</div>
      <div className="header=column">{balance}</div>
      
      <button
        {...getToggleProps({
          onClick: () => setExpanded(!isExpanded)
        })}
        className={`collapsible__header ${isExpanded ? "collapsible__header--active" : ""}`}
        >
        <i className={`fas fa-chevron-up ${isExpanded ? "rotate" : ""}`}></i>
      </button>
    </div>
    <div {...getCollapseProps()} className="collapsible-content">
      {children}
      <div className="detail-row">Transaction Type: {transactionType}</div>
      <div className="detail-row">Category: {category}</div>
      <div className="detail-row">Note:{note}</div>
    </div>
    </div>
  );
};
CollapsibleList.propTypes = {
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  category: PropTypes.string,
  note: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool
};

export default CollapsibleList;
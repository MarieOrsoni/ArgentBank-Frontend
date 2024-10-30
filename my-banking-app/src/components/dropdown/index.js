import PropTypes from "prop-types";
import { useCollapse } from "react-collapsed";


const CollapsibleList = ({ title1, title2, title3, title4, children, isOpen }) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse({ isExpanded: isOpen });

  return (
    <div className={`collapsible-list ${isExpanded ? "collapsible-list--active" : ""}`}>
    <div className="collapsible-header">
      {title1 && <div className="header-column">{title1}</div>}
      {title2 && <div className="header-column">{title2}</div>}
      {title3 && <div className="header-column">{title3}</div>}
      {title4 && <div className="header=column">{title4}</div>}
      
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
    </div>
    </div>
  );
};
CollapsibleList.propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
  title3: PropTypes.string,
  title4: PropTypes.string,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool
};

export default CollapsibleList;
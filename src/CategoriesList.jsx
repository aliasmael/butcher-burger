import React from 'react';
import CategoryView from './CategoryView.jsx';

class CategoriesList extends React.Component {
   render() {
      return (
        <div className="ui blue segment">
            <h4> Menu Data </h4>
            <div className="ui styled accordion">
                <CategoryView active="true" />
                <CategoryView />
                <CategoryView />
            </div>  
        </div>
      );
   }
}

export default CategoriesList;
import React from 'react';
import AddItem from './AddItem.jsx';
import CategoryItem from './CategoryItem.jsx';

class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActive: props.active};
  }
  
  render() {
      return (
            <div className="category-view">
                <div className= {this.state.isActive == "true" ?  "active title" : "title"}>
                    <i className="align justify icon"></i>
                    Breakfast
                </div>
                <div className={this.state.isActive == "true" ?  "active content" : "content"}>
                    <div className="ui grid">
                        <div className="two column">
                            <div className="one wide column">Name *</div>
                            <div className="one wide column category-name">Breakfast</div>
                        </div>

                        <div className="two column">
                            <div className="one wide column">Description</div>
                            <div className="one wide column category-description">Empty</div>
                        </div>
                    </div>

                    <div className="ui grid">
                        <div className="eight column">
                            <div className="one wide column">Items</div>
                            <AddItem />

                            <CategoryItem active="false"/>
                            <CategoryItem active="false"/>
                            <CategoryItem active="false"/>
                        </div>
                    </div>
                </div>
            </div>
      );
   }
}

export default CategoryView;
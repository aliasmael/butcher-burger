import React from 'react';
import AddItem from './AddItem.jsx';
import CategoryItem from './CategoryItem.jsx';

class CategoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActive: props.active, category: props.category};
  }
  
  render() {
      return (
            <div className="category-view">
                <div className= {this.state.isActive == "true" ?  "active title" : "title"}>
                    <i className="align justify icon"></i>
                    {this.state.category.name}
                </div>
                <div className={this.state.isActive == "true" ?  "active content" : "content"}>

                    {/* Category details name, description  */}
                    <div className="ui grid">
                        <div className="two column category-details">
                            <div className="one wide column">Name *</div>
                            <div className="one wide column category-name">{this.state.category.name}</div>
                        </div>

                        <div className="two column  category-details">
                            <div className="one wide column">Description</div>
                            <div className="one wide column category-description">{this.state.category.description}</div>
                        </div>
                    </div>

                    {/* Category items  */}
                    <div className="ui grid">
                        <div className="eight column">
                            <div className="one wide column">Items</div>

                            {/* Add new category_item  */}
                            <AddItem />

                            {/* View category_items  */}
                            {
                                this.state.category.items.map((item, index) => (
                                    <CategoryItem key={item.id} item={item} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
      );
   }
}

export default CategoryView;
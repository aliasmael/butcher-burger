import React from 'react';
import AddItem from './AddItem.jsx';
import CategoryItem from './CategoryItem.jsx';

class CategoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.active, category: props.category};
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    addNewItem (item) {
        var newCategoryData = this.state.category.items.push(category);
        this.setState( {category: newCategoryData} );
    }

    deleteCategory (e) {
        e.preventDefault();
        e.stopPropagation();

        var data = { categoryId: this.state.category.id }
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/category/delete',
            data: data
        }).done(function(data) {
            console.log('deleted');                
        })
        .fail(function(jqXhr) {
            console.log('failed to connect');
        });
    }
  
    render() {
        return (
            <div className="category-view">
                <div className= {this.state.isActive == "true" ?  "active title" : "title"}>
                    <i className="align justify icon"></i>
                    {this.state.category.name}
                    <div className="action-buttons">
                        <button className="ui red button right floated" onClick={this.deleteCategory}>Delete</button>
                        <button className="ui orange button right floated">Edit</button>
                    </div>
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
                            <AddItem categoryId={this.state.category.id} />

                            {/* View category_items  */}
                            {
                                this.state.category.items.map((item, index) => (
                                    <CategoryItem key={item.id} item={item} addNewItem={this.addNewItem} />
                                ))
                            }

                            <div className={ this.state.category.items.length > 0 ? "no-category hidden" : "no-category ui primary basic" }>
                                No items added yet for this category!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryView;
import React from 'react';
import AddItem from './AddItem.jsx';
import CategoryItem from './CategoryItem.jsx';

class CategoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.active, category: props.category, onDelete: props.onDelete, user: props.user};
        this.deleteCategory = this.deleteCategory.bind(this);
        this.onItemAdded = this.onItemAdded.bind(this);
        this.onItemDeleted = this.onItemDeleted.bind(this);
        
        // collapse and expand categories
        $('.ui.accordion').accordion();
    }

    // Updating view on item added
    onItemAdded(item) {
        var newCategoryData = this.state.category;
        newCategoryData.items.push(item);
        this.setState( {category: newCategoryData} );
    }

    // Updating view on item deleted
    onItemDeleted(itemId) {
        var items = this.state.category.items.filter( function(item){
            return (itemId != item._id)
        });
        var newData = this.state.category;
        newData.items = items;
        this.setState( {category: newData} );
    }

    deleteCategory (e) {
        var that = this;
        var data = { categoryId: this.state.category._id }
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/category/delete',
            data: data
        }).done(function(data) {
            that.state.onDelete(that.state.category._id);
        })
        .fail(function(jqXhr) {
            console.log('failed to connect');
        });
    }
  
    render() {
        var that = this;
        return (
            <div className="category-view">
                <div className= {this.state.isActive == "true" ?  "active title" : "title"}>
                    <i className="align justify icon"></i>
                    {this.state.category.name}

                    {/* Show actions button (For Admins Only)  */}
                    {
                        (this.state.user.role == "admin") ? 
                            <div className="action-buttons">
                                <button className="ui red button right floated" onClick={this.deleteCategory}>Delete</button>
                                <button type="button" className="ui orange button right floated">Edit</button>
                            </div> 
                            : ''
                    }
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

                            {/* Add new category_item (Admin Only) */}
                            {
                                (this.state.user.role == "admin") ? <AddItem categoryId={this.state.category._id} onItemAdded={this.onItemAdded}/> : ''
                            }

                            {/* View category_items  */}
                            {
                                this.state.category.items.map((item, index) => (
                                    <CategoryItem key={item._id} item={item} onItemDeleted={this.onItemDeleted} user={that.state.user} />
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
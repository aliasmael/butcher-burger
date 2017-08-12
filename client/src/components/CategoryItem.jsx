import React from 'react';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item: props.item, onItemDeleted: props.onItemDeleted, user: props.user};
        this.deleteItem = this.deleteItem.bind(this);

        // collapse and expand items
        $('.ui.accordion').accordion();
    }

    deleteItem (e) {
        var that = this;
        var data = this.state.item
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/category/delete-item',
            data: data
        }).done(function(data) {
            that.state.onItemDeleted(that.state.item._id);
        })
        .fail(function(jqXhr) {
            console.log('failed to connect');
        });
    }

    render() {
        return (
            <div className="category-item">
                {/* Show actions button (For Admins Only)  */}
                {
                    (this.state.user.role == "admin") ? 
                        <div className="action-buttons">
                            <button className="ui red button right floated" onClick={this.deleteItem}>Delete</button>
                            <button className="ui orange button right floated">Edit</button>
                        </div>
                        : ''
                }

                <div className= "title">
                    <i className="align justify icon"></i>
                    {this.state.item.name}
                    <span className="price">( {this.state.item.price} )</span>
                </div>
                <div className= "content">
                    {this.state.item.description}
                </div>
            </div>
        );
    }
}

export default CategoryItem;
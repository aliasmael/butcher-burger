import React from 'react';
import { Header, Button, Grid, Popup } from 'semantic-ui-react';
import EditItem from './EditItem.jsx';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {category: props.category, item: props.item, onItemDeleted: props.onItemDeleted, user: props.user};
        this.deleteItem = this.deleteItem.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

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

    // Updating view on item updated
    onUpdate(category) {
        this.setState( {category: category} );
    }

    render() {
        return (
            <div className="category-item">
                {/* Show actions button (For Admins Only)  */}
                {
                    (this.state.user.role == "admin") ? 
                        <div className="action-buttons">
                            {/* Delete item popup  */}
                            <Popup wide trigger={<Button type="button" className="ui red button right floated" content='Delete' />} on='click'>
                                 <Grid centered divided columns={1}>
                                    <Grid.Column>
                                        <Header as='h4'> {this.state.item.name} </Header>
                                        <p>Are you sure you want delete this item? </p>         
                                        <button className="ui red button right floated" onClick={this.deleteItem}>Delete</button>
                                    </Grid.Column>
                                </Grid>
                            </Popup>

                            {/* Edit item popup  */}
                            <Popup wide trigger={<Button type="button" className="ui orange button right floated" content='Edit' />} on='click'>
                                <EditItem category={this.state.category} item={this.state.item} onUpdate={this.onUpdate} />
                            </Popup>
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
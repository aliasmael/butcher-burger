import React from 'react';

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', description: '', price: '', categoryId: props.categoryId, onItemAdded: props.onItemAdded };
        this.addNewItem = this.addNewItem.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    vaildateForm () {
        if ( this.state.name.trim() != '' )
            return true;

        return false;
    }

    addNewItem (e) {
        var that = this;

        if ( this.vaildateForm() ) {
            var data = { itemName: this.state.name, itemDescription: this.state.description, itemPrice: this.state.price, categoryId: this.state.categoryId }
            
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/category/add-item',
                data: data
            }).done(function(data) {
                that.setState({ name: '', description: '', price: '' } );
                that.state.onItemAdded(data.item);
            })
            .fail(function(jqXhr) {
                console.log('failed to connect');
            });

        } else {
            console.log("Error form ")
        }
    }

    // handle user input changes
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }
    handlePriceChange(e) {
        this.setState({price: e.target.value});
    }
        
    render() {
        return (
            <div className="add-item-form">
                <form className="ui form" action="#">
                    <div className="eight fields">
                        <div className="field">
                            <input placeholder="English Name *" type="text" value={this.state.name} onChange={this.handleNameChange} required />
                        </div>
                        <div className="field">
                            <input placeholder="Price" type="text" value={this.state.price} onChange={this.handlePriceChange} />
                        </div>
                        <div className="field">
                            <textarea placeholder="English Description" type="text" rows="1"  value={this.state.description} onChange={this.handleDescriptionChange} />
                        </div>
                        <div className="field">
                            <div className="ui positive submit button" type="submit" onClick={this.addNewItem}>Create</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddItem;
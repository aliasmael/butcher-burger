import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class EditItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { category: props.category, item: props.item, onUpdate: props.onUpdate, errors: '' };
        this.updateItem = this.updateItem.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    vaildateForm () {
       this.setState( { 
            errors: { 
                name: ( this.state.item.name.trim() == "") ? "required" : undefined, 
                price: ( this.state.item.price.trim() == "") ? "required" : undefined
            } 
        });

        if ( this.state.item.name.trim() == "" || this.state.item.price.trim() == "" )
            return false;

        else 
            return true;
    }

    updateItem (e) {
        e.preventDefault();
        var that = this;

        if ( this.vaildateForm() ) {
            var data = this.state.category;
            
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/category/update',
                data: { category: JSON.stringify(data) }
            }).done(function(data) {
                that.state.onUpdate(that.state.category);
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
        var item = this.state.item;
        item.name = e.target.value;
        this.setState({item: item});
    }
    handleDescriptionChange(e) {
        var item = this.state.item;
        item.description = e.target.value;
        this.setState({item: item});
    }
    handlePriceChange(e) {
        var item = this.state.item;
        item.price = e.target.value;
        this.setState({item: item});
    }

        
    render() {
        return (
            <div className="add-item-form">
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder="English Name *" type="text" value={this.state.item.name} onChange={this.handleNameChange} required />
                            <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.name } </div>
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <input placeholder="Price *" type="text" value={this.state.item.price} onChange={this.handlePriceChange} required />
                        <div className={ ( typeof this.state.errors.price !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.price } </div>                            
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <textarea placeholder="English Description" type="text" rows="1"  value={this.state.item.description} onChange={this.handleDescriptionChange} />
                    </Form.Field>
                    <Button type='submit' className="ui positive submit button" onClick={this.updateItem}>Update</Button>
                </Form>
                
                {/* <form className="ui form" action="#">
                    <div className="eight fields">
                        <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "field error" : "field" }>
                            <input placeholder="English Name *" type="text" value={this.state.name} onChange={this.handleNameChange} required />
                            <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.name } </div>
                        </div>
                        <div className={ ( typeof this.state.errors.price !== 'undefined' ) ? "field error" : "field" }>
                            <input placeholder="Price *" type="text" value={this.state.price} onChange={this.handlePriceChange} />
                            <div className={ ( typeof this.state.errors.price !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.price } </div>                            
                        </div>
                        <div className="field">
                            <textarea placeholder="English Description" type="text" rows="1"  value={this.state.description} onChange={this.handleDescriptionChange} />
                        </div>
                        <div className="field">
                            <div className="ui positive submit button" type="submit" onClick={this.addNewItem}>Create</div>
                        </div>
                    </div>
                </form> */}
            </div>
        );
    }
}

export default EditItem;
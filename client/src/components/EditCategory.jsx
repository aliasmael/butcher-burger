import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class EditCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = { category: props.category, onUpdate: props.onUpdate, errors: '' };
        this.updateCategory = this.updateCategory.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    vaildateForm () {
        if ( this.state.category.name.trim() != '' )
            return true;

        this.setState( { errors: { name: "required" } } );
        return false;
    }

    updateCategory (e) {
        e.preventDefault();
        var that = this;

        if ( this.vaildateForm() ) {
            var data = this.state.category;
            
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/category/update',
                data: { category: JSON.stringify(data) }
            }).done(function(data) {
                console.log("AAA")
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
        var category = this.state.category;
        category.name = e.target.value;
        this.setState({cateogry: category});
    }
    handleDescriptionChange(e) {
        var category = this.state.category;
        category.description = e.target.value;
        this.setState({cateogry: category});
    }
        
    render() {
        return (
            <div className="ui segment">
                <h4> Edit Category </h4>

                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder="English Name *" type="text" name="category-name" value={this.state.category.name} onChange={this.handleNameChange} required />
                        <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.name } </div>                        
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <textarea placeholder="English Description" type="text" value={this.state.category.description} onChange={this.handleDescriptionChange} rows="1" />
                    </Form.Field>
                    <Button type='submit' className="ui positive submit button" onClick={this.updateCategory}>Update</Button>
                </Form>

                {/* <form className="ui form" action="#">
                    <div className="fields">
                        <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "field error" : "field" }>
                            <input placeholder="English Name *" type="text" name="category-name" value={this.state.name} onChange={this.handleNameChange} required />
                            <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.name } </div>
                        </div>
                        <div className="field">
                            <textarea placeholder="English Description" type="text" value={this.state.description} onChange={this.handleDescriptionChange} rows="1" />
                        </div>
                        <br />
                        <div className="field">
                            <div className="ui positive submit button" type="submit" onClick={this.addNewCategory} >Create Category</div>
                        </div>
                    </div>
                </form> */}
            </div>
        );
    }
}

export default EditCategory;
import React from 'react';

class AddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: '', description: '', onAdd: props.onAdd, errors: '' };
        this.addNewCategory = this.addNewCategory.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    vaildateForm () {
        if ( this.state.name.trim() != '' )
            return true;

        this.setState( { errors: { name: "required" } } );
        return false;
    }

    addNewCategory (e) {
        e.preventDefault();
        var that = this;

        if ( this.vaildateForm() ) {
            var data = { categoryName: this.state.name, categoryDescription: this.state.description }
            
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:3000/api/category/add',
                data: data
            }).done(function(data) {
                that.setState({ name: '', description: '', errors: '' } );
                that.state.onAdd(data.category);
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
        
    render() {
        return (
            <div className="ui segment">
                <h4> Add Category </h4>
                <form className="ui form" action="#">
                    <div className="eight fields">
                        <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "field error" : "field" }>
                            <input placeholder="English Name *" type="text" name="category-name" value={this.state.name} onChange={this.handleNameChange} required />
                            <div className={ ( typeof this.state.errors.name !== 'undefined' ) ? "ui pointing red basic label" : "hidden" } > { this.state.errors.name } </div>
                        </div>
                        <div className="field">
                            <textarea placeholder="English Description" type="text" value={this.state.description} onChange={this.handleDescriptionChange} rows="1" />
                        </div>
                        <div className="field">
                            <div className="ui positive submit button" type="submit" onClick={this.addNewCategory} >Create Category</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddCategory;
import React from 'react';
import AddCategory from './AddCategory.jsx';
import CategoryView from './CategoryView.jsx';

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categories: [] };
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentDidMount() {
        this.categoriesList();
    }

    categoriesList(){

        return $.getJSON('http://localhost:3000/api/category/get-all-categories')
        .then((data) => {
            if ( !data.error )
                this.setState({ categories: data.categories });
        });

    }

    // on entry deleted update view    
    onDelete(categoryId) {
        var newData = this.state.categories.filter( function(category){
            return (categoryId != category._id)
        });
        this.setState( {categories: newData} );
    }

    // on entry added update view
    onAdd(category) {
        this.setState(prevState => ({
            categories: prevState.categories.concat(category)
        }));
    }

    render() {

        return (
            <div>
                {/* Add new category component  */}
                <AddCategory onAdd={this.onAdd}/>

                <div className="ui blue segment">
                    <h4> Menu Data </h4>
                    <div className="ui styled accordion">
                        {/* Render All categories  */}
                        {

                            this.state.categories.map((item, index) => (
                                <CategoryView active={(index == 0) ? "true" : "false"} key={item._id} category={item} onDelete={this.onDelete} />
                            ))
                        }

                        <div className={ this.state.categories.length > 0 ? "no-category hidden" : "no-category ui primary basic" }>
                            No categories added yet!
                        </div>

                    </div>  
                </div>
            </div>
        );
    }
}

export default CategoriesList;
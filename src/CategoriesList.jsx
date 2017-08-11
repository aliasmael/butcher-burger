import React from 'react';
import CategoryView from './CategoryView.jsx';

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.CategoriesList();
    }

    CategoriesList(){

        return $.getJSON('http://localhost:3000/api/category/get-all-categories')
        .then((data) => {
            if ( !data.error )
                this.setState({ categories: data.categories });
        });

    }

    render() {

        return (
            <div className="ui blue segment">
                <h4> Menu Data </h4>
                <div className="ui styled accordion">
                    {/* Render All categories  */}
                    {

                        this.state.categories.map((item, index) => (
                            <CategoryView active={(index == 0) ? "true" : "false"} key={item.id} category={item} />
                        ))
                    }

                    <div className={ this.state.categories.length > 0 ? "no-category hidden" : "no-category ui primary basic" }>
                        No categories added yet!
                    </div>

                </div>  
            </div>
        );
    }
}

export default CategoriesList;
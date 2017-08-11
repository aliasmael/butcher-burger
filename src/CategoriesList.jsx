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
            this.setState({ categories: data.data.categories });
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

                </div>  
            </div>
        );
    }
}

export default CategoriesList;
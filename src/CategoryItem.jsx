import React from 'react';

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item: props.item};
    }

    render() {
        return (
            <div className="category-item">
                <div className= "title">
                    <i className="align justify icon"></i>
                    {this.state.item.name}
                    <span className="price">( {this.state.item.price} )</span>

                    <div className="action-buttons">
                        <button className="ui red button right floated">Delete</button>
                        <button className="ui orange button right floated">Edit</button>
                    </div>
                </div>
                <div className= "content">
                    {this.state.item.description}
                </div>
            </div>
        );
    }
}

export default CategoryItem;
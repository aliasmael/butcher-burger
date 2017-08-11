import React from 'react';

class CategoryItem extends React.Component {
   render() {
      return (
        <div className="category-item">
            <div className= "title">
                <i className="align justify icon"></i>
                French Fries 
                <span className="price">( $15 )</span>

                <div className="action-buttons">
                    <button className="ui red button right floated">Delete</button>
                    <button className="ui orange button right floated">Edit</button>
                </div>
            </div>
            <div className= "content">
                Custom premium cut by farm frites. Add melted cheese for 7LE - chili con carne for 9LE
            </div>
        </div>
      );
   }
}

export default CategoryItem;
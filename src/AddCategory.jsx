import React from 'react';

class AddCategory extends React.Component {
   render() {
      return (
        <div className="ui segment">
            <h4> Add Category </h4>
            <form className="ui form" action="#">
                <div className="eight fields">
                    <div className="field">
                        <input placeholder="English Name *" type="text" required="true" />
                    </div>
                    <div className="field">
                        <textarea placeholder="English Description" type="text" rows="1" />
                    </div>
                    <div className="field">
                        <div className="ui positive submit button" type="submit">Create Category</div>
                    </div>
                </div>
            </form>
        </div>
      );
   }
}

export default AddCategory;
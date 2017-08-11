import React from 'react';

class AddItem extends React.Component {
   render() {
      return (
        <div className="add-item-form">
            <form className="ui form" action="#">
                <div className="eight fields">
                    <div className="field">
                        <input placeholder="English Name *" type="text" required="true" />
                    </div>
                    <div className="field">
                        <textarea placeholder="English Description" type="text" rows="1" />
                    </div>
                    <div className="field">
                        <div className="ui positive submit button" type="submit">Create</div>
                    </div>
                </div>
            </form>
        </div>
      );
   }
}

export default AddItem;
import React from 'react';
import CategoriesList from './CategoriesList.jsx';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { user: props.location.state.user }
    }

   render() {
      return (
         <div>
            <h1> Welcome Butcher's burger!!! </h1>

            {/* Categories list component  */}
            <CategoriesList user={this.state.user} />

         </div>
      );
   }
}

export default App;
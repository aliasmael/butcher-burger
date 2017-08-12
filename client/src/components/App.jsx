import React from 'react';
import CategoriesList from './CategoriesList.jsx';


class App extends React.Component {
   render() {
      return (
         <div>
            <h1> Welcome Butcher's burger!!! </h1>

            <a href="login">login</a>

            {/* Categories list component  */}
            <CategoriesList />

         </div>
      );
   }
}

export default App;
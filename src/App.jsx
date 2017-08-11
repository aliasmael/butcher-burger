import React from 'react';
import AddCategory from './AddCategory.jsx';
import CategoriesList from './CategoriesList.jsx';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1> Welcome Butcher's burger!!! </h1>
            
            {/* Add new category component  */}
            <AddCategory />

            {/* Categories list component  */}
            <CategoriesList />

         </div>
      );
   }
}

export default App;
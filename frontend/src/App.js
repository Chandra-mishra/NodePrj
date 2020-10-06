import React from 'react';
import { Route,BrowserRouter as Router } from 'react-router-dom'
const User = React.lazy(() =>
  import('./pages/uploadcsv/user')
)

function App() {
  return (
    <React.Suspense fallback={''}>
    <Router>
    <Route path='/user' component={User} />
    </Router>
  </React.Suspense>
  );
}

export default App;

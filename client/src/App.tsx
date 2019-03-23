import * as React from 'react';
import Layout from './hoc/Layout/Layout';
import Planner from './containers/Planner/Planner';

class App extends React.Component {
  public render() {
    return (
      <Layout>
        <div className="App">
          <Planner />
        </div>
      </Layout>
    );
  }
}

export default App;

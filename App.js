import React from 'react';
import RootContainer from './app/navigation/AppNavigation';
import { ReduxNetworkProvider } from 'react-native-offline';
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// App = withNetworkConnectivity({
//   withRedux: true // It won't inject isConnected as a prop in this case
// })(App);

const Root = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxNetworkProvider>
          <RootContainer />
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  );
};



export default Root;

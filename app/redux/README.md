## Redux
* All actions are defined by feature-wise inside actions directory.
* All reducers are defined by feature-wise inside reducers directory.
* All action types are defined under types directory.
* All the separate reduxes are combined in the `index.js`.
* `store.js` creates the redux store and connects it to redux-thunk middleware which the project uses.
* `NavigationRedux.js` is used by the AppNavigation. Don't modify this file.
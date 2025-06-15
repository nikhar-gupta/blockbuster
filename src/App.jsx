import { Provider } from "react-redux";
import "./App.css";
import Header from "./components/header/Header";
import appStore from "./utils/store/store";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Provider store={appStore}>
      <Header />
      <Outlet />
    </Provider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import ListOptions from "./pages/ListOptions";
import LandingUtil from "./pages/landing/LandingUtil";
import AddShop from "./pages/AddShop";
import AddCategory from "./pages/AddCategory";
import AddList from "./pages/AddList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingUtil />} />
        <Route path="/shop" exact element={<AddShop />} />
        <Route path="/list" exact element={<AddList />} />
        <Route path="/category" exact element={<AddCategory />} />
        <Route path="/listOptions" exact element={<ListOptions />} />
      </Routes>
    </div>
  );
}

export default App;

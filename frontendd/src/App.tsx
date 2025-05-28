import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./page/product";
import EditProduct from "./page/editProduct";
import CreateProduct from "./page/createProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/edit/:id" element={< EditProduct/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

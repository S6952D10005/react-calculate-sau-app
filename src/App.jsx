import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Car from "./pages/Car";
import Bmr from "./pages/Bmr";
import Bmi from "./pages/Bmi";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car" element={<Car />} />
            <Route path="/bmr" element={<Bmr />} />
            <Route path="/bmi" element={<Bmi />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

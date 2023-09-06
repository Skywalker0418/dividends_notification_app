
import Title from "./component/Title/Title";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./component/Footer/Footer";
import {
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <div className="relative min-h-[100vh] w-screen container mx-auto">
      <Title />

      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes> 
      
      <Footer/>
    </div>  
      
  );
}
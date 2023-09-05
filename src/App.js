
import Title from "./component/Title/Title";
import Dashboard from "./component/Dashboard/Dashboard";
import Footer from "./component/Footer/Footer";
export default function App() {
  return (    
    <div className="relative min-h-[100vh] w-screen p-8">
      <Title /> 
      <div className="pt-5">
        <Dashboard />
      </div>      
      <div className="w-max mx-auto">
        <Footer/>
      </div>
    </div>
  );
}

import logo from './logo.svg';
import './App.css';
import Product from './component/Product';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
     <Header/>
     <Product/>
     {/* <Footer/> */}
    </div>
  );
}

export default App;


import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Navbar } from './Components/Navbar/Navbar';
import { Product } from './Pages/Product';
import { ShopCategory } from './Pages/ShopCategory';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Shop } from './Pages/Shop'
import { Footer } from './Components/Footer/Footer';
import men_banner from  './Components/Assets/banner_mens.png';
import women_banner  from './Components/Assets/banner_women.png'
import kids_banner  from './Components/Assets/banner_kids.png'


function App(){
  return (
    <div>
   <BrowserRouter>
    <Navbar/>
    
    <Routes>
      <Route exact path='/' element={<Shop/>}/>
      <Route exact path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
      <Route exact path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
      <Route exact path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>}/>
      <Route exact path='/product' element={<Product/>}/>
      <Route path='/product/:productId'element={<Product/>}/>
      <Route path='/womens/product/:productId'element={<Product/>}/>
      <Route path='/mens/product/:productId'element={<Product/>}/>
      <Route path='/kids/product/:productId'element={<Product/>}/>
      <Route exact  path='/cart' element={<Cart/>}/>
      <Route exact path='/login' element={<LoginSignup/>}/>
      <Route exact path='/login' element={<LoginSignup/>}/>
     </Routes>
     <Footer/>          
     </BrowserRouter>

    </div>
  );
}

export default App;





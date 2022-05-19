import '../../assets/style/app.css';

import logo from '../../assets/images/logo.png';
import NavLinks from '../NavBar/NavLinks';
import Currency from '../common/Currency';
import { Cart } from '../common/Cart';
import Logo from '../common/Logo';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        {/* Categories */}
        <NavLinks
          links={[
            { label: 'Women', path: 'women', id: '1' },
            { label: 'Men', path: 'men', id: '2' },
            { label: 'Kids', path: 'kids', id: '3' },
          ]}
        />
        {/* Logo */}
        <Logo logo={logo} logoAlt="Logo, Green bag with a white arrow inside" />
        {/* Others */}
        <div className="nav__utils">
          <Currency />
          <Cart />
        </div>
      </nav>
    </div>
  );
}

export default App;


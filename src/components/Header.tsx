import { Link } from 'react-router-dom'
import MainNav from './MainNav';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <div className="flex items-center justify-between py-5 px-16 shadow-lg">
        <Link to="/" className='text-2xl text-emerald-900 font-bold tracking-tight'>
            Recipes
        </Link>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
            <MainNav />
        </div>
    </div>
  )
}

export default Header;
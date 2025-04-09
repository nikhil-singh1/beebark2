import { navLists } from '../constants';

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width items-center">
        {/* Replaced Apple Logo with BeeBark Text */}
        <div className="text-2xl font-bold text-black">
          BeeBark
        </div>

        {/* BeeBark Text in the center */}
        <div className="flex flex-1 justify-center max-sm:hidden text-4xl font-bold text-white">
   
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div key={nav} className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {nav}
            </div>
          ))}
        </div>

        {/* Replaced 'Search' and 'Bag' with 'BeeBark' text */}
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          {/* Replacing 'Search' and 'Bag' icons with 'BeeBark' text */}
          <div className="text-sm cursor-pointer text-gray hover:text-white transition-all">
 
          </div>
          <div className="text-sm cursor-pointer text-gray hover:text-white transition-all">
         
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

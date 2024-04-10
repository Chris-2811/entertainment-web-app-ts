import { FaSearch } from 'react-icons/fa';

function Searchbar() {
  return (
    <div>
      <form>
        <div className="form-control flex items-start gap-6 ">
          <FaSearch color="white" size={24} />
          <input
            type="text"
            className="placeholder:text-white/50 w-[440px]  text-white bg-transparent outline-none xl:text-2xl caret-red focus:border-b focus:border-b-greyish-blue pb-[0.875rem]"
            placeholder="Search for movies or TV series"
          />
        </div>
      </form>
    </div>
  );
}

export default Searchbar;

import { useState } from "react";
import { FaGoogle, FaSearch, FaArrowLeft, FaArrowRight, FaSyncAlt, FaStar } from "react-icons/fa";

const backgrounds = ["url(https://source.unsplash.com/1600x900/?nature,forest)"];

const Header = ({ setQuery, handleSearch, setIsModalOpen }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsModalOpen(!isModalVisible);
  };

  return (
    <header
      className="flex flex-col md:flex-row justify-between items-center p-4 bg-blue-700 text-white"
      style={{ backgroundImage: backgrounds[0], backgroundSize: "cover" }}
    >
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <button className="p-2 hover:bg-blue-600 rounded">
          <FaArrowLeft />
        </button>
        <button className="p-2 hover:bg-blue-600 rounded">
          <FaArrowRight />
        </button>
        <button className="p-2 hover:bg-blue-600 rounded" onClick={() => window.location.reload()}>
          <FaSyncAlt />
        </button>
      </div>
      <div className="flex-grow mx-4 mb-4 md:mb-0">
        <div className="flex items-center bg-white text-black rounded-full p-2 shadow-md">
          <button className="p-2 hover:bg-gray-200 rounded " onClick={handleSearch}>
            <FaGoogle className="text-gray-500 text-xl" />
          </button>
          <input
            type="text"
            placeholder="Поиск Google"
            className="flex-grow w-full outline-none pl-4"
            onKeyPress={onSearch}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="text-green-500 p-2 hover:bg-gray-200 rounded" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-blue-600 rounded" onClick={toggleModal}>
          <FaStar />
        </button>
        {isModalVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Модальное окно</h2>
              <p>Содержимое модального окна...</p>
              <button className="text-blue-700 mt-4" onClick={toggleModal}>
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

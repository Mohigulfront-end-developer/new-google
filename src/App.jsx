import { useState } from "react";
import Header from "./Components/Header";
import SearchResults from "./Components/SearchResults";
import BookmarkModal from "./Components/BookmarkModal";
import {
  FaYoutube,
  FaLinkedinIn,
  FaPinterest,
  FaMicrophone,
  FaCamera,
  FaPlus,
} from "react-icons/fa";
import { RiTelegramLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(
      query
    )}&format=json&pretty=1`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.RelatedTopics) {
        setResults(data.RelatedTopics);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMicrophoneSearch = async () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch();
    };
    recognition.start();
  };

  const handleCameraSearch = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log(file); 
    };
    input.click();
  };

  const handlePlusClick = () => {

  };

  return (
    <div>
      <Header
        setQuery={setQuery}
        handleSearch={handleSearch}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalOpen && <BookmarkModal setIsModalOpen={setIsModalOpen} />}
      <div className="mt-8">
        <div className="text-center">
          <h1 className="text-6xl text-blue-600 font-bold">Google</h1>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center bg-white border rounded-full p-4 w-3/4 shadow-lg relative">
            <input
              type="text"
              placeholder="Поиск Google"
              className="flex-grow outline-none text-lg px-4"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="p-2 absolute right-28 top-1/2 transform -translate-y-1/2"
              onClick={handleMicrophoneSearch}
            >
              <FaMicrophone className="text-gray-500 text-xl" />
            </button>
            <button
              className="p-2 absolute right-10 top-1/2 transform -translate-y-1/2"
              onClick={handleCameraSearch}
            >
              <FaCamera className="text-gray-500 text-xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-10 space-x-4">
          <button
            className="p-4 bg-sky-400 rounded-2xl"
            onClick={() => window.open("https://telegram.org", "_blank")}
          >
            <RiTelegramLine className="text-2xl text-white w-[35px] h-[35px]" />
          </button>
          <button
            className="p-4 bg-gradient-to-r from-fuchsia-500 to-rose-500 rounded-2xl"
            onClick={() => window.open("https://instagram.com", "_blank")}
          >
            <IoLogoInstagram className="text-2xl text-white w-[35px] h-[35px]" />
          </button>
          <button
            className="p-4 bg-rose-800 rounded-2xl"
            onClick={() => window.open("https://youtube.com", "_blank")}
          >
            <FaYoutube className="text-2xl text-white w-[35px] h-[35px]" />
          </button>
          <button
            className="p-4 bg-sky-700 rounded-2xl"
            onClick={() => window.open("https://linkedin.com", "_blank")}
          >
            <FaLinkedinIn className="text-2xl text-white w-[35px] h-[35px]" />
          </button>
          <button
            className="p-4 bg-rose-500 rounded-2xl"
            onClick={() => window.open("https://pinterest.com", "_blank")}
          >
            <FaPinterest className="text-2xl text-white w-[35px] h-[35px]" />
          </button>
          <button
            className="p-4 bg-yellow-500 rounded-2xl"
            onClick={handlePlusClick}
          >
            <FaPlus className="text-2xl text-white w-[35px] h-[35px]" />
          </button>
        </div>
      </div>
      <SearchResults results={results} />
    </div>
  );
};

export default App;

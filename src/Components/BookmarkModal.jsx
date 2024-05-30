import React from "react";

const BookmarkModal = ({ setIsModalOpen }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Модальное окно</h2>
        <p>Содержимое модального окна...</p>
        <button className="text-blue-700 mt-4" onClick={closeModal}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default BookmarkModal;

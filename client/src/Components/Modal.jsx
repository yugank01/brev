import React, { useState,useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {setScrapping,scrapping}=useContext(UserContext);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [websiteLink, setWebsiteLink] = useState("");

  const handleClick = async () => {
    try {
      // Send the website link to the backend
      // const response = await axios.post("http://localhost:8080/api/scrapping", {
      const response = await axios.post(process.env.REACT_APP_BACKENDURI+"/api/scrapping", {
        websiteLink,
      });

      // Handle the response as needed
      console.log(response.data);
      setScrapping(response.data);
    } catch (error) {
      console.error("Error sending data to the backend", error);
    }
  };

  return (
    <div className="">
      <button onClick={togglePopup} className="px-4 py-2 border rounded-lg">
        Modal
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10">
          <div className="bg-[#2699fb] p-12 rounded-xl flex flex-col w-[40%] justify-center items-center shadow-lg">
            <h2 className="text-3xl text-green-800 font-bold mb-4">
              Enter Site URL
            </h2>
            {/* <input type="text" placeholder="Enter URL" className="text-white h-[40px] border-white w-[60%] bg-[#070708] rounded-full px-4" /> */}
            <div>
              <label>
                Website Link:
                <input
                  type="text"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </label>
              <button onClick={handleClick}>Send to Backend</button>
            </div>
            <div className="flex gap-4">
              <button
                onClick={togglePopup}
                className="mt-6 bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded-2xl"
              >
                Publish
              </button>
              <button
                onClick={togglePopup}
                className="mt-6 bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded-2xl"
              >
                Close Popup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

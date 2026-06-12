import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div>
        <h1>URL Shortener</h1>

        <form>
          <input
            type="text"
            placeholder="Enter URL"
          />

          <button type="submit">
            Shorten URL
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
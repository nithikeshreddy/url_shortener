import React from "react";
import {useState} from "react";
import axios from "axios";
import './App.css';

function App() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(!originalUrl){
      alert("Please enter a URL");
      return;
    }
    try{
      const response = await axios.post("https://url-shortener-imhk.onrender.com/shorten", {originalUrl: originalUrl});
      setShortUrl(response.data.shortUrl);
      console.log("Short URL created: ", response.data);
    } catch(error){
      alert("Error shortening URL: " + error.message);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        /> 
        <button type="submit">Shorten URL</button>
      </form>

      {shortUrl && (
  <div>
    <p>
      Short URL: 
      <a href={shortUrl} target="_blank" rel="noopener noreferrer">
        {shortUrl}
      </a>
    </p>
  </div>
)}
     
    </div>
  );
  
}

export default App;

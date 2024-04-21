import React, { useRef, useState } from 'react';

function SearchSong() {
  const inputRef = useRef(null);
  const [inputEmpty, setInputEmpty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);

  async function musicSearch() {
    const inputValue = inputRef.current.value.trim();
    if (inputValue === "") {
      setInputEmpty("Input is Empty");
      setError(null);
      setTracks([]); // Clear previous search results
      return;
    }
  
    setInputEmpty("");
    setLoading(true);
    setError(null);
    setTracks([]); // Clear previous search results
  
    const url = `https://shazam.p.rapidapi.com/search?term=${inputValue}&locale=en-US&offset=0&limit=5`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '07a1e84f74msh6520bc9acde55a4p1aedcajsn21788f9e9b9a',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // Check the structure of the response
  
      // Extract tracks and update state
      setTracks(data.tracks.hits);
  
      // Update UI to display music details
    } catch (error) {
      console.error(error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="min-h-screen text-white w-full bg-[#302F46]">
      <div className='m-auto md:w-[50%]'>
        <div className='m-auto text-center px-1 md:flex pt-6 md:justify-center md:items-center w-full '>
          <input ref={inputRef} className='w-full py-4 pr-2 text-[17px] mb-2 border-2  border-[#D97807] pl-4 text-gray-400 rounded-full bg-transparent outline-none' type="text" placeholder="Enter song" />
          <button onClick={musicSearch} className='py-4 bg-[#D97807] ml-2 px-8 md:px-6 rounded-full text-white font-medium border-2 border-[#D97807]'>Search</button>
        </div>
        <p className='text-white m-auto justify-center'>{inputEmpty}</p>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tracks.length > 0 && (
          <div>
            <h2>Tracks:</h2>
            {tracks.map((track, index) => (
              <div key={index}>
                <img src={track.track.images.coverart} alt={`Cover for ${track.track.title}`} />
                <p>Song Name: {track.track.title}</p>
                <p>Artist: {track.track.subtitle}</p>
                <p>Link: <a href={track.track.url} target="_blank" rel="noopener noreferrer">{track.track.url}</a></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchSong;

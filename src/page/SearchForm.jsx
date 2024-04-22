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
    <div className="min-h-screen text-white bg-gradient-to-b from-blue-500 to-blue-700">
      <div className='m-auto md:w-[40%] w-full'>
        <div className='m-auto text-center px-1 flex pt-6 md:justify-center md:items-center w-full '>
          <input ref={inputRef} className='w-full py-3 pr-2 text-[17px] border-2  border-white pl-4 text-gray-500 rounded-full bg-white outline-none' type="text" placeholder="Enter song" />
          <button onClick={musicSearch} className='py-3 bg-white ml-1 px-6 md:px-6 rounded-full text-blue-500 font-medium border-2 outline-none border-white'>Search</button>
        </div>
        <p className='text-white mt-2 pl-4 m-auto justify-center'>{inputEmpty}</p>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tracks.length > 0 && (
          <div className='flex  w-full md:w-[90%] px-3 m-auto flex-col justify-center'>
            <h2 className='text-[25px] font-semibold mt-6 mb-2 text-gray-300'>Tracks:</h2>
            {tracks.map((track, index) => (
              <div className='mb-14' key={index}>
                <img className='w-full' src={track.track.images.coverart} alt={`Cover for ${track.track.title}`} />
                <p className='font-semibold text-[17px] mt-3'>title: {track.track.title}</p>
                <p className='font-medium'>Artist: {track.track.subtitle}</p>
                <p className='underline font-medium'><a href={track.track.url} target="_blank" rel="noopener noreferrer">Song Link</a></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchSong;
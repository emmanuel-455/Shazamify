import React, { useRef, useState } from 'react';

function MusicSearcher() {
  const inputRef = useRef(null);
  const [inputEmpty, setInputEmpty] = useState("")

  async function musicSearch() {
    const inputValue = inputRef.current.value.trim();
    if (inputValue === "") {
      setInputEmpty("Input is Empty")
      return;
    }

    const url = `https://shazam.p.rapidapi.com/search?term=${inputRef.current.value}&locale=en-US&offset=0&limit=5`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '07a1e84f74msh6520bc9acde55a4p1aedcajsn21788f9e9b9a',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
  }

  return (
    <div className="min-h-screen w-full bg-[#302F46]">
      <div className="md:w-[80%] flex pt-[30%] md:pt-7 m-auto flex-col justify-center">
        <input type="text" ref={inputRef} placeholder="Enter song ID" />
        <button onClick={musicSearch}>Search</button>
        <p>{inputEmpty}</p>

        {/* Display music details here */}
      </div>
    </div>
  );
}

export default MusicSearcher;

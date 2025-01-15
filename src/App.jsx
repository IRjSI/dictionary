import { useState } from 'react';
import './App.css';

function App() {
  const [meaning, setMeaning] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const findWord = async (e) => {
    e.preventDefault();
    if (query === "") return;
    setError(null); // Clear previous errors
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Word not found');
      }

      const result = await response.json();
      const data = result[0];
      // console.log(data)
      setMeaning({
        word: data.word,
        
        meaning: data.meanings[0]?.definitions[0]?.definition || data.meanings[1]?.definitions[0]?.definition || data.meanings[0]?.definitions[2]?.definition,

        text: data.phonetics[2]?.text || data.phonetics[1]?.text || data.phonetics[0]?.text || '',

        pronunciation:data.phonetics[2]?.audio || data.phonetics[1]?.audio || data.phonetics[0]?.audio || '',
      });
    } catch (err) {
      setError(err.message);
      setMeaning(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center font-poppins min-h-screen bg-gray-900">
      <div className="text-white text-xl mt-4 sm:mb-24 mb-16 absolute top-4">
        <h2>Learn to Pronounce</h2>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1729 149" fill="#FFFFFF"><path d="M1689.89 26.59a4479.17 4479.17 0 0 0-89.64-7.41C1354.1.45 1106.56-5.76 859.92 5.93c-227.31-4.25-454.79 8.96-681.36 27.95C121.94 38.9 65.1 40.2 8.38 42.12c-16.57 2.86-5.23 26.39 5.6 14.46 160.76-1.27 331.82-27.38 620.54-34.8A4574.9 4574.9 0 0 0 498.9 36.57C376.43 52.24 253.01 65.21 132.88 94.51c-36.16 8.94-71.67 20.31-106.69 32.95-7.14 4.4-27.74 3.63-24.98 15.62 1.99 7.19 13.63 7.05 18.04 2.59 143.67-54.58 297.49-70.64 448.88-90.24 129.01-16.82 258.61-28.01 388.46-34.27 285.02 6.07 570.13 38.15 848.22 100.65 3.84 1.09 8.24-1.32 9.23-5.24 1.98-7.31-5.66-9.96-11.42-10.6-48.05-10.76-96.18-21.26-144.56-30.43-160.68-28.2-322.86-46.78-485.4-60.19l-2.34-.16c161.55-1.33 323.21 4.35 484.31 15.71 37.11 2.65 125.06 8.85 164.97 13.96a7.58 7.58 0 0 0 8.45-6.41c.94-13.18-23.48-8.77-38.14-11.86Z"></path></svg>

        {/* <div className="bg-[#ad2edf] sm:w-[900px] sm:h-[600px] w-[0px] h-[0px]  rounded-full opacity-5 blur-3xl absolute top-4 right-4">
            </div> */}
        
        {/* <div className="bg-[#1d4dbd] sm:w-[800px] sm:h-[600px] w-[0px] h-[0px]  rounded-full opacity-5 blur-3xl absolute top-4 left-4">
            </div> */}
      </div>
      <div className="flex justify-center items-center flex-col">
        <form className="flex" onSubmit={findWord}>
          <input
            type="text"
            placeholder="Search for word..."
            className="p-2 rounded-lg bg-opacity-15 bg-black sm:w-full border-2 border-gray-500 focus:outline-none text-white z-40 w-[180px]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg p-2 ml-2" type="submit">
            Learn
          </button>
        </form>

        {error && (
          <div className="text-red-500 mt-4">
            <p>{error}</p>
          </div>
        )}

        {meaning && (
          <div>
          <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290 290" fill="#FFF"><path d="M22.12 145v97.65h97.65V145H70.95c0-26.92 21.9-48.82 48.82-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65zm245.76-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65v97.65h97.65V145h-48.82c-.01-26.92 21.89-48.82 48.82-48.82z"></path></svg>
          <div className="flex flex-col text-white mt-4 w-[300px] sm:w-[400px] gap-5 bg-gray-800 p-6 rounded-lg shadow-md bg-opacity-75">
            <ul className="space-y-3">
              <li>
                <strong className="text-2xl truncate max-w-[380px] block">{meaning.word}</strong>
              </li>
              <li>
                <p className="text-gray-300">{meaning.meaning}</p>
              </li>
              <li>
                <p className="text-gray-300">{meaning.text}</p>
              </li>
              {meaning.pronunciation ? (
                <li>
                  <audio
                    controls
                    className="bg-[#f1f3f4] rounded-md w-full"
                    src={meaning.pronunciation}
                    aria-label={`Pronunciation of ${meaning.word}`}
                    />
                </li>
              ) : (
                <li className="text-gray-400">No pronunciation available</li>
              )}
            </ul>
          </div>
        </div>
        )}
      </div>
      <div className='text-white absolute bottom-1'>Made with 💖</div>
      </div>
    );
}

export default App;

import { useState } from "react";

const QuotesApp = () => {
  const [quote, setQuote] = useState({
    text: "Ask not what your country can do for you; ask what can you do for your country",
    author: "John Kennedy",
  });

  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  async function fetchNewQuote() {
    const response = await fetch("https://thequoteshub.com/api/random-quote");
    const quoteDetails = await response.json();
    setQuote({ text: quoteDetails.text, author: quoteDetails.author });
  }

  function toggleFavourite() {
    setShowFavourites(!showFavourites);
  }

  function addToFavourite() {
    const isAlreadyinFavouites = favourites.some(
      (fav) => fav.text === quote.text && fav.author === quote.author
    );
    if (!isAlreadyinFavouites) {
      setFavourites([...favourites, quote]);
    }
  }

  function removeFromFavourite(id) {
    const updatedFavourites = favourites.filter((item, index) => id !== index);
    setFavourites(updatedFavourites);
  }

  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quote.</h1>
        <i className="bx bxs-heart fav-icon" onClick={toggleFavourite}></i>
        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
        </div>
        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
        <div className="buttons">
          <button className="btn btn-new" onClick={fetchNewQuote}>
            New Quote
          </button>
          <button className="btn btn-fav" onClick={addToFavourite}>
            Add to Favourite
          </button>
        </div>
        {showFavourites && (
          <div className="favorites">
            <button className="btn-close" onClick={toggleFavourite}>
              <i className="bx bx-x"></i>
            </button>
            {favourites.map((quote, index) => (
              <div className="fav-quote" key={index}>
                <div className="fav-quote-delete">
                  <i
                    className="bx bx-x-circle"
                    onClick={() => removeFromFavourite(index)}
                  ></i>
                </div>
                <div className="fav-quote-content">
                  <div className="fav-quote-text">{quote.text}</div>
                  <div className="fav-quote-author">{quote.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesApp;

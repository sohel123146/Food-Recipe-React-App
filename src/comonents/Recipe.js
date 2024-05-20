import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const Recipe = (props) => {
  const [search, setSearch] = useState("");
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page,setPage] = useState(0)
  const [totalResults, setTotalResults] = useState(0);
  const app_id = "4af3b3af";
  const app_key= "7d9df5cc17136c6e7dcb6d3a69b5dcea";

  const fetchRecipes = async (page = 0, reset = false) => {
    props.setProgress(10);
    const from = page * 30;
    const to = from + 30;
    const url = `https://api.edamam.com/search?q=${search}&app_id=${app_id}&app_key=${app_key}&from=${from}&to=${to}&calories=591-722&health=alcohol-free`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let response = await data.json();
    props.setProgress(70);
    if (reset) {
      setHits(response.hits);
    } else {
      setHits((prevHits) => [...prevHits, ...response.hits]);
    }
    setTotalResults(response.count);  // Use response.count for total results
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    if (search) {
      fetchRecipes(0, true); // Reset data when search changes
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]); // Add search as a dependency

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchRecipes(0, true);
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
    fetchRecipes(page + 1);
  };
  
  return (
    <div className="container mt-3">
      <h1>Favourite Recipes - {search} Recipes</h1>
      <form onSubmit={handleSubmit} className="input-container mt-3">
        <div className="mx-3">
          <input
            size="30"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <InfiniteScroll
        dataLength={hits.length}
        next={fetchMoreData}
        hasMore={hits.length < totalResults}
        loader={<Spinner />}
      >
        <div className="fooditem-container mt-3">
          {loading && <Spinner />}
          <div className="container">
          <div className="row">
            {hits.map((item, uri) => {
              return (
                <div className="col-md-4">
                  <FoodItem recipe={item.recipe} />
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Recipe;

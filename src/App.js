import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      // PEGANDO A LISTA TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }
    loadAll();
  }, []);

  return (
    <div>
      <section>
        {movieList.map((item, key) => (
          <div>
            {item.title}
          </div>
        ))}

      </section>
    </div>
  );

}
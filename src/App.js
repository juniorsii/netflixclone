import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);  //CONST LISTA DE FILMES
  const [featureData, setFeatureData] = useState([]);  //CONST FILME EM DESTAQUE

  useEffect(() => {
    const loadAll = async () => {
      // PEGANDO A LISTA TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //PEGANDO FEATURE
      let originals = list.filter(i => i.slug === 'originals');  //PEGA A LISTA ORIGINALS
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); // GERA NUMERO ALEATORIO
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);

    }

    loadAll();
  }, []);

  return (
    <div className="page">
      {/* FUNCAO MOSTRA FILME EM DESTAQUE */}

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      {/* FUNCAO MOSTRA FILME LISTAGEM DE FILMES*/}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}

      </section>
    </div>
  );

}
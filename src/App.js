import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';

function App() {

  const [pokemon, setPokemon] = useState([])
  const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    let cancel
    axios.get(currentPage, {cancelToken: axios.cancelToken(c=> cancel = c)}).then((resp)=>{
      //for (let i = 0; i < 1000000000; i++) {}
      setLoading(false)
      setPokemon(resp.data.results)
      setNextPage(resp.data.next)
      setPrevPage(resp.data.previous)

      return(()=> cancel())
    })
  }, [currentPage])

  const goPrevious = () => {
    setCurrentPage(prevPage)
  }

  const goNext = () =>{
    setCurrentPage(nextPage)
  }

  return (
    <>
    <button onClick={goPrevious} disabled={prevPage == null}>Previous</button>
    <button onClick={goNext} disabled={nextPage == null}>Next</button>
    {loading && <div>Loading</div>}
    {!loading && <PokemonList pokemon={pokemon} />}
    </>
  )
}

export default App;

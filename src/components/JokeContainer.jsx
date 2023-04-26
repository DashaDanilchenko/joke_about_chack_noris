import { useState } from "react"
import FormSearch from './FormSearch/FormSearch'
import styles from '../styles/JokeContainer.module.css'
import Joke from './Joke'
import LabelFavorite from "./LabelFavorite"

const JokeContainer = ({addJoke, jokeFavorite, deleteJoke, setOnStyles}) => {

  const baseUrl = 'https://api.chucknorris.io/jokes/'

  const [joke, setJoke] = useState ([])
  const [categories, setCategories] = useState ('')
  const [input, setInput] = useState ('')

  function getJoke(url = `${baseUrl}/random`) {
    fetch(url)
    .then(date => date.json())    
    .then(joke => joke.result ? setJoke(joke.result) : setJoke([joke]))
}
 
  function searchJoke() {
      let url;

    if (document.querySelector('#from_categories').checked === true) {
      if (!categories) {
        return alert('Select a category!')
      }
        url = `${baseUrl}/random?category=${categories}`
    }
    if (document.querySelector('#search').checked === true) {
      if (!input) {
        return alert('Select a word!')
      }
      if (input.length < 3) {
        return alert('Enter a word that is three letters long!')
      }
        url = `${baseUrl}/search?query=${input}`
    }
    getJoke(url)
    setCategories('')
    setInput('')
  }


  return (
    <div className={styles.container}>
      <div className={styles.container_label}>
        <p>MSI 2020</p> 
        <LabelFavorite setOnStyles={setOnStyles}/>
      </div>
       <h2>Hey !</h2>
       <p>Let`s try find a joke for you:</p>
       <FormSearch setInput={setInput} setCategories={setCategories} input={input}/>
       <button className="get_joke" type="button" onClick={() => searchJoke()}>Get a joke</button>
       <Joke joke = {joke} addJoke = {addJoke} jokeFavorite={jokeFavorite} deleteJoke={deleteJoke}/>
    </div>
  )
}

export default JokeContainer
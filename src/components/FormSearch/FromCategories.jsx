import { useEffect, useState } from "react"
import ButtonCategories from "./ButtonCategories"

const FromCategories = ({check, setCategories}) => {

  const [categoriesArr, setCategoriesArr] = useState ([])
  const [error, setError] = useState ('')
  const [isLoading, setIsLoading] = useState (true)

  useEffect  (() => {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(data => data.json())
    .then(data => setCategoriesArr(data))
    .catch(error => setError(error.massage))
    .finally(() => setIsLoading(false))
  }, [])

  if (error) {
    return <h1>Error: {error}</h1>
}

  return (
    <div className="border_radio">
      <label htmlFor="search" className="border_search">
        <label className="radio_buttons">
          <input className="radio" type="radio" id="from_categories" name="from_categories" onClick={() => check("from_categories")}/>
          <span className="on_radio"></span> 
        </label>
        From categories
        </label>
        <div className="none" id="btn_container">
          {(isLoading && <h1>Loading...</h1>) ||  categoriesArr.map((item, index) => <ButtonCategories key={index} item={item} setCategories={setCategories}/>)}
        </div>
    </div>
  )
}

export default FromCategories
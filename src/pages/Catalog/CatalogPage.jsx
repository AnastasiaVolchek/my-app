import { useContext } from "react"
import { CardList } from "../../components/CardList/cardList"
import { CardContext } from "../../context/cardContext"
import { UserContext } from "../../context/userContext"
import { getIssues } from "../../utils/utils"
import "./index.css"

export const CatalogPage = () => {

    const {searchQuery, setSort} = useContext(UserContext);
    const {cards} = useContext(CardContext)

    const sortedItems = [{id: "новинки"}, {id: "популярные"}, {id: "подешевле"}, {id: "подороже"}]


    return <>
      {searchQuery && (
      <p> По запросу {searchQuery} найдено {cards?.length} 
          {getIssues(cards.length)} 
      </p>
      )}
      <div className="sort-cards">
      {sortedItems.map((e) =>
        <span key={e.id} className='sort-item' onClick={() => setSort(e.id)}>{e.id}</span>
      )}
      </div>
    <CardList cards={cards}/>
    </>
}
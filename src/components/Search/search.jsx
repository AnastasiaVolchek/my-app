import "./style.css";

export const Search = ({setSearchQuery, searchQuery}) => {
    return (
    <input
    placeholder="Поиск"
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search__input"
    value={searchQuery ?? ''}
    />)
}
// Компонент принимает два аргумента:  searchQuery - текущее значение поискового запроса и setSearchQuery (функция, которая устанавливает значение поискового запроса)

// функция onChange устанавливает новое значение поискового запроса, используя переданную функцию setSearchQuery. 
// Значение поля ввода устанавливается равным текущему значению поискового запроса. 
// Если текущее значение равно null или undefined, то устанавливается пустая строка.
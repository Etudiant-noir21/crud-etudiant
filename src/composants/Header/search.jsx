import './search.css'
export const Search = ({search,onSearch}) => {
    return <>
    <div className="search">
        <input type="text" placeholder="Rechercher..."  className="form-control"
         value={search} onChange={(e)=>onSearch(e.target.value)}/>
        <i className="bi bi-search"></i>
    </div>
    </>;
}
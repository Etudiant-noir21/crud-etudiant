import { Modal } from "../Header/formulaire";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Table = ({items,deleteItem,modifItems,blockItem}) => {

const [currentPage,setCurrentPage] = useState(1)
const itemsPerPage = 5
const totalPages = Math.ceil(items.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const currentItems = items.slice(startIndex, endIndex)


    return <>
    <div className="body-component mt-5">
        <table className="table">
        <thead className="thead-dark">
        <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prenom</th>
            <th scope="col">Email</th>
            <th scope="col">Telephone</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
            <tbody>
                
                {currentItems.map((item)=><tr key={item.id}
                className={item.bloquer? "blocked-row"  : ""}
                
                >
                  <td>{item.nom}</td>
                  <td>{item.prenom}</td>
                  <td>{item.email}</td>
                  <td>{item.telephone}</td>
                  <td className="d-flex justify-content-between align-items-center">
                    <Link to={`/details/${item.id}`} title="voir les details" className="btn btn-info">
                    <i className="bi bi-eye-fill"></i>
                    </Link>
                    <span title="modifier" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#formModal"
                     onClick={() => modifItems(item.id)}><i className="bi bi-pencil-square"></i></span>
                    <span title="supprimer" className="btn btn-danger" onClick={() => deleteItem(item.id)}><i className="bi bi-trash"></i></span>
                    <span title="bloquer" className="btn btn-danger" onClick={() => blockItem(item.id)}>
                       {item.bloquer ?  <i className="bi bi-unlock"></i> : <i className="bi bi-ban"></i> }
                    </span>
                  </td>
                  
                </tr>
                )}
            </tbody>
        </table>

        <Modal />
    </div>

    {/* pagination */}
    <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
            <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Precedent</button>
            <span className="mx-2">{currentPage} / {totalPages}</span>
            <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Suivant</button>

        </div>
    </div>
    </>;
}



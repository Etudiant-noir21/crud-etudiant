import { useParams , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
export const DetailsEtudiant = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [student,setStudent] = useState(null)

    useEffect(() => {
        if(!id) return
        const itemsStored = JSON.parse(localStorage.getItem('items'))
        if (!itemsStored || itemsStored.length === 0) {
            console.log("Aucune donnée dans le localStorage");
            return;
        }
        const studentFound = itemsStored.find(item => item.id == id)
        if(!studentFound) {
            console.log("Etudiant introuvable avec id" ,id);
            navigate('/')
            return
        }else{

            setStudent(studentFound)
        }
    }, [id,navigate])

    if(!student) return <p>Etudiant introuvable</p>
    return <>
    <div className="container">
        <div className="row">
            <div className="col-12">
                <h3>Details de l'etudiant: </h3>
                <p><strong>Nom</strong> : {student.nom}</p>
                <p><strong>Prenom</strong> : {student.prenom}</p>
                <p><strong>Email</strong> : {student.email}</p>
                <p><strong>Telephone</strong> : {student.telephone}</p>

                <button onClick={() => navigate(-1)} className="btn btn-secondary text-white">retour</button>

                <div className="p-2 mt-3">

                </div>
            </div>
        </div>
    </div>
    </>;
}
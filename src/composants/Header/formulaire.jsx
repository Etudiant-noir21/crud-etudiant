import { useEffect, useState } from "react";

export const Formulaire = ({addItems,currentItems,setModif,modif}) => {
    const [nom,setNom]= useState("")
    const [prenom,setPrenom]= useState("")
    const [email,setEmail]= useState("")
    const [telephone,setTelephone]= useState("")

    console.log("render");
    
    const Onsubmit=(e)=>{
    e.preventDefault()
    if(!nom.trim() || !prenom.trim() || !email.trim()||!telephone.trim()) return

    const newItem={
        id: Date.now() + Math.random(),
        nom: nom,
        email: email,
        prenom:prenom,
        telephone: telephone,
        bloquer:false
    }
    addItems(newItem)
       
if(!modif){
    setNom("")
    setPrenom("")
    setEmail("")
    setTelephone("")
    
    }

    }

    const handleCloseModal = () => {
        setModif(false)
        setNom("")
        setPrenom("")
        setEmail("")
        setTelephone("")
    }


    useEffect(()=>{
        if(modif && currentItems){
            setNom(currentItems.nom)
            setPrenom(currentItems.prenom)
            setEmail(currentItems.email)
            setTelephone(currentItems.telephone)
        }else{
            setNom("")
            setPrenom("")
            setEmail("")
            setTelephone("")
        }
    },[currentItems,modif])



    return (
        <>
            <button type="button" className="btn btn-success w-100 btn-ajouter" data-bs-toggle="modal" data-bs-target="#formModal">
               {modif ? "Modifier un etudiant" : "Ajouter un etudiant"} 
            </button>

          {/* modal */}
          <Modal 
          nom={nom}
           prenom={prenom} 
           email={email}
            telephone={telephone}
             setNom={setNom} 
             setPrenom={setPrenom} 
             setEmail={setEmail} 
             setTelephone={setTelephone} 
             Onsubmit={Onsubmit}
             modif={modif}
             handleCloseModal={handleCloseModal}
              />
        </>
    );
}


export const Modal = ({nom,prenom,email,telephone,setNom,setPrenom,setEmail,
    setTelephone,Onsubmit,modif,handleCloseModal}) => {
    return <>
      <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="formModalLabel">{modif ? "Modifier un etudiant" : "Ajouter un etudiant"}</h5>
                        <button 
                        type="button" className="btn-close" 
                        onClick={handleCloseModal} 
                        data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        


                        <form className="form-group" onSubmit={Onsubmit}>
                            <div className="row">
                                <div className="col-md-6 col-lg-6">
                                    <input type="text" placeholder="Nom" className="form-control mb-2"
                                     value={nom}  onChange={(e)=>setNom(e.target.value)}/>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <input type="text" placeholder="Prenom" className="form-control mb-2" 
                                    value={prenom}  onChange={(e)=>setPrenom(e.target.value)}/>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <input type="email" placeholder="Email" className="form-control mb-2"
                                   value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <input type="number" placeholder="telephone" className="form-control mb-2" 
                                    value={telephone}  onChange={(e)=>setTelephone(e.target.value)}/>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-success flex-grow-1" data-bs-dismiss="modal">
                                    {modif ? "Modifier" : "Ajouter"}
                                </button>
                                {modif && (
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={handleCloseModal}
                                    >
                                        Annuler
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
    </>;
}
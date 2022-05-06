import { useHistory } from 'react-router-dom'

const Form = () => {

const history = useHistory();

    const patientClickHandler = () =>{
        history.push("/addPatient")
        
    }

    const administerClickHandler = () => {
        history.push("/addVaccinations")
        
    }

    return(
        <div className="container">
            <div className="text-center">
          <div className="card-header">
          <h5>Vaccination App</h5>
          </div>
          <br/>
            <div className="text-center">
                <div className="card-body">
                    <button className="btn btn-block btn-secondary" onClick={patientClickHandler}> Patient</button>
                </div>
             
                <div className="card-body">
                    <button className="btn btn-block btn-secondary" onClick={administerClickHandler}> Vaccinations</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Form;
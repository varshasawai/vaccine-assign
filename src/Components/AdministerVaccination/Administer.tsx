import { gql, useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";


const GET_Patients_Name = gql`
query{
  patients{
    id
    name
    DOB
  }
}
  `;

const GET_ADMINISTER_DETAILS = gql`
query{
  administers{
    name 
    vaccine
    dueDate 
    brand
   }
}
  `;


const CREATE_ADMINISTER_MUTATION = gql`
  mutation onCreateAdministerMutation($name : String!, $DOB : String!, $vaccine : String! ,
     $dateAdministered : String! ,$brand : String ,$hospital : String) {

    createAdminister(data:{
      name : $name
      DOB : $DOB
      vaccine : $vaccine
      dateAdministered : $dateAdministered
      brand : $brand
      hospital : $hospital
      
    }){
      name , DOB, vaccine , dateAdministered ,brand , hospital
    }
  }`



const AddVaccination = () => {

  const date = new Date().getDate();
  


  const { loading: getPatientsLoading, error: getPatientsError, data: patientsData } = useQuery(GET_Patients_Name)
  const { loading: getDetailsLoading, error: getDetailsError, data: AdministerDetails } = useQuery(GET_ADMINISTER_DETAILS)

  let [createAdministerCallback, { loading: getAdministerLoading, error: getAdministerError, data: administerData }] = useMutation(CREATE_ADMINISTER_MUTATION, {
    variables: {
      name: '',
      DOB: '',
      vaccine: '',
      dateAdministered: '', 
      brand: '',
      hospital: ''
      
    }
  })
  

  const name = AdministerDetails?.administers.map((ad : any) => ad.name);
 

 
  
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedVaccine, setSelectedVaccine] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHospital, setSelectedHospital] = useState<string>('');
 const [selectedDOB,setSelectedDOB]= useState<string>('');



  const nameBlurHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    event.preventDefault()
   
   
  }

  const saveClickHandler = (event: React.FormEvent) => {
    event.preventDefault()

    createAdministerCallback({
      variables: {
        name: selectedName,
        DOB: selectedDOB,
        vaccine: selectedVaccine,
        dateAdministered: selectedDate,
        brand: selectedBrand,
        hospital: selectedHospital
     
       
      }
    }).then(res => {
    
      alert("Person details have been submitted!")
      window.location.reload();
    }).catch(err => {
      alert("please click next")
    })

  
  }

   if (getPatientsLoading) return <p>Loading</p>;
  if (getPatientsError  || getAdministerError || getDetailsError) return <p>something went wrong</p>;

  return (
    <div className="row">

      <div className="col-6 offset-3">
        <div className="card">
          <div className="card-header">
            <h4 className="text-center">Vaccine</h4>
          </div>
          <div className="card-body">
            <form  >
              {/* name */}
              <div className="form-group">
                <label htmlFor="name">Name :</label>
                <select id="name" name="name" className="form-control"
                  onChange={e => setSelectedName(e.currentTarget.value)}
                  onBlur={nameBlurHandler} >
                  <option value="-">-</option>
                  {patientsData.patients.map((patient: any) => (
                    <option key={patient.id} value={patient.name}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* DateOfBirth */}
              <div className="form-group ">
                <label htmlFor="name">Date Of Birth :</label>
                <select id="name" name="name" className="form-control"
                  onChange={e => setSelectedDOB(e.currentTarget.value)}
                   >
                  <option value="-">-</option>
                  {patientsData.patients.map((patient: any) => (
                    <option key={patient.id} value={patient.DOB}>
                      {patient.DOB}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Vaccination */}
              <div className="form-group">
                <label htmlFor="vaccination">Vaccines taken :</label>
                <select name="vaccines"
                  className="form-control"
                  onChange={e => setSelectedVaccine(e.target.value)}>
                  <option value="-">-</option>
                  <option value="None">None</option>
                  <option value="vaccine1">vaccine 1</option>
                  <option value="vaccine2">vaccine 2</option>
                </select>
              </div>
              <br />
              {/* date administer */}
              <div className="form-group">
                <label htmlFor="dateOfVaccine">Date Administered :</label>
                <input className="form-control" type="date" onChange={e => setSelectedDate(e.currentTarget.value)}></input>
              </div>
              
              {/* brand name */}
              <div className="form-group">
                <label htmlFor="brand">Brand Name :</label>
                <input className="form-control" onChange={e => setSelectedBrand(e.target.value)} type="text"></input>
              </div>
              
              {/* hospital name */}
              <div className="form-group">
                <label htmlFor="hospital">Given At :</label>
                <select name="hospital" onChange={e => setSelectedHospital(e.currentTarget.value)}
                  className="form-control">
                  <option value="-">-</option>
                 
                  <option value="hospital A">Hospital A</option>
                  <option value="hospital B">Hospital B</option>
                  <option value="hospital C">Hospital C</option>
                </select>
                
                {/* buttons */}
                <div className="row">
                  <div className="col-6">
                    <button type="submit" className="form-control btn-primary" onClick={saveClickHandler}>Save</button>

                  </div>
                  <div className="col-6">
                    <button type="reset" className=" form-control btn btn-block btn-danger" >Cancel</button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="form-group form-control ">
          <div className="card-header">
            <h4 className="text-center">Vaccination Card</h4>
          </div>
          <div className="card-body">
            <Table striped bordered hover variant="dark" className="filterTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name Of Patient</th>
                
                  <th>Vaccine</th>
                  <th>Due Date</th>
                  <th>Brand Name</th>
                  <th>Hospital Name</th>
                  <th>Vaccination Status</th>
                </tr>
              </thead>
              <tbody>
              {AdministerDetails?.administers.map((item : any) => (
        <tr key={item.name}>
          {Object.values(item).map((val : any) => (
            <td key={val.name}>{val}</td>  
          ))}
        </tr>
      ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddVaccination;
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Form,Table, Modal, Button} from 'react-bootstrap';
import './App.css'

function Cricket() {
    const [show, setShow] = useState(false);
 
     const[cricketdata, setCricketdata]= useState([])
     

     /////////POST
     const[empid, setEmpId]= useState('')
     const[empname, setEmpName]= useState('')
     const[dept, setDept]= useState('')
     const[salary, setSalary]= useState()




        ///////States for Updating Data
        
        const[newid, setNewEmpId]= useState('')
        const[newname, setNewEmpName]= useState('')
        const[newdept, setNewDept]= useState('')
        const[newsal, setNewSal]= useState()

    
        const handleClose = () => setShow(false);
const handleShow = () => setShow(true);




     ////////////GET
useEffect(()=>{
 async function newCricketData (){
 
 let response= await axios.get('http://13.233.68.7:4000/viewemployee')
      console.log(response.data)
      setCricketdata(response.data)
      
    } 
    newCricketData() }, [])
n







  //////////////POST//////////
  async function postData(){
    
    let newData={
      "Emp_id":empid,
      "Emp_name":empname,
      "Dept":dept,
      "Salary" :salary
    }
    //  console.log(postData)
    let response = await axios.post('http://13.233.68.7:4000/addemployee', newData)
    // return response
    // console.log(response.data.affectedRows)
  }
  

  //////////DELETE////////////
  async  function deleteData(empid){

    let response= await axios.delete(`http://13.233.68.7:4000/deleteemployee/${empid}`)
      return response
   }

   ////////////UPDATE/////////////

   function updateData(newid,newname, newdept, newsal){
    setNewEmpId(newid);
    setNewEmpName(newname);
    setNewDept(newdept);
    setNewSal(newsal)
}

async function saveUpdatedData(){


 let responseUpdate =await axios.patch(`http://13.233.68.7:4000/updateemployee/${newid}`, {
  "Emp_id":newid,
  "Emp_name":newname,
  "Dept":newdept,
  "Salary":newsal
 })
}


 
  return ( <>
    
        <div className='fullpage'>

        

        <div className='logoAndHead'>
            <img className='bcci'src="/images/BCCI.png" alt="" />
          
           
      


   

<Container className='container1' >
<h1 style={{textAlign:'center',color: 'white'}}>Board of Control for Cricket in India</h1> 

<h3>Cricketer Registration</h3>

<form className='box'>

<Form.Label className='label'>JersNPM STARTey Number</Form.Label>
<Form.Control className='input' value={empid} onChange={(e)=>setEmpId(e.target.value)} />

<Form.Label className='label'>Cricketer Name</Form.Label>
<Form.Control className='input' value={empname} onChange={(e)=>setEmpName(e.target.value)} />

<Form.Label className='label'> Cricketer Descipline</Form.Label>
<Form.Control className='input' value={dept} onChange={(e)=>setDept(e.target.value)} />

<Form.Label className='label'>Cricketer Salary</Form.Label>
<Form.Control className='input' value={salary} onChange={(e)=>setSalary(e.target.value)} />

<button className='firstbtn' onClick={()=>postData()}>Add</button>
 
</form>

</Container>

</div>
</div>
<hr />
<br /><br />

<Container>

<h3 className='cricinf'>Crickter's Information</h3>

<Table striped bordered hover variant="primary"> 

<thead>
<tr>
    <th> Cricket Jursey Number</th>
    <th> Cricket Name</th>
    <th> Cricket Descipline</th>
    <th> Cricket Salary</th>
    <th>Grade</th>
    <th>Action</th>
</tr>
</thead>

<tbody>
{
cricketdata.map((item, index)=>{
  return(
<tr>
    <td> {item.Emp_id} </td>
    <td> {item.Emp_name} </td>
    <td> {item.Dept}</td>
    <td> {item.Salary} </td>
    {(item.Salary >=50000)?<td style={{color:'green'}}> Grade A </td> : <td style={{color:'red'}}> Grade B </td>
      }
      <button onClick={()=> updateData(item.Emp_id,item.Emp_name, item.Dept, item.Salary  )}>Update</button>
      <button onClick={()=> deleteData(item.Emp_id)}>Delete</button>
      
</tr>
)
}
)
}


</tbody>
</Table> 
</Container>








<label>Employee ID</label>
       <input value={newid} onChange={(e)=>setNewEmpId(e.target.value) } />
       <br/> <br/>

       <label>Employee Name</label>
       <input value={newname} onChange={(e)=>setNewEmpName(e.target.value)} />
       <br/> <br/>

       <label>Employee Department</label>
       <input value={newdept} onChange={(e)=>setNewDept(e.target.value)} />
       <br/> <br/>

       <label>Employee Salary</label>
       <input value={newsal} onChange={(e)=>setNewSal(e.target.value)} />
       <br/> <br/>

       <button onClick={()=> saveUpdatedData()}>Save</button>





     

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Update Employee</Modal.Title>
</Modal.Header>
<Modal.Body>

<div>

<Form.Label>Employee Id</Form.Label>
<Form.Control value={newid} onChange={(e)=>setNewEmpId(e.target.value)} disabled='true' /> <br />

<Form.Label>Employee Name</Form.Label>
<Form.Control value={newname} onChange={(e)=>setNewEmpName(e.target.value)} /> <br />

<Form.Label>Employee Department</Form.Label>
<Form.Control value={newdept} onChange={(e)=>setNewDept(e.target.value)} /> <br />

<Form.Label>Employee Salary</Form.Label>
<Form.Control value={newsal} onChange={(e)=>setNewSal(e.target.value)} /> <br />

</div>
</Modal.Body>
<Modal.Footer>

  <Button variant="secondary" onClick={handleClose}>Close</Button>

  <Button variant="primary" onClick={()=>saveUpdatedData()}>Save</Button>
  </Modal.Footer>
  </Modal>




</>
)




}


export default Cricket
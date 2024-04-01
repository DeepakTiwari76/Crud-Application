import { Employedata } from './EmployeData';
import './App.css';
import {useEffect,useState} from 'react'

function App() {
const[data, setdata] = useState([]);
const[firstName, setfirstName] = useState([])
const[lastName, setlastName] = useState([])
const[age, setage] = useState(0)
const[id, setid] =useState(0)
const[isupdate,setisupdate]=useState(false)




const handleedit =(id)=>{
const dt = data.filter(item=>item.id === id);
if(dt!==undefined){
  setisupdate(true)
  setid(id)
  setfirstName(dt[0].firstName)
  setlastName(dt[0].lastName)
  setage(dt[0].age)

}
}

const performdelete =(id)=>{ 
  if(id>0)
  {
   if( window.confirm("Are you sure to Detele ??")){
    const dt = data.filter(item=> item.id !==id);
    setdata(dt);
  }
}
}
const performclear =()=>{
  setid(0);
  setfirstName('');
  setlastName('');
  setage(0);
  setisupdate(false) 
}
const performsave =(e)=>{
 let error = '';

 if(firstName === '')
 error += 'firstname is required ,'

 if(lastName === '')
 error += 'lastname is required , '

 if(age<= 0);
 error += 'age is required'

if(error === '')
{
  e.preventDefault();
  const dt = [...data];
  const newobject= {
    id:Employedata.length+1,
    firstName:firstName,
    lastName:lastName,
    age:age
  }
  dt.push(newobject);
  setdata(dt);
  performclear();
}
else{
  alert(error)
}
}
const handleupdate =()=>{
  const index = data.map((item)=>{
    return item.id
  }).indexOf(id)
  const dt = [...data];
  dt[index].firstName= firstName;
  dt[index].lastName= lastName;
  dt[index].age= age;
  setdata(dt);
  performclear();

}

useEffect(()=>{
  setdata(Employedata)
},[]);

  return (
  
    <div className="App">
      <div className='input'>
        <label for="text" >First Name:</label>
        <input type='text' value={firstName}  onChange={(e)=>setfirstName(e.target.value)} placeholder='Enter name'></input>
        <label for="text" >LastName:</label>
        <input type='text' value={lastName} onChange={(e)=>setlastName(e.target.value)} placeholder='Enter name'></input>
        <label  >age:</label>
        <input type='number' value={age} onChange={(e)=>setage(e.target.value)} placeholder='Enter age'></input>
        {
          !isupdate ? <button onClick={(e)=>performsave(e)} style={{background:"blue"}}>save</button>
          :
          <button onClick={()=>handleupdate()} style={{background:"red"}}>Update</button>
        }
       
        
        <button onClick={()=>performclear()} style={{background:"green"}}>clear</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>ID</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>age</td>
            <td>action</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index) =>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <button onClick={()=>handleedit(item.id)} style={{background:"green"}}>edit</button>
                  <button onClick={()=>performdelete(item.id)} style={{background:"red"}}>delete</button>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

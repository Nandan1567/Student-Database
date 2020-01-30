import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';






class AddStudents extends Component
{
  constructor(props){
    super(props);
    this.state={
      'firstName':'',
      'lastName':'',
      'skills':'',
     

    };
    this.addNote=this.addNote.bind(this);
  }
  addNote()
{
  // const skill = this.state.skills ? this.state.skills.toString().split(',') : [];
  // let final_state = this.state
  // final_state['skills'] = skill;
  if(this.state.firstName !== '' && this.state.lastName !== '' && this.state.skills.length !== 0 ){
    this.props.studentinfo(this.state);
    this.setState({
      'firstName':'',
      'lastName':'',
      'skills':''
    })
  }
  else{
    alert('Please enter all fields!!!')
  }

}
SearchStudent()
{
  this.setState({
    
  })
}
  render() 
  {
    return(
      <div className="form">
         <div className="name">
         <div>first Name :<input type="text" className="firstName" placeholder="first name"  onChange={(event) =>this.setState({'firstName':event.target.value})}/> </div>
         <div>last Name: <  input type="text" className="lastName" placeholder="last name"   onChange={(event) =>this.setState({'lastName':event.target.value})}/> </div>
         <div>  Skills :<input type="text" className="skills"placeholder="skills" onChange={(event) =>this.setState({'skills':event.target.value})}/> </div>
              < div className="submit" onClick={this.addNote}>submit</div>
              <div>search:<input type="text" className="search" onChange={(event)=> this.props.searchInfo(event.target.value)} / ></div>
        
  
          </div>
         
      </div>
    )
  }
}
class Student extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      query: '',
      students : [],
      'firstName':this.props.firstName,
      'lastName':this.props.lastName,
      'skills':this.props.skills,
      'editStatus': false

    };
    this.textshow=this.textshow.bind(this);
    this.SortFirstName=this.SortFirstName.bind(this);
    this.SortLastName=this.SortLastName.bind(this);
    this.SortSkills=this.SortSkills.bind(this);
    this.searchField= this.searchField.bind(this);
    this.refreshList=this.refreshList.bind(this);
    this.DeleteList=this.DeleteList.bind(this);
    this.EditList=this.EditList.bind(this);
    this.UpdateList=this.UpdateList.bind(this);
 
  }

  textshow(students)
  { 
    // this.setState({
    //   students: [...this.state.students,students]

    // })
    Axios.post('http://127.0.0.1:8000/student/post',students) .then(res =>{
      this.refreshList();
    });

  
  }

  
  SortFirstName()
  {
    const sortFirstname=this.state.students.sort((a,b) => {return a.firstName.localeCompare(b.firstName);
    });
    this.setState({
      students:sortFirstname
    })
  }
  SortLastName()
  {
    const sortLastname=this.state.students.sort((a,b) => {return a.lastName.localeCompare(b.lastName);
    });
    this.setState({
      students:sortLastname
    })
  }
  SortSkills()
  {
    const sortSkills=this.state.students.sort((a,b) => {return a.skills.localeCompare(b.skills);
    });
    this.setState({
      students:sortSkills
    })
  }



EditList(pk)
{
 this.setState({
  editStatus : true
 });
}

UpdateList(pk)
{
  Axios.put('http://127.0.0.1:8000/student/update/'+pk.toString()+'/',this.state)
  .then(res => {
    this.refreshList();
    })
}


DeleteList(pk)
{
  Axios.delete('http://127.0.0.1:8000/student/delete/'+pk.toString()+'/').then(res =>{
    this.refreshList();
  })
}
  searchField(text) 
  {
    this.setState({
      query: text
    })
  }

refreshList()
  {
    Axios.get('http://127.0.0.1:8000/student/')
    .then(res => {
      this.setState ( {
        students:res.data

      });
    })
    
  }
  componentDidMount()
    {
      this.refreshList();
    }


  render()
  {
    return(
      <div>

      <AddStudents studentinfo={this.textshow} searchInfo={this.searchField}/>
      <table>
          <tr>
            <th onClick={this.SortFirstName}>firstName</th>
            <th onClick={this.SortLastName}>lastName</th>
            <th onClick={this.SortSkills}>skills</th>
            
          </tr>
        { this.state.students
        .filter((name) => {
          return name.firstName.toLowerCase().includes(this.state.query.toLowerCase()) ||
          name.lastName.toLowerCase().includes(this.state.query.toLowerCase())
        })
        .map((item,index) =>  
        <tr key={index}>
          <td>{item.firstName} </td> 
          <td>{item.lastName}</td>
          <td>

          {
             
            item.skills.map((item,index) => 
              <ul key={index}>
                <li>{item}</li>
              </ul>
                  )}
               <button onClick={(event) => this.EditList(item.pk) }>Edit</button>{
                 this.state.editStatus ? (
                   <div className="form-popup">
                     <div className="student-name">
                     <div>firstName :<input className="firstName1"   type='text' value={this.state.firstName}  onChange={(event) =>this.setState({'firstName':event.target.value})}/> </div>
                    <div>lastName: <input className="lastName1"    type='text' value={this.state.lastName} onChange={(event) =>this.setState({'lastName':event.target.value})}/></div>
                    <div>skills : <input className="skills1" type='text' value={this.state.skills} onChange={(event) =>this.setState({'skills':event.target.value})}/></div>
                     <button className="button" onClick={(event) => this.UpdateList(item.pk) }>Update</button>
                     </div>
                   </div>
                 ) : null
               }
               <button onClick={(event) => this.DeleteList(item.pk)}>delete</button> 
          </td>
        </tr>

        )}
    </table>
    </div>
   );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        {/* <AddStudents/> */}
      <Student/>
      
      </div>

    );
  }
}

export default App;

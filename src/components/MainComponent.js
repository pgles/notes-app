import React,{Component} from 'react';
import Calendar from 'react-calendar';
import Note from './NoteComponent';
import {connect} from 'react-redux';
import {Form,Label,Input,FormGroup,Button} from 'reactstrap';
import DatePicker from "react-datepicker";
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import { addNote, deleteNote, editNote } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {notes: state.notes}
};

const mapDispatchToProps = (dispatch) => ({
    addNote: (note) => dispatch(addNote(note)),
    editNote: (note,index) => dispatch(editNote(note,index)),
    deleteNote: (index) => dispatch(deleteNote(index))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
      selectedNote:null,
      selectedIndex: null,
      editDate: new Date(),
      addNoteTitle:'',
      addNoteDescription:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onNoteSelect = this.onNoteSelect.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddNoteDescription = this.handleAddNoteDescription.bind(this);
    this.handleAddNoteTitle = this.handleAddNoteTitle.bind(this);
  }
  onDateChange(date) {
      this.setState({editDate:date});
  }
  handleLogin(event) {
      this.props.addNote({date:this.state.value.toDateString(),title:this.title.value,description:this.description.value});
      event.preventDefault();
      this.setState({value:new Date(),addNoteDescription:'',addNoteTitle:''});
      this.title.value = '';
      this.description.value = '';
  }
  handleChange(value) {
    this.setState({value:value});
  };
  onNoteSelect(note,index) {
    this.setState({selectedNote:note,selectedIndex:index});
}
handleEdit(event) {
    this.props.editNote({date:this.state.editDate.toDateString(),title:this.titlee.value,description:this.descriptione.value},this.state.selectedIndex);
    this.setState({editDate:new Date(),selectedIndex:null,selectedNote:null})
    event.preventDefault();
}
handleAddNoteDescription(value) {
    this.setState({addNoteTitle:value});
}
handleAddNoteTitle(value) {
    this.setState({addNoteDescription:value});
}
    handleDelete() {
    this.props.deleteNote(this.state.selectedIndex);
    this.setState({selectedNote:null,selectedIndex:null,editDate:new Date()});
}
  render() {
    return (
    <div className='container'>
        <div className='row row-content'>
            <div className='col-md-6 col-12'>
                <h2 className = 'mb-4'>ADD NOTE</h2>
                <Calendar value = {this.state.value} onChange= {this.handleChange} className='w-100'/>
            </div>
            <div className='col-md-6 d-md-block d-none'>
                <h2 className = 'mb-4'>SELECT NOTE TO EDIT</h2>
                {this.props.notes.map((note,index) => {
                    return (
                        <Note onClick={() => {this.onNoteSelect(note,index)}} note={note}/>   
                    );
                })}
            </div>
        </div>
        <div className = 'row row-content mt-4'>
            <div className='col-md-6 col-12'>    
                <Form onSubmit={this.handleLogin}>  
                    <FormGroup>
                        <Label htmlFor='title'>Title</Label>
                        <Input type='text' id='title' name='title' onChange={this.handleAddNoteTitle} innerRef={(input) => this.title = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='description'>Description</Label>
                        <Input type='textarea' id='description' onChange={this.handleAddNoteDescription} name='description' rows={8} innerRef={(input) => this.description = input}/>
                    </FormGroup>
                    <FormGroup className = 'd-flex justify-content-center'>
                        <Button type='submit' className='bg-success mr-1'>SAVE</Button>{'       '}
                        <Button className='bg-danger' onClick={() => {this.title.value='';this.description.value='';this.setState({value:new Date()})}}>DISCARD</Button>
                    </FormGroup>
                </Form>
            </div>
            <div className='col-12 d-md-none d-block'>
                <h2 className = 'mb-4'>SELECT NOTE TO EDIT</h2>
                {this.props.notes.map((note,index) => {
                    return (
                        <Note onClick={() => {this.onNoteSelect(note,index)}} note={note}/>   
                    );
                })}
            </div>
            <div className='col-md-6 col-12'>   
            {
                this.state.selectedNote != null ?
                 <Form onSubmit={this.handleEdit} key={this.state.selectedIndex}>  
                <FormGroup>
                    <Label htmlFor='title'>Title</Label>
                    <Input type='text' id='title' name='title' innerRef={(input) => this.titlee = input } defaultValue = {this.state.selectedNote.title}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='description'>Description</Label>
                    <Input type='textarea' id='description' name='description' rows={8} innerRef={(input) => this.descriptione = input}  defaultValue = {this.state.selectedNote.description || ''}/>
                </FormGroup>
                 <FormGroup>
                    <Label htmlFor='date' className = 'mr-2'>Date</Label>
                    <DatePicker selected={this.state.editDate} onChange = {this.onDateChange} className='w-100' showYearDropdown isClearable dateFormat='dd/MM/yyyy'/>
                </FormGroup> 
                <FormGroup className = 'd-flex justify-content-center'>
                    <Button type='submit' className='bg-success mr-2'>SAVE</Button>
                    <Button className='bg-danger' onClick={() => {this.handleDelete()}}>DELETE</Button>
                </FormGroup>
            </Form>
                : 
                <div></div>
                }
            </div>
        </div>
    </div>
    );
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);

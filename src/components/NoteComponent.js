import React,{Component} from 'react';
import {Card,CardTitle,CardText,Button} from 'reactstrap';

class Note extends Component  {
    render(){
    return (
        <Card body> 
          <CardTitle tag="h5">{this.props.note.title}</CardTitle>
          <CardText>{this.props.note.date}</CardText>
          <CardText>{this.props.note.description}</CardText>
          <Button onClick={this.props.onClick}>EDIT</Button>
        </Card>
    );  
    }
}

export default Note;
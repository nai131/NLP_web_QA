import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './App.css';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
// import './App.css';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.css';




class App extends Component {

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onFinished = this.onFinished.bind(this);
    this.state = {
      isLoading: false,
      formData: {
        textfield1: '',
        textfield2: '',
        select1: 1,
        select2: 1,
        select3: 1
      },
      result: "",
      status: 'ready',
      possible_ans: ['2 weeks','3 days','kuay nai'],
      formData: "",
      result: ""
    };

    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
    }));

  }

  

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    if (this.state.formData.length == 0) {
      alert('Please fill the search field')
    } else {
      const formData = this.state.formData;
      this.setState({ isLoading: true });
      fetch('http://127.0.0.1:5000/prediction/',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            result: response.result,
            isLoading: false
          });
        });
    }
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  onSearch(){
    this.setState({status:"loading"})
  }

  onFinished(){
    this.setState({status:"finished"})
  }

  

  renderList(){
    return(
      this.state.possible_ans.map((notes) => {
        return(
          
          <ListItem style={{paddingTop:'10px', paddingBottom:'10px'}}>
            <ListItemText style={{ border: '3px solid black',marginTop:'20px', paddingTop:'10px', paddingBottom:'10px', paddingLeft:'40px', borderRadius:'15px'}}
              primary={notes}
            />
          </ListItem>
        )
      })
    )
    // <List dense={dense}>
    //           {generate(
    //             <ListItem>
    //               <ListItemText
    //                 primary="Single-line item"
    //                 secondary={secondary ? 'Secondary text' : null}
    //               />
    //             </ListItem>,
    //           )}
    //         </List>
    
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    if(this.state.status == "ready"){
      return (
        <div>
          <AppBar position='static' style={{ backgroundColor: '#374f63' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'center', height: '85px' }}>
              <Typography variant="h2"  >
                <Box fontWeight="fontWeightBold">
                  Covid-19 Q&A
              </Box>
              </Typography>
            </Toolbar>
          </AppBar>
          <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }} className='container'>
            <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
              <Box fontWeight="fontWeightBold">
                What are you looking for?
              </Box>
            </Typography>
            
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <TextField
              variant='outlined'
              style={{ paddingRight: '10px' }}
              value={formData}
              onChange={this.handleChange}
              placeholder="Ask here"
            />
            <Button
              style={{ backgroundColor: '#4c92ca' }}
              variant="contained"
              disabled={isLoading}
              onClick={this.onSearch}>
              <SearchIcon />
            </Button>
          </div>
          </Box>
        </div>
        // <Container>
        //   <nav class="navbar navbar-expand-lg navbar-light bg-light">
        //     <a class="navbar-brand">Navbar</a>
        //   </nav>
        //   <div>
        //     <h1 className="title">ML React App</h1>
        //   </div>
        //   <div className="content">
        //     <Form>
        //       <Form.Row>
        //         <Form.Group as={Col}>
        //           <Form.Label>Text Field 1</Form.Label>
        //           <Form.Control
        //             type="text"
        //             placeholder="Text Field 1"
        //             name="textfield1"
        //             value={formData.textfield1}
        //             onChange={this.handleChange} />
        //         </Form.Group>
        //         <Form.Group as={Col}>
        //           <Form.Label>Text Field 2</Form.Label>
        //           <Form.Control
        //             type="text"
        //             placeholder="Text Field 2"
        //             name="textfield2"
        //             value={formData.textfield2}
        //             onChange={this.handleChange} />
        //         </Form.Group>
        //       </Form.Row>
        //       <Form.Row>
        //         <Form.Group as={Col}>
        //           <Form.Label>Select 1</Form.Label>
        //           <Form.Control
        //             as="select"
        //             value={formData.select1}
        //             name="select1"
        //             onChange={this.handleChange}>
        //             <option>1</option>
        //             <option>2</option>
        //             <option>3</option>
        //             <option>4</option>
        //           </Form.Control>
        //         </Form.Group>
        //         <Form.Group as={Col}>
        //           <Form.Label>Select 2</Form.Label>
        //           <Form.Control
        //             as="select"
        //             value={formData.select2}
        //             name="select2"
        //             onChange={this.handleChange}>
        //             <option>1</option>
        //             <option>2</option>
        //             <option>3</option>
        //             <option>4</option>
        //           </Form.Control>
        //         </Form.Group>
        //         <Form.Group as={Col}>
        //           <Form.Label>Select 3</Form.Label>
        //           <Form.Control
        //             as="select"
        //             value={formData.select3}
        //             name="select3"
        //             onChange={this.handleChange}>
        //             <option>1</option>
        //             <option>2</option>
        //             <option>3</option>
        //             <option>4</option>
        //           </Form.Control>
        //         </Form.Group>
        //       </Form.Row>
        //       <Row>
        //         <Col>
        //           <Button
        //             block
        //             variant="success"
        //             disabled={isLoading}
        //             onClick={!isLoading ? this.handlePredictClick : null}>
        //             {isLoading ? 'Making prediction' : 'Predict'}
        //           </Button>
        //         </Col>
        //         <Col>
        //           <Button
        //             block
        //             variant="danger"
        //             disabled={isLoading}
        //             onClick={this.handleCancelClick}>
        //             Reset prediction
        //           </Button>
        //         </Col>
        //       </Row>
        //     </Form>
        //     {result === "" ? null :
        //       (<Row>
        //         <Col className="result-container">
        //           <h5 id="result">{result}</h5>
        //         </Col>
        //       </Row>)
        //     }
        //   </div>
        // </Container>
      );
    }else if(this.state.status == 'loading'){
        return(
        <div>
        <AppBar position='static' style={{ backgroundColor: '#374f63' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'center', height: '85px' }}>
            <Typography variant="h2"  >
              <Box fontWeight="fontWeightBold">
                Covid-19 Q&A
            </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }} className='container'>
          <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <Box fontWeight="fontWeightBold">
              What are you looking for?
            </Box>
            
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <TextField
              variant='outlined'
              style={{ paddingRight: '10px' }}
              value={formData}
              onChange={this.handleChange}
              placeholder="Ask here"
            />
            <CircularProgress onClick={this.onFinished}/>
          </div>
        </Box>
      </div>
        )
    }

    


    return(
      <div>
      <AppBar position='static' style={{ backgroundColor: '#374f63' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'center', height: '85px' }}>
          <Typography variant="h2"  >
            <Box fontWeight="fontWeightBold">
              Covid-19 Q&A
          </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }} className='container'>
        <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
          <Box fontWeight="fontWeightBold">
            What are you looking for?
          </Box>
        </Typography>
        <h2 >Possible Answers</h2>
    <div><List>{this.renderList()}</List></div>
      </Box>
    </div>
      )

    
  }
}

export default App;
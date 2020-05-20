import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
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

    this.state = {
      isLoading: false,
      formData: "",
      result: ""
    };
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

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

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
        <Box style={{ backgroundColor: '#b1c6d9', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <Box fontWeight="fontWeightBold">
              What are you looking for?
            </Box>
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <TextField
              variant='outlined'
              style={{ width: '500px', background: 'white' }}
              // inputProps={{ background: 'white' }}
              value={formData}
              onChange={this.handleChange}
              placeholder="Ask here"
            />
            <Button
              style={{ backgroundColor: '#4c92ca', color: '#b1c6d9' }}
              variant="contained"
              disabled={isLoading}
              onClick={!isLoading ? this.handlePredictClick : null}>
              <SearchIcon fontSize='large' />
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
  }
}

export default App;
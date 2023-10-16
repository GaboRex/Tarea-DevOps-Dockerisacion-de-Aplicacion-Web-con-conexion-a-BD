import React, { Component } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';


class AutoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marca: '',
      modelo: '',
      openSnackbar: false,
      snackbarSeverity: 'success',
      snackbarMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { marca, modelo } = this.state;

    axios
      .post('http://localhost:5000/autos', { marca, modelo })
      .then(() => {
        this.setState({
          openSnackbar: true,
          snackbarSeverity: 'success',
          snackbarMessage: 'Tu Hotwheel fue registrado con éxito',
        });
      })
      .catch(() => {
        this.setState({
          openSnackbar: true,
          snackbarSeverity: 'error',
          snackbarMessage: 'Error al registrar tu Hotwheel',
        });
      });
  };

  handleCloseSnackbar = () => {
    this.setState({ openSnackbar: false });
  };

  render() {
    return (
      <div style={{ background: '#DAC0A3', minHeight: '100vh', padding: '20px', color: '#0F2C59' }}>
        <Container maxWidth="sm">
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Registra tu Hotwheels aquí
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                label="Marca"
                variant="outlined"
                fullWidth
                margin="normal"
                id="marca"
                name="marca"
                value={this.state.marca}
                onChange={this.handleInputChange}
              />
              <TextField
                label="Modelo"
                variant="outlined"
                fullWidth
                margin="normal"
                id="modelo"
                name="modelo"
                value={this.state.modelo}
                onChange={this.handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', backgroundColor: '#0F2C59', color: '#ffffff' }}
              >
                Enviar
              </Button>
            </form>
          </div>
        </Container>
        <Snackbar
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert
            onClose={this.handleCloseSnackbar}
            severity={this.state.snackbarSeverity}
            sx={{ width: '100%', color: '#0F2C59' }}
          >
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default AutoForm;

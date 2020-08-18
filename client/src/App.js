import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullLink: '',
      link: '',
      error: '',
    };
  }
  onchange = (e) => {
    //console.log('hh');
    this.setState({
      error: false,
    });
    this.setState({ [e.target.name]: e.target.value });
  };
  getLink = () => {
    axios
      .post('http://localhost:8080/url/shortner', {
        longUrl: this.state.fullLink,
      })
      .then((response) => {
        const data = response.data;
        this.setState({ link: data });
        console.log('Data has been received!!' + data);
      })
      .catch(() => {
        this.setState({
          error: true,
        });
      });
  };
  render() {
    const { link, error } = this.state;
    return (
      <>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-10 mx-auto'>
              <h1 className='text-center pt-5'>Url Shortner</h1>

              <div className='card mt-3'>
                <form>
                  <div className='card-body'>
                    <div className='form-group col-md-6 mx-auto mt-5'>
                      {error ? (
                        <div class='alert alert-danger' role='alert'>
                          Enter a valid URL
                        </div>
                      ) : null}
                      <input
                        required
                        type='url'
                        id='fullLink'
                        name='fullLink'
                        value={this.state.fullLink}
                        onChange={this.onchange}
                        className='form-control'
                        placeholder='Enter a URL'
                      />
                      <br />
                      <input
                        value='Short'
                        type='button'
                        id='submit'
                        onClick={this.getLink}
                        className='btn btn-success mb-4'
                        data-toggle='collapse'
                        data-target='#collapseExample'
                        aria-expanded='false'
                        aria-controls='collapseExample'
                      />
                      <br />
                      <input
                        id='linkcopy'
                        type='text'
                        value={link.shortUrl}
                        className='form-control'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;

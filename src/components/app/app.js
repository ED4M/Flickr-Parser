import React from 'react';
import './app.css';
import Post from '../post/post';
import FlickrService from '../../services/flickr_service';
import loadingIcon from '../../loader.svg';

class App extends React.Component {

    state = {
        photosData: null,
        renderForPC: true,
        loading: true
    }

    flickrService = new FlickrService();

    componentDidMount() {
        this.flickrService.getPosts()
            .then((data) => { this.setState({ photosData: data, loading: false }) });
    }

    changeView = () => {
        const rednerMode = this.state.renderForPC;
        this.setState({ renderForPC: !rednerMode })
    }

    render() {

        const { photosData, renderForPC, loading } = this.state;

        return (
            <div>
                <button
                    className='change-view-button'
                    onClick={this.changeView}>
                    PC/Mobile View
                </button>
                {loading && 
                    <img className='preloader-icon' src={loadingIcon} alt=""/>
                }
                {photosData &&
                    <Post data={photosData} renderForPC={renderForPC} />
                }
            </div>
        )
    }
}

export default App;
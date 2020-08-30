import React from 'react';
import heart_icon from '../../heart_icon.svg';
import './post-wrapper-pc.css';

const PostWrapperPC = ({ data, alertId, diffDate }) => {

    const { title, date, author, author_icon, photo_url, location, favourite_counter } = data;
    const convertedDate = diffDate(date);

    return (
        <div className='post-wrapper-pc'>
            <div className="pic-block">
                <div className='photo-img' style={{ backgroundImage: `url(${photo_url})` }}></div>
            </div>
            <div className="about-block">
                <div className="author">
                    <div className="date">
                        {convertedDate}
                                </div>
                    <div className="profile">
                        <div className="profile-icon-wrapper">
                            <img src={author_icon} height='40' alt="" />
                        </div>
                        <div className="name-location">
                            <h4 className='username'>
                                {author}
                            </h4>
                            <span className="location">
                                {location}
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="likes">
                    <img src={heart_icon}
                        height='14'
                        alt="heart_icon"
                        onClick={alertId}
                    />
                    <label>
                        {favourite_counter}
                    </label>
                </div>
                <div className="description">
                    <p>
                        {title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostWrapperPC;
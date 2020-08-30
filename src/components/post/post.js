import React from 'react';
import PostWrapperPC from '../post-wrap/post-wrapper-pc';
import PostWrapperMobile from '../post-wrap/post-wrapper-mobile';
//import './post-pc.css';

const Post = ({ data, renderForPC }) => {

    const alertId = (e) => {
        alert(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute('id'));
    }

    const renderItems = (arr, View) => {

        return arr.map(item =>
            (
                <li className="list-item"
                    key={item.id}
                    id={item.id}
                    style={{
                        marginTop: '20px'
                    }}>
                    <View data={item} alertId={alertId} diffDate={diffDate} />
                </li>
            )
        )
    }

    if (renderForPC) {
        return (
            <ul>
                {renderItems(data, PostWrapperPC)}
            </ul>
        )
    }
    else
        return (
            <ul className='flexbox-mobile'>
                {renderItems(data, PostWrapperMobile)}
            </ul>
        )
}

export default Post;


// Функция для конвертации даты в формат '4h' или '3m' или '2y' и тд
function diffDate(date) {
    let diffMin, diffHour, diffDay, diffWeek, diffMonth;
    let diffSec = (new Date() - date * 1000) / 1000;

    if (diffSec >= 60) {
        diffMin = Math.round(diffSec / 60);

        if (diffMin >= 60) {
            diffHour = Math.round(diffMin / 60);

            if (diffHour >= 24) {
                diffDay = Math.round(diffHour / 24);

                if (diffDay >= 7) {
                    diffWeek = Math.round(diffDay / 7);

                    if (diffWeek >= 4) {
                        diffMonth = Math.round(diffWeek / 4);

                        if (diffMonth >= 12) {
                            return Math.round(diffMonth / 12) + 'y';
                        }
                        else return diffMonth + 'm';
                    }
                    else return diffWeek + 'w';
                }
                else return diffDay + 'd';
            }
            else return diffHour + 'h';
        }
        else return diffMin + 'min';
    }
    else return diffSec + 'sec';

}
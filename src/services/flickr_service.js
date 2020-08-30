export default class FlickrService {

    // _api_key = '';
    _url_base = 'http://localhost:5000/';

    async getResourse(url) {
        // const result = await fetch(`${this._url_base}${url}&api_key=${this._api_key}&format=json&nojsoncallback=1`);
        const result = await fetch(`${this._url_base}${url}`);

        if (!result.ok) {
            throw Error(`FlickrService: ${url} ${result.status}`);
        }

        return await result.json();
    }

    async getPosts() {
        const hotTagUrl = 'getHotList';
        const popularTag = await this.getResourse(hotTagUrl)
            .then(result => {
                return result.hottags.tag[0]._content;
            });

        const searchUrl = `search`;
        const searchResult = await this.getResourse(searchUrl)
            .then(result => {
                return result.photos.photo});

        const photosInfo = searchResult.map(async photo => {
            const info = await this.getResourse(`getPhotoInfo?photo.id=${photo.id}`);
            const { photo: photoInfo } = info[0];

            return {
                id: photoInfo.id,
                title: photoInfo.title._content,
                date: photoInfo.dates.posted,
                author: photoInfo.owner.username,
                author_icon: this._wrapUserIconUrl(photoInfo.owner.nsid),
                photo_url: this._wrapPhotoUrl(photoInfo.farm, photoInfo.server, photoInfo.id, photoInfo.secret),
                location: photoInfo.owner.location
            }
        })

        const postsInfo = await Promise.all(photosInfo)
            .then(result => {
                return result.map(async info => {
                    const favourites = await this.getResourse(`getFavorites?photo.id=${info.id}`);
                    info.favourite_counter = favourites[0].photo.total;
                    return info;
                })
            })
            .then(result => {
                return Promise.all(result)
            });

        return postsInfo;
    }

    _wrapPhotoUrl(farm, server, id, secret) {
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
    }

    _wrapUserIconUrl(nsid) {
        //console.log(nsid);
        return `https://live.staticflickr.com/234/buddyicons/${nsid}_l.jpg`
    }
}
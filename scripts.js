let currentEpisode = 0;

url = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A152277214%2Fsounds.rss&api_key=lwamrbkkjaiwvtojg4qg11lttilb7woaa5593rg9&count=50'
$.getJSON(url, { get_param: 'value' }, function (data) {
    items = data.items;
    addEpisode(items[currentEpisode]);
});

function addEpisode(episode){
    $('.cover').empty().append('<iframe width="300px" height="300px" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + episode.guid.substr(episode.guid.length - 9) + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>');
    $('.info .name').empty().append(episode.title.split(' - ').pop());
    let parsedDate = new Date(episode.pubDate.split(' ').shift());
    $('.info .date').empty().append(parsedDate.toLocaleDateString('fi-FI', {year: 'numeric', month: 'long', day: 'numeric'}));
    $('.info .description').empty().append(episode.description);
}

function newerEpisode(){
    currentEpisode = currentEpisode == 0 ? items.length - 1 : currentEpisode - 1;
    addEpisode(items[currentEpisode]);
}

function olderEpisode(){
    currentEpisode = currentEpisode == items.length - 1 ? 0 : currentEpisode + 1;
    addEpisode(items[currentEpisode]);
}
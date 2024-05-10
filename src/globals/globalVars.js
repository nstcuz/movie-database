export const appTitle = 'Cheeseboard Cinema';
export const appStorageName = 'movies';
export const movieEndpoint = 'https://api.themoviedb.org/3/movie/';
export const movieSearch = 'https://api.themoviedb.org/3/search/movie';
export const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;

export const truncateTitle = ( title, maxLength) => {
    //Add '...' if the original overview has more words than maxLength
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
}

export const truncateOverview = ( overview, maxWords ) => {
    //Split overview into array of words
    const words = overview.split(' ');
    //Select the desired number of words
    const slicedWords = words.slice(0, maxWords);
    //Join selected words back into string
    const truncatedOverview = slicedWords.join(' ');
    //Add '...' if the original overview has more words than maxWords
    if (words.length > maxWords) {
      return truncatedOverview + '...';
    }
    return truncatedOverview;
}

export const formatRatingPercentage = ( voteAverage ) => {
    if ( voteAverage === 0 ) {
      return "NR"; //For upcoming movies that have no ratings
    }
    //Converts rating to percentage and rounds to nearest integer
    const percentage = Math.round(voteAverage * 10) + '%';
    return percentage;
}
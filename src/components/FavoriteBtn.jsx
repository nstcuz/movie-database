function FavoriteBtn({ remove, handleFavClick, movieObj }) {
    // const heartFill = isFavorited ? "#f7cd7b" : "#ffffff";

  function handleAddFav(){
    // toggleFavorite();
    handleFavClick(true, movieObj);
  }

  function handleRemoveFav(){
    // toggleFavorite();
      handleFavClick(false, movieObj);
  }

    return (
      <>
        {remove === false ?
        <button onClick={handleAddFav}>
          Add
        </button> :
        <button onClick={handleRemoveFav}>Remove</button>}
      </>
      
    );
}

FavoriteBtn.defaultProps = {
  remove: false
}
export default FavoriteBtn;
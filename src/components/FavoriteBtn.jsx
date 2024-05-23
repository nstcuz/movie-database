import React from "react";
import { useDispatch } from "react-redux";
import { addFav, deleteFav } from "../favs/favSlices";


function FavoriteBtn({ remove, movie }) {
  const dispatch = useDispatch();
  
  const handleFav = (e, type) => {

    e.preventDefault();

    if(type === "add"){
      dispatch(addFav(movie));
      console.log("Adding to favorites:");
    } else if (type === "remove"){
      dispatch(deleteFav(movie));
      console.log("Removing from favorites:");
    }
  }


  return (
         <button className="fav-heart" onClick={remove === true ? (e) => handleFav(e, 'remove'): (e) => handleFav(e, 'add')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248.69 235.93">
          <path
            fill={remove === true ? "#f7cd7b" : "#ffffff"}
            strokeWidth="0px"
            d="M180.33,1.86c-32.1,0-55.98,32.91-55.98,32.91,0,0-19.14-34.77-58.26-34.77C30.7,0,0,30.77,0,76.73c0,15.31,17.14,41.2,38.7,67.69,6.47-9.59,17.44-15.9,29.88-15.9,19.89,0,36.01,16.12,36.01,36.01,0,13.93-7.92,26.01-19.49,31.99,21.82,22.86,39.25,39.41,39.25,39.41,0,0,124.35-117.97,124.35-159.2S218.2,1.86,180.33,1.86ZM93.85,81.81c-11.09,0-20.09-8.99-20.09-20.09s8.99-20.09,20.09-20.09,20.09,8.99,20.09,20.09-8.99,20.09-20.09,20.09ZM170.75,139.84c-15.06,0-27.28-12.21-27.28-27.28s12.21-27.28,27.28-27.28,27.28,12.21,27.28,27.28-12.21,27.28-27.28,27.28Z"
          />
        </svg>
      </button>
  );
}
FavoriteBtn.defaultProps = {
  remove: false,
};
export default FavoriteBtn;

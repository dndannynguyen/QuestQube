const openUserInfo = () => {
  $("#user-info").css("display", "block");
  $("#user-favourites").css("display", "none");
  $("#user-wishlist").css("display", "none");
};

const openUserFavourites = () => {
  $("#user-info").css("display", "none");
  $("#user-favourites").css("display", "block");
  $("#user-wishlist").css("display", "none");
};

const openUserWishlist = () => {
  $("#user-info").css("display", "none");
  $("#user-favourites").css("display", "none");
  $("#user-wishlist").css("display", "block");
};

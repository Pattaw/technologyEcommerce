export function updateFavourite(itemId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.indexOf(itemId);
  if (index === -1) {
    favorites.push(itemId);
  } else {
    favorites.splice(index, 1);
  }

  // console.log(favorites);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

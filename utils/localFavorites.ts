const toggleFavorites = (id: number): void => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );
  if (favorites.includes(id)) {
    favorites = favorites.filter((item) => item !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existsInFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;
  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );
  return favorites.includes(id);
};

const pokemons = (): number[] =>
  JSON.parse(localStorage.getItem('favorites') || '[]');

export default { toggleFavorites, existsInFavorites, pokemons };

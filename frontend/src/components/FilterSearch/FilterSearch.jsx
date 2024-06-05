import { useEffect, useState } from 'react';

const sortChoices = [
  { value: 'original_title', label: 'Titre original' },
  { value: 'popularity', label: 'Popularité' },
  { value: 'revenue', label: 'Revenus' },
  { value: 'primary_release_date', label: 'Date de sortie' },
  { value: 'title', label: 'Titre' },
  { value: 'vote_average', label: 'Note moyenne' },
  { value: 'vote_count', label: 'Nombre de votes' },
];

export const FilterSearch = () => {
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    console.log('Tri par :', sortBy);
  }, [sortBy]);

  return (
    <div>
      <h2>Filtres</h2>
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {sortChoices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

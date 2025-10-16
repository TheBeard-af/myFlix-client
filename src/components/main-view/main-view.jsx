import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: "6865b300b04a147715748a72",
      Title: "Gladiator",
      Description:
        "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
      Genre: {
        Name: "Action",
        Description: "High-energy films featuring physical stunts and chases.",
      },
      Director: {
        Name: "Ridley Scott",
        Bio: "British director known for epic films and visual storytelling.",
        Birthdate: "1937-11-30T00:00:00.000Z",
        Deathdate: null,
      },
      ImagePath: "img/gladiator.jpg",
      Featured: true,
    },
    {
      id: "6865b300b04a147715748a71",
      Title: "The Matrix",
      Description:
        "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
      Genre: {
        Name: "Sci-Fi",
        Description:
          "Science fiction stories with advanced technology and imaginative settings.",
      },
      Director: {
        Name: "The Wachowskis",
        Bio: "American filmmaking duo known for groundbreaking visual effects and philosophical themes.",
        Birthdate: "1965-06-21T00:00:00.000Z",
        Deathdate: null,
      },
      ImagePath: "img/the_matrix.jpg",
      Featured: true,
    },
    {
      id: "6865b300b04a147715748a70",
      Title: "Saving Private Ryan",
      Description:
        "A group of soldiers searches for a missing paratrooper in WWII.",
      Genre: {
        Name: "Action",
        Description: "High-energy films featuring physical stunts and chases.",
      },
      Director: {
        Name: "Steven Spielberg",
        Bio: "American director known for blockbuster films and influential storytelling.",
        Birthdate: "1946-12-18T00:00:00.000Z",
        Deathdate: null,
      },
      ImagePath: "img/saving_private_ryan.jpg",
      Featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

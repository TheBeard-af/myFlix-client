import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) return;

    fetch("https://afaqmovies-50ba437af709.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies from API:", data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  // When user is not logged in
  if (!user) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center align-items-center">
          {/* Login */}
          <Col xs={12} md={5} lg={4} className="mb-4 mb-md-0">
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </Col>

          {/* Divider */}
          <Col
            xs={12}
            md="auto"
            className="d-flex justify-content-center align-items-center my-3 my-md-0"
          >
            <span className="fw-bold">or</span>
          </Col>

          {/* Signup */}
          <Col xs={12} md={5} lg={4}>
            <SignupView />
          </Col>
        </Row>
      </Container>
    );
  }

  // When viewing a single movie
  if (selectedMovie) {
    return (
      <Container className="py-4">
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </Container>
    );
  }

  // When no movies are loaded
  if (movies.length === 0) {
    return <div className="text-center py-5">The list is loading!</div>;
  }

  // When movies are loaded
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="secondary"
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </Button>
      </div>

      <Row>
        {movies.map((movie) => (
          <Col
            key={movie._id}
            xs={12}
            sm={6}
            md={3} // 4 per row from medium screens onward
            className="mb-4"
          >
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) =>
                setSelectedMovie(newSelectedMovie)
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

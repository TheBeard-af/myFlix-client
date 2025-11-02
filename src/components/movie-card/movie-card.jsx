import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";

export const MovieCard = ({
  movie,
  user,
  token,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = () => {
    if (!user || !token) return;
    onToggleFavorite(movie._id, isFavorite);
  };
  return (
    <Card className="h-100 shadow-sm">
      {/* Image fills width on top */}
      <Card.Img
        variant="top"
        src={movie.imageUrl}
        alt={movie.title}
        style={{ objectFit: "cover", height: "400px" }}
      />

      {/* Title and Info */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="mb-1">
            <strong>Genre:</strong> {movie.genre.name}
          </Card.Text>
          <Card.Text>
            <strong>Director:</strong> {movie.director.name}
          </Card.Text>
        </div>

        <div className="mt-3">
          <Row>
            <Col>
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="primary" className="w-100">
                  View Details
                </Button>
              </Link>
            </Col>
            {user && (
              <Col>
                <Button
                  variant={isFavorite ? "danger" : "outline-danger"}
                  className="w-100"
                  onClick={handleToggleFavorite}
                >
                  {isFavorite ? "♥ Remove" : "♡ Add"}
                </Button>
              </Col>
            )}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birthdate: PropTypes.string,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
};

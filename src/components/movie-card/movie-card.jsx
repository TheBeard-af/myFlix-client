import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie }) => {
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
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="primary">View Details</Button>
          </Link>
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
};

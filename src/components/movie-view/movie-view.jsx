import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Row className="g-0">
          {/* Movie Poster */}
          <Col xs={12} md={5}>
            <Card.Img
              src={movie.imageUrl}
              alt={movie.title}
              className="h-100 rounded-start"
              style={{ objectFit: "cover" }}
            />
          </Col>

          {/* Movie Details */}
          <Col xs={12} md={7}>
            <Card.Body>
              <Card.Title className="mb-3">{movie.title}</Card.Title>

              <Card.Text>
                <strong>Director:</strong> {movie.director.name}
              </Card.Text>

              <Card.Text>
                <strong>Genre:</strong> {movie.genre.name}
              </Card.Text>

              <Card.Text>
                <strong>Description:</strong> {movie.description}
              </Card.Text>

              <div className="mt-4">
                <Button variant="primary" onClick={onBackClick}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};

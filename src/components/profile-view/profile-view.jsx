import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateData = {};
    if (username !== userInfo.Username) updateData.Username = username;
    if (password) updateData.Password = password;
    if (email !== userInfo.Email) updateData.Email = email;
    if (
      birthday !== (userInfo.Birthday ? userInfo.Birthday.substring(0, 10) : "")
    ) {
      updateData.Birthday = birthday;
    }

    // Only send update if there are changes
    if (Object.keys(updateData).length === 0) {
      alert("No changes detected");
      return;
    }

    fetch(
      `https://afaqmovies-50ba437af709.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log("Profile updated:", updatedUser);
        setUserInfo(updatedUser);
        setPassword(""); // Clear password field
        if (updatedUser.Username !== user.Username) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          alert("Username updated! Please refresh the page to see changes.");
        } else {
          alert("Profile updated successfully!");
        }
        alert("Profile updated successfully!");
      })
      // ← ADD THIS: Update localStorage if username changed

      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Error updating profile");
      });
  };
  const handleDelete = () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    fetch(
      `https://afaqmovies-50ba437af709.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // DELETE returns text, not JSON
      })
      .then((message) => {
        console.log("Account deleted:", message);
        alert("Account deleted successfully!");
        // Clear user data and redirect to login
        localStorage.clear();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
        alert("Error deleting account");
      });
  };
  const handleToggleFavorite = (movieId, isFavorite) => {
    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://afaqmovies-50ba437af709.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedUser) => {
        console.log("Favorites updated:", updatedUser.FavoriteMovies);
        setUserInfo(updatedUser); // Update local user info
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        console.error("Error updating favorites:", error);
        alert("Error updating favorites");
      });
  };
  // Fetch user data when component loads
  useEffect(() => {
    if (!user || !token) return;

    fetch(
      `https://afaqmovies-50ba437af709.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((userData) => {
        // ← Changed from 'users' to 'userData'
        console.log("User data from API:", userData);
        setUserInfo(userData); // ← Direct assignment, no .find() needed

        // Pre-fill form fields
        if (userData) {
          setUsername(userData.Username);
          setEmail(userData.Email);
          setBirthday(
            userData.Birthday ? userData.Birthday.substring(0, 10) : ""
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user, token]);

  if (!userInfo) {
    return <div className="text-center py-5">Loading profile...</div>;
  }

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h4>Profile Information</h4>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Username:</strong> {userInfo.Username}
              </p>
              <p>
                <strong>Email:</strong> {userInfo.Email}
              </p>
              <p>
                <strong>Birthday:</strong>{" "}
                {userInfo.Birthday
                  ? new Date(userInfo.Birthday).toLocaleDateString()
                  : "Not set"}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <h4>Update Profile</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" className="me-2" type="submit">
                  Update Profile
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>My Favorite Movies</h4>
            </Card.Header>
            <Card.Body>
              {userInfo.FavoriteMovies && userInfo.FavoriteMovies.length > 0 ? (
                <Row>
                  {userInfo.FavoriteMovies.map((movieId) => {
                    const movie = movies.find((m) => m._id === movieId);
                    if (!movie) return null;

                    return (
                      <Col
                        key={movieId}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-3"
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          token={token}
                          isFavorite={true} // Always true in favorites section
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <p>
                  No favorite movies yet. Add some from the main movie list!
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

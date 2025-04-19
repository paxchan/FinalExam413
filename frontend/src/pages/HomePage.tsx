import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchEntertainers } from "../api/EntertainersAPI";
import { Entertainer } from "../types/Entertainer";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopAppBar from "../components/TopAppBar"; // adjust path as needed

const HomePage = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEntertainers = async () => {
      try {
        const data = await fetchEntertainers();
        setEntertainers(data);
      } catch (err) {
        console.error("Failed to load entertainers:", err);
      }
    };

    loadEntertainers();
  }, []);

  return (
    <div className="home-wrapper">
      <TopAppBar />
      <Container className="py-5">
        <h2 className="mb-5 text-center">Available Entertainers</h2>
        <Row className="gx-4 gy-4">
          {entertainers.map((entertainer) => (
            <Col key={entertainer.entertainerId} xs={12} sm={6} md={4}>
              <Card className="entertainer-card h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>
                      {entertainer.entStageName || "(No Stage Name)"}
                    </Card.Title>
                    <Card.Text>
                      <strong>Bookings:</strong>{" "}
                      {entertainer.bookingCount ?? "TBD"}
                      <br />
                      <strong>Last Booked:</strong>{" "}
                      {entertainer.lastBookingDate
                        ? new Date(
                            entertainer.lastBookingDate
                          ).toLocaleDateString()
                        : "TBD"}
                    </Card.Text>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate(`/entertainers/${entertainer.entertainerId}`)
                    }
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Button
            variant="success"
            size="lg"
            onClick={() => navigate("/entertainers/add")}
          >
            Add Entertainer
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;

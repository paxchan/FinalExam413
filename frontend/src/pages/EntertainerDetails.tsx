import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Entertainer } from "../types/Entertainer";
import API_URL from "../api/EntertainersAPI";
import {
  Button,
  Container,
  Card,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import TopAppBar from "../components/TopAppBar";
import "./EntertainerDetails.css";

const EntertainerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntertainer = async () => {
      try {
        const response = await fetch(`${API_URL}/entertainers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch entertainer");
        }
        const data = await response.json();
        setEntertainer(data);
      } catch (error) {
        console.error("Error fetching entertainer:", error);
      }
    };

    fetchEntertainer();
  }, [id]);

  if (!entertainer) return <p className="loading">Loading...</p>;

  return (
    <div className="details-wrapper">
      <TopAppBar />
      <Container className="py-5">
        <Card className="entertainer-details-card">
          <Card.Body>
            <h2 className="mb-4">{entertainer.entStageName}</h2>
            <p>
              <strong>SSN:</strong> {entertainer.entSsn}
            </p>
            <p>
              <strong>Address:</strong> {entertainer.entStreetAddress},{" "}
              {entertainer.entCity}, {entertainer.entState}{" "}
              {entertainer.entZipCode}
            </p>
            <p>
              <strong>Phone:</strong> {entertainer.entPhoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {entertainer.entEmailAddress}
            </p>
            <p>
              <strong>Web Page:</strong>{" "}
              <a href={entertainer.entWebPage} target="_blank" rel="noreferrer">
                {entertainer.entWebPage}
              </a>
            </p>
            <p>
              <strong>Date Entered:</strong>{" "}
              {new Date(entertainer.dateEntered).toLocaleDateString()}
            </p>
            <p>
              <strong>Bookings:</strong> {entertainer.bookingCount}
            </p>
            <p>
              <strong>Last Booked:</strong>{" "}
              {entertainer.lastBookingDate
                ? new Date(entertainer.lastBookingDate).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="mt-4 text-center d-flex justify-content-center gap-3 flex-wrap">
              <Button variant="secondary" onClick={() => navigate("/home")}>
                Back to List
              </Button>

              <Button
                variant="warning"
                onClick={() =>
                  navigate(`/entertainers/edit/${entertainer.entertainerId}`)
                }
              >
                Edit
              </Button>

              <Button variant="danger" onClick={() => setShowModal(true)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete{" "}
          <strong>{entertainer.entStageName}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              try {
                const response = await fetch(
                  `${API_URL}/delete/${entertainer.entertainerId}`,
                  { method: "DELETE" }
                );

                if (!response.ok) {
                  throw new Error("Delete failed");
                }

                setShowModal(false);
                setShowToast(true);

                setTimeout(() => {
                  navigate("/home");
                }, 2500); // Slight delay so the user sees the toast
              } catch (err) {
                alert("Failed to delete entertainer.");
                console.error(err);
              }
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Deleted</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Entertainer was successfully deleted.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default EntertainerDetails;

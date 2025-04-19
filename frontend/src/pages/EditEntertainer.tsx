import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Entertainer } from "../types/Entertainer";
import API_URL, { updateEntertainer } from "../api/EntertainersAPI";
import { Button, Container, Form, Card } from "react-bootstrap";
import TopAppBar from "../components/TopAppBar";
import "./AddEntertainer.css"; // reuse styles

const EditEntertainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Entertainer> | null>(null);
  const [loading, setLoading] = useState(true);

  // Load entertainer details
  useEffect(() => {
    const loadEntertainer = async () => {
      try {
        const response = await fetch(`${API_URL}/entertainers/${id}`);
        if (!response.ok) throw new Error("Failed to load entertainer");

        const data = await response.json();
        setForm({
          ...data,
          dateEntered: data.dateEntered?.split("T")[0] || "", // format if ISO string
        });
      } catch (err) {
        alert("Error loading entertainer.");
      } finally {
        setLoading(false);
      }
    };

    loadEntertainer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!form) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !id) return;

    try {
      const updated = await updateEntertainer(Number(id), form as Entertainer);
      navigate(`/entertainers/${updated.entertainerId}`);
    } catch (err) {
      alert("Failed to update entertainer.");
    }
  };

  if (loading || !form) return <p className="loading">Loading...</p>;

  return (
    <div className="add-wrapper">
      <TopAppBar />
      <Container className="py-5">
        <Card className="add-form-card">
          <Card.Body>
            <h2 className="mb-4">Edit Entertainer</h2>
            <Form onSubmit={handleSubmit}>
              {[
                { label: "Stage Name", name: "entStageName" },
                { label: "SSN", name: "entSsn" },
                { label: "Street Address", name: "entStreetAddress" },
                { label: "City", name: "entCity" },
                { label: "State", name: "entState" },
                { label: "Zip Code", name: "entZipCode" },
                { label: "Phone Number", name: "entPhoneNumber" },
                { label: "Web Page", name: "entWebPage" },
                { label: "Email Address", name: "entEmailAddress" },
                { label: "Date Entered", name: "dateEntered", type: "date" },
              ].map(({ label, name, type = "text" }) => (
                <Form.Group className="mb-3" key={name}>
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type={type}
                    name={name}
                    value={form[name as keyof Entertainer] || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              ))}

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => navigate("/main")}>
                  Cancel
                </Button>
                <Button type="submit" variant="warning">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditEntertainer;

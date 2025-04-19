import { Entertainer } from "../types/Entertainer";

const API_URL =
  "https://entertainers-paxman-backend-dffeang0a6emhxax.eastus-01.azurewebsites.net/Entertainment"; // adjust if deployed

// ✅ Fetch all entertainers
export const fetchEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(`${API_URL}/entertainers`);

    if (!response.ok) {
      throw new Error("Failed to fetch entertainers");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainers:", error);
    throw error;
  }
};

// ✅ Add a new entertainer
export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntertainer),
    });

    if (!response.ok) {
      throw new Error("Failed to add entertainer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding entertainer:", error);
    throw error;
  }
};

// ✅ Update an entertainer
export const updateEntertainer = async (
  id: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEntertainer),
    });

    if (!response.ok) {
      throw new Error("Failed to update entertainer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating entertainer:", error);
    throw error;
  }
};

// ✅ Delete an entertainer
export const deleteEntertainer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete entertainer");
    }
  } catch (error) {
    console.error("Error deleting entertainer:", error);
    throw error;
  }
};

export default API_URL;

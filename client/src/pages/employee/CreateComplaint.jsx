import { useState } from "react";

import EmployeeLayout from "../../layouts/EmployeeLayout";

import { createComplaint } from "../../services/complaintService";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function CreateComplaint() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createComplaint({
        title,
        description,
      });

      console.log(response);

      toast.success("Complaint submitted successfully");

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);

      alert("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">Create Complaint</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border max-w-3xl"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>

          <Input
            placeholder="Complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Description</label>

          <Textarea
            rows={6}
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </EmployeeLayout>
  );
}

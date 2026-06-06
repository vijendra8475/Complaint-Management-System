import { useState } from "react";
import toast from "react-hot-toast";

import EmployeeLayout from "@/layouts/EmployeeLayout";

import {
  createComplaint,
} from "@/services/complaintService";

export default function CreateComplaint() {
  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createComplaint({
          title,
          description,
        });

        toast.success(
          "Complaint submitted"
        );

        setTitle("");
        setDescription("");

      } catch {
        toast.error(
          "Submission failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <EmployeeLayout>

      <h1 className="text-3xl font-bold mb-6">
        Create Complaint
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white p-6 rounded-xl border max-w-3xl"
      >
        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Complaint title"
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Describe issue"
          className="w-full border p-3 rounded mb-4"
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Submitting..."
            : "Submit"}
        </button>
      </form>

    </EmployeeLayout>
  );
}
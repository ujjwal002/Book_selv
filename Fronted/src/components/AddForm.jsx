import React, { useState } from "react";
import axios from "axios";

const AddContentForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    chapterName: "",
    heading: "",
    description: "",
    title: "",
    paragraphs: [""],
    subParagraphs: [[]],
  });

  const handleAddPara = () => {
    const newParas = [...formData.paragraphs, ""];
    const newSubParas = [...formData.subParagraphs, [""]];
    setFormData({
      ...formData,
      paragraphs: newParas,
      subParagraphs: newSubParas,
    });
  };

  const handleAddSubPara = (paraIndex) => {
    const newSubParas = [...formData.subParagraphs];
    newSubParas[paraIndex] = [...newSubParas[paraIndex], ""];
    setFormData({ ...formData, subParagraphs: newSubParas });
  };

  const handleDeleteSubPara = (paraIndex, subParaIndex) => {
    const newSubParas = [...formData.subParagraphs];
    newSubParas[paraIndex].splice(subParaIndex, 1);
    setFormData({ ...formData, subParagraphs: newSubParas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Save the group
      const groupResponse = await axios.post("/api/groups", {
        name: formData.groupName,
      });
      const groupId = groupResponse.data.id; // Retrieve the ID of the saved group

      // Step 2: Save the chapter with the associated group ID
      const chapterResponse = await axios.post("/api/chapters", {
        name: formData.chapterName,
        groupId: groupId,
      });
      const chapterId = chapterResponse.data.id; // Retrieve the ID of the saved chapter

      // Step 3: Save the content with the associated chapter ID
      await axios.post("/api/contents", {
        chapterId: chapterId,
        heading: formData.heading,
        description: formData.description,
        title: formData.title,
        paragraphs: formData.paragraphs,
        subParagraphs: formData.subParagraphs,
      });

      // Optional: Clear the form after successful submission
      setFormData({
        groupName: "",
        chapterName: "",
        heading: "",
        description: "",
        title: "",
        paragraphs: [""],
        subParagraphs: [[]],
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          textDecoration: "underline",
          color: "rgb(186, 55, 42)",
        }}
      >
        <strong
          style={{
            fontFamily: "Nirmala UI Semilight",
            fontSize: "18px",
            color: "rgb(14, 137, 203)",
          }}
        >
          Your Form Heading
        </strong>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={formData.groupName}
            onChange={(e) =>
              setFormData({ ...formData, groupName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Chapter Name:</label>
          <input
            type="text"
            value={formData.chapterName}
            onChange={(e) =>
              setFormData({ ...formData, chapterName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Heading:</label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) =>
              setFormData({ ...formData, heading: e.target.value })
            }
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{ width: "100%", minHeight: "100px", marginBottom: "5px" }}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label>Paragraphs:</label>
          {formData.paragraphs.map((paragraph, paraIndex) => (
            <div key={paraIndex}>
              <textarea
                value={paragraph}
                onChange={(e) => {
                  const newParas = [...formData.paragraphs];
                  newParas[paraIndex] = e.target.value;
                  setFormData({ ...formData, paragraphs: newParas });
                }}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  marginBottom: "5px",
                }}
              />
              <div>
                <label>Sub-Paragraphs:</label>
                {formData.subParagraphs[paraIndex].map(
                  (subPara, subParaIndex) => (
                    <div key={subParaIndex}>
                      <input
                        type="text"
                        value={subPara}
                        onChange={(e) => {
                          const newSubParas = [...formData.subParagraphs];
                          newSubParas[paraIndex][subParaIndex] = e.target.value;
                          setFormData({
                            ...formData,
                            subParagraphs: newSubParas,
                          });
                        }}
                        style={{ marginBottom: "5px" }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteSubPara(paraIndex, subParaIndex)
                        }
                      >
                        Delete Sub-Para
                      </button>
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => handleAddSubPara(paraIndex)}
                >
                  Add Sub-Para
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddPara}>
          Add Para
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddContentForm;

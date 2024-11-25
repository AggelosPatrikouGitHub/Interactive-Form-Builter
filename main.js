const formBuilder = document.getElementById("form-builder");
const formPreview = document.getElementById("form-preview");

const addField = (type) => {
  const fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add("field");

  let field;
  switch (type) {
    case "text":
      field = `<label>Text Field: <input type="text" placeholder="Enter text"></label>`;
      break;
    case "textarea":
      field = `<label>Textarea: <textarea placeholder="Enter details"></textarea></label>`;
      break;
    case "checkbox":
      field = `<label><input type="checkbox"> Checkbox</label>`;
      break;
    case "radio":
      field = `<label><input type="radio" name="radio-group"> Radio Button</label>`;
      break;
    case "dropdown":
      field = `
        <label>
          Dropdown: 
          <select>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
        </label>
      `;
      break;
    default:
      return;
  }

  fieldWrapper.innerHTML = field + `<button onclick="removeField(this)">Remove</button>`;
  formBuilder.appendChild(fieldWrapper);
  updatePreview();
};
const removeField = (button) => {
    button.parentElement.remove();
    updatePreview();
  };

  const updatePreview = () => {
    formPreview.innerHTML = formBuilder.innerHTML.replace(/Remove/g, "");
  };

  const exportData = () => {
    const formData = new FormData(formPreview);
    const entries = Array.from(formData.entries());
    const csv = entries.map(([key, value]) => `${key},${value}`).join("\n");
  
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form-data.csv";
    link.click();
  };
  
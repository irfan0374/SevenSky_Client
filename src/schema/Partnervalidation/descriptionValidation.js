import * as yup from "yup";

export const descriptionValidation = yup.object().shape({

  state: yup
    .string()
    .test("notOnlySpaces", " State is required", (value) => {
      return value.trim() !== "";
    })
    .required("State is required"),
  location: yup
    .string()
    .test("notOnlySpaces", "Location is required", (value) => {
      return value.trim() !== "";
    })
    .required("Location is required"),
  description: yup
    .string()
    .test("notOnlySpaces", "Description is required", (value) => {
      return value.trim() !== "";
    })
    .required("Description is required"),
  

});
import * as yup from "yup";

export const propertyValidationSchema = yup.object().shape({

  name: yup
    .string()
    .test("notOnlySpaces", "Car name is required", (value) => {
      return value.trim() !== "";
    })
    .required("Car name is required"),
  price: yup
    .number("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  price: yup
    .number("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  city: yup
    .string()
    .test("notOnlySpaces", "Cityis required", (value) => {
      return value.trim() !== "";
    })
    .required("city is required"),
  state: yup
    .string()
    .test("notOnlySpaces", "please check the state", (value) => {
      return value.trim() !== "";
    })
    .required("state is required"),

    bhk: yup
    .string()
    .oneOf(["1rk", "1bhk", "2bhk", "3bhk", "4bhk"], "Please select the number of bedrooms")
    .required("Please select the number of bedrooms"),

  fuelType: yup.string().required("Fuel type is required"),
  transitionType: yup.string().required("Transition type is required"),
  modelType: yup.string().required("Model is required"),
});
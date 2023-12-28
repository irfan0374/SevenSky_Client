import * as yup from "yup";

export const dateLocationFilter = yup.object().shape({
    propertytype: yup
    .date()
    .required("Select your purpose")
    .required("Required"),
    propertfor: yup
   
    .required("Select Property type required")
    .required("Required"),
});
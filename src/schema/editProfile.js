import * as yup from 'yup'

export const editProfile=yup.object().shape({
    name: yup.string().label("Enter the Name").test('whitespace', 'Name cannot be whitespace only', (value) => {
        if (value) {
          return !(/^\s+$/.test(value));
        }
        return true; 
      })  .required("Required"),
    phone:yup.number().positive().integer().required("Required"),
})
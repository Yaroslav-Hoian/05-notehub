import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { NoteModalProps } from "../Modal/Modal";

interface NoteFormValuesProps {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValuesProps = {
  title: "",
  content: "",
  tag: "",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 2 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content is too long")
    .required("Content is required"),
  tag: Yup.string().required("Please choose your tag"),
});

const NoteForm = ({ onClose }: NoteModalProps) => {
  const handleSubmit = (
    values: NoteFormValuesProps,
    actions: FormikHelpers<NoteFormValuesProps>
  ) => {
    onClose();
    console.log(values);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value=""></option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;

import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import reducer from '../store';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import Attachment from './Attachment';
import { saveContact } from '../store/contactUsSlice';
import ValidationException from '../ValidationException';
import { useState } from 'react';


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  email: yup.string().email().required('You must enter a email'),
  message: yup.string().required('You must enter a message'),
  file: yup.mixed().required('You must upload a file'),
});
const contactModel = {
  name: null,
  email: null,
  message: null,
  file: null
}

function ContactForm(props) {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState(null);

  const { control, watch, reset, handleSubmit, formState, getValues, setValue, setError } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  function handleRemove() {
    setValue('file', null, {
      shouldValidate: true,
      shouldDirty: true
    });
  }

  function handleShowError(errorDetails) {
    for(let key of _.keys(errorDetails)) {
      const constraintError = errorDetails[key];
      setError(key, {
        type: 'manual',
        message: constraintError[0]
      })
    }
  }

  function displayErrors(data) {

    setFormErrors(data.message);

    //Validation error
    if(data?.errors) {
      handleShowError(data.errors);
    }
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    setFormErrors(null);
    dispatch(saveContact(data)).then((response) => {
      if(response?.payload?.errors) {
        displayErrors(response.payload.errors);
      } else {
        reset({ ...contactModel });
      }
    });
  }

  return (
    <FusePageSimple
      content={
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-640 relative items-center px-24 sm:px-48">
            <Box className="relative w-full items-center">
              <div className="flex items-center justify-between border-b-1 w-full py-24 mt-16 mb-16">
                <span>Contact Us</span>
              </div>
            </Box>

            <div className="flex w-full flex-col relative flex flex-col items-center">

              {formErrors && <ValidationException errors={formErrors} ></ValidationException>}

              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    className="mt-32 max-h-auto"
                    {...field}
                    value={field.value || ''}
                    label="name"
                    placeholder="Name"
                    id="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    className="mt-32 max-h-auto"
                    {...field}
                    value={field.value || ''}
                    label="email"
                    placeholder="Email"
                    id="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

            <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <TextField
                    className="mt-32 max-h-auto"
                    {...field}
                    value={field.value || ''}
                    label="message"
                    placeholder="Message"
                    id="message"
                    multiline
                    minRows={3}
                    maxRows={10}
                    error={!!errors.message}
                    helperText={errors?.message?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

        <Controller
          name="file"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Box
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
                component="label"
                htmlFor="button-file"
                className="flex items-center justify-center relative w-full h-60 rounded-16 mx-12 mb-24 mt-32 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              >
                <input
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={async (e) => {
                    function readFileAsync() {
                      return new Promise((resolve, reject) => {
                        const file = e.target.files[0];
                        resolve(file);
                      });
                    }

                    const newImage = await readFileAsync();
                    e.target.value = null;
                    onChange(newImage);
                  }}
                />
                <FuseSvgIcon size={32} color="action">
                  heroicons-outline:upload
                </FuseSvgIcon>
                File
              </Box>
              {value && <div className="pt-8 w-full">
                <Attachment file={value} onRemove={handleRemove} />
              </div>}
            </>
          )}
          />
              
            </div>

            <Box
              className="w-full flex flex-col items-right mt-40 flex flex-col py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
              sx={{ backgroundColor: 'background.default' }}
            >
              <Button
                className="ml-8"
                variant="contained"
                color="secondary"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Box>
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default withReducer('contactUsApp', reducer)(ContactForm);

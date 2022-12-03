



import { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Hamburger from 'hamburger-react'
import { yupResolver } from '@hookform/resolvers/yup';

import { Navigation } from '../../components/nav/Navigation';
interface IFormInputs {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  region: string
  profession: string
  company: string
  jobDescription: string
  message: string
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email().required('Email is required'),
  phoneNumber: yup.string().matches(phoneRegExp, 'The phone number is not valid'),
  profession: yup.string().required('Please enter your profession'),
  company: yup.string(),
  jobDescription: yup.string(),
  message: yup.string().required('Please complete this required field'),
}).required();

const ContactPage = () => {
  const [isOpen, setOpen] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <>
      <div>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      {isOpen && <Navigation />}
      <h1>Contact</h1>       
      <p>Send us a message!</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='first-name'>
          First name
          <input id='first-name'{...register("firstName")} />
        </label>
        <p>{errors.firstName?.message}</p>

        <label htmlFor='last-name'>
          Last name
          <input id='last-name'{...register("lastName")} />
        </label>
        <p>{errors.lastName?.message}</p>

        <label htmlFor='email'>
          Email
          <input id='email'{...register("email")} />
        </label>
        <p>{errors.email?.message}</p>

        <label htmlFor='phone'>
          Phone /  Mobile
          <input id='phone'{...register("phoneNumber")} />
        </label>
        <p>{errors.phoneNumber?.message}</p>

        <label htmlFor='region'>
          Country / Region
          <input id='region'{...register("region")} />
        </label>

        <label htmlFor='profession'>
          Your profession
          <input id='profession'{...register("profession")} />
        </label>
        <p>{errors.profession?.message}</p>

        <label htmlFor='company'>
          Company
          <input id='first-name'{...register("company")} />
        </label>

        <label htmlFor='job-description'>
          Job Description
          <input id='job-description'{...register("jobDescription")} />
        </label>

        <label htmlFor='message'>
          Message
          <textarea id='message'{...register("message")} />
        </label>
        <p>{errors.firstName?.message}</p>

        <input type="submit" />
      </form>
    </>
  );
}

export default ContactPage;

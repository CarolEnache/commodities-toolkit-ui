import { useState } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Hamburger from 'hamburger-react'
import { yupResolver } from '@hookform/resolvers/yup';

import { Navigation } from '../../components/nav/Navigation';

import styles from './Contact.module.css'

import * as globalStyles from '../../styles/Home.module.css'

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
  const [isSubmitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => {
    setSubmitted(true)
    console.log(data)
  };

  
  return (
    // @ts-ignore
    <div className={globalStyles.container}>
      {/* @ts-ignore */}
      <main className={globalStyles.main}>

        {!isSubmitted ? <>
          <div>
            <Hamburger color='#012d49' toggled={isOpen} toggle={setOpen} />
          </div>
          {isOpen && <Navigation />}
          <h1 className={styles.pageTitle}>Contact us</h1>       
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className={styles.formField} htmlFor='first-name'>
              First name <span className={styles.required}>*</span>
              <input id='first-name'{...register("firstName")} />
            </label>
            { errors.firstName && <p className={styles.error}>{errors.firstName?.message}</p>}

            <label className={styles.formField} htmlFor='last-name'>
              Last name  <span className={styles.required}>*</span>
              <input id='last-name'{...register("lastName")} />
            </label>
            {errors.lastName && <p className={styles.error}>{errors.lastName?.message}</p>}

            <label className={styles.formField} htmlFor='email'>
              Email  <span className={styles.required}>*</span>
              <input id='email'{...register("email")} />
            </label>
            { errors.email && <p className={styles.error}>{errors.email?.message}</p>}

            <label className={styles.formField} htmlFor='phone'>
              Phone /  Mobile
              <input id='phone'{...register("phoneNumber")} />
            </label>
            {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber?.message}</p>}

            <label className={styles.formField} htmlFor='region'>
              Country / Region
              <input id='region'{...register("region")} />
            </label>

            <label className={styles.formField} htmlFor='profession'>
              Your profession  <span className={styles.required}>*</span>
              <input id='profession'{...register("profession")} />
            </label>
            {errors.profession && <p className={styles.error}>{errors.profession?.message}</p>}

            <label className={styles.formField} htmlFor='company'>
              Company
              <input id='first-name'{...register("company")} />
            </label>

            <label className={styles.formField} htmlFor='job-description'>
              Job Description
              <input id='job-description'{...register("jobDescription")} />
            </label>

            <label className={styles.formField} htmlFor='message'>
              Message  <span className={styles.required}>*</span>
              <textarea id='message'{...register("message")} />
            </label>
            { errors.message && <p className={styles.error}>{errors.message?.message}</p>}

            <input type="submit" className={styles.submitButton} />
          </form>
        </> : <h1>Thank you</h1>}
      </main>
    </div>
  );
}

export default ContactPage;

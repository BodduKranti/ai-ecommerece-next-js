'use client'

import { Form, Formik } from 'formik'
import React from 'react'
import { LoginformValidation } from '../../Validation/FormValidation'
import FieldsComponent from '../Fields/FieldsComponent'
import CommonBtns from '../Buttons/CommonBtns'
import { RotateCcwKey, UserRound, Eye, EyeOff, KeyRound } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ErrorToastMessage } from '../../types'

interface initialValues {
    username: string,
    password: string
}

const LoginForm = () => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [loader, setLoader] = React.useState<boolean>(false)
    const router = useRouter()
    const initialValues: initialValues = {
        username: '',
        password: ''
    }

    const handleSubmit = async (values: initialValues) => {
        console.log(values)
        setLoader(true)
        const result = await signIn('credentials', {
            redirect: false,
            username: values.username,
            password: values.password,
            // loginURL: buildURL('/admin/api'),
        })

        // {
        //     "error": null,
        //         "status": 200,
        //             "ok": true,
        //                 "url": "http://localhost:3000"
        // }
        console.log('result', result)
        if (!result?.error) {
            return setTimeout(() => {
                setLoader(false)
                router.push(`/products`)
            }, 2000)
        } else {
            toast.error(ErrorToastMessage.loginFailed)
            setLoader(false)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginformValidation}
            onSubmit={handleSubmit}
        >

            {() => {
                return (
                    <Form className='space-y-3'>
                        <div>
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <div className="mt-2 input-group">
                                <FieldsComponent
                                    name='username'
                                    placeholder='Username'
                                    type='text'
                                    paddingTopBottom='md'
                                    paddingLeftRight='md'
                                    icon='Yes'
                                    iconPosition='left'
                                    iconname={<UserRound className='w-5 h-5' />}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2 relative input-group">
                                <FieldsComponent
                                    name='password'
                                    placeholder='Password'
                                    type={showPassword ? 'text' : 'password'}
                                    paddingTopBottom='md'
                                    paddingLeftRight='md'
                                    icon='Yes'
                                    iconPosition='left'
                                    iconname={<RotateCcwKey className='w-5 h-5' />}
                                />
                                <div className='w-[10px] absolute top-[14px]  right-5 cursor-pointer text-[#2993d2]'>
                                    {
                                        showPassword ?
                                            <Eye className='w-5 h-5' onClick={() => setShowPassword(false)} /> :
                                            <EyeOff className='w-5 h-5' onClick={() => setShowPassword(true)} />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <CommonBtns
                                className={'w-full'}
                                type='submit'
                                btnText={loader ? <div className="loader h-5"></div> : 'Sign in'}
                                btnIconSide='left'
                                btnIcon={loader ? '' : <KeyRound className='w-5 h-5' />
                                    // <IoIosSave className='w-5 h-5' />
                                }
                                buttonType='btn-primary'
                            />

                            {/* <Buttons
                            type='submit'
                            btnText={loader ? <span className="loader"></span> : 'Sign in'}
                            btnColor={'blue'}
                            fontSize={'sm'}
                            outline='no'
                        /> */}
                        </div>
                    </Form>
                )
            }}

        </Formik>
    )
}

export default LoginForm

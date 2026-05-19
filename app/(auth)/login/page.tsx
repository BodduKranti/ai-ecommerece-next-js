import LoginForm from '@/app/src/components/Form/LoginForm'

const page = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className='text-center w-full mb-4'>
                <h2 className='login-card__title my-1' data-testid='login-title'>Login Home</h2>
                <p className="login-card__subtitle text-muted mb-0">Sign in to manage your ballots</p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />


                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    )
}

export default page

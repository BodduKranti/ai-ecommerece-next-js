interface NoRecordsProps {
    Message: string
}

const NoRecords = ({ Message }: NoRecordsProps) => {
    return (
        <div className='w-full h-37.5 flex justify-center items-center'>
            <p>{Message}</p>
        </div>
    )
}

export default NoRecords

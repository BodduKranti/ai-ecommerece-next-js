interface SubtitleProps {
    title: string
}

const Subtitle = ({ title }: SubtitleProps) => {
    return (
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    )
}

export default Subtitle

export type AgendaProps = {

    id: number,
    title: string,
    description: string,
    status: boolean,
    date: Date,
    time: Date
}

export type TextAreaProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

export type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;
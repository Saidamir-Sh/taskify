import clsx from "clsx";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

type FormData = Record<string, unknown>;

interface FormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export const Form = <T extends FormData>({ onSubmit, children, className, id, ...rest }: FormProps<T>): JSX.Element => {
    const { handleSubmit } = useForm<T>({...rest});
    
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("", className)}
            id={id}
            {...rest}
        >
            {children}
        </form>
    )
}
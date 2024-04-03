import { useState } from "react";
import { Input } from "../Input";
// import { InputProps } from "../Input/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AutoCompleteProps {
	id: string;
	options: (any[] | string[]);
	placeholder: string;
	// renderInput: (props: InputProps) => React.ReactNode;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ id, options, placeholder }) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
	const [filteredOptions, setFilteredOption] = useState<(any[] | string[])>([])
	const [selectedValue, setSelectedValue] = useState<string>("")
	
	const handleInputClick = () => {
		setIsDropDownOpen((prevState) => !prevState)
	}

	return (
		<div className="w-full">
			<Input
				id={id}
				type="text"
				inputName={id}
				placeholder={placeholder}
				onClick={handleInputClick}
				onChange={(e) => console.log(e.target.value)}   
			/>
			{
				isDropDownOpen && 
				<ul className="border bg-grey overflow-auto flex py-2 px-2 flex-col gap-2">
				{
					options.map(option => (
						<li className="cursor-pointer">{option}</li>
					))
				}
			</ul> 
			}
		</div>
	)
}


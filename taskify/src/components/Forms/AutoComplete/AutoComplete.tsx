import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../Input";
// import { InputProps } from "../Input/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AutoCompleteProps {
	id: string;
	options: (any[] | string[]); // TODO: stric check
	placeholder: string;
	// renderInput: (props: InputProps) => React.ReactNode;
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ id, options, placeholder }) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
	const [filteredOptions, setFilteredOption] = useState<(any[] | string[])>(options)
	const [searchQuery, setSearchQuery] = useState<string>("")

	const dropDownRef = useRef<HTMLUListElement>(null)

	const handleInputClick = () => {
		setIsDropDownOpen(prevState => !prevState);
	}

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	}

	const handleOptionClick = (option: string | any) => {
		setIsDropDownOpen(false);
		setSearchQuery(option);
	}

	const closeDropDownOnClick = (e: MouseEvent) => {
		if(!dropDownRef.current?.contains(e.target as Node)) {
			setIsDropDownOpen(false);
		}
	}

	useEffect(() => {
		const filtered = options.filter(option =>
			option.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredOption(filtered); // TODO: debounce the value
	}, [options, searchQuery]);

	useEffect(() => {
		document.addEventListener('mousedown', closeDropDownOnClick);
		return () => {
			document.removeEventListener('mousedown', closeDropDownOnClick)
		}
	});

	return (
		// TODO: better css, better design
		<div className="w-full">
			<Input
				id={id}
				type="text"
				inputName={id}
				placeholder={placeholder}
				value={searchQuery}
				onClick={handleInputClick}
				onChange={handleOnChange}
			/>
			{
				isDropDownOpen && 
				<ul ref={dropDownRef} className="border bg-grey overflow-auto flex py-2 px-2 flex-col gap-2">
				{
					filteredOptions.map((option, index) => (
						<li
							key={index}
							onClick={() => handleOptionClick(option)}
							className="cursor-pointer"
						>{option}</li>
					))
				}
			</ul> 
			}
		</div>
	)
}


import { IconType } from "..";

const SearchIcon = ({ color }: IconType) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6668 20.6666L15.6668 15.6666L20.6668 20.6666ZM1.33343 9.66665C1.33343 5.06427 5.06439 1.33331 9.66676 1.33331C14.2692 1.33331 18.0001 5.06427 18.0001 9.66665C18.0001 14.269 14.2692 18 9.66676 18C5.06439 18 1.33343 14.269 1.33343 9.66665Z"
        stroke={color || "inherit"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;

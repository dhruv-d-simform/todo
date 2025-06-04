export function TickIcon({ style }: { style?: React.CSSProperties }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            style={style ?? { width: '1.25rem', height: '1.25rem' }}
            role="presentation"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </g>
        </svg>
    );
}

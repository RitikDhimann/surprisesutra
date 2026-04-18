

const MenuGiftIcon = ({ size = 22, className = "" }) => {
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ background: 'transparent' }}
    >
      {/* Red Ribbon (Matches your image exactly) */}
      <path
        d="M12.5 15.5C12.5 15.5 10 4 6 4C2 4 2.5 12 7 14.5C9.5 16 12.5 15.5 12.5 15.5Z"
        stroke="#B42533"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12.5 15.5C12.5 15.5 15 5 20 5C25 5 25.5 12 21 15.5C18.5 17.5 12.5 15.5 12.5 15.5Z"
        stroke="#B42533"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 15C7 15 10.5 14.5 12.5 15.5C15 17 24.5 14 32 11C37 9 39 11 39 11"
        stroke="#B42533"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Black Bars (Thick & perfectly rounded like the image) */}
      <rect x="6" y="19" width="32" height="5" rx="2.5" fill="black" />
      <rect x="6" y="29" width="32" height="5" rx="2.5" fill="black" />
      <rect x="6" y="39" width="32" height="5" rx="2.5" fill="black" />
    </svg>
  );
};

export default MenuGiftIcon;

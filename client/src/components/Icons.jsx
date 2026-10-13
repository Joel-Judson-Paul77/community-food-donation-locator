// Minimal line icons (24×24, stroke = currentColor)
function Icon({ children, size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const LogoMark = (props) => (
  <Icon size={22} strokeWidth="1.8" {...props}>
    <path d="M12 2.5C6.8 6.2 4.9 10.7 6.6 15c1.3 3 3.5 4.3 5.4 5.2 1.9-.9 4.1-2.2 5.4-5.2 1.7-4.3-.2-8.8-5.4-12.5z" />
    <path d="M12 6.5v13.5M12 12l-3-2.6M12 15l3.4-3" />
  </Icon>
);

export const UploadIcon = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
    <path d="M12 8v8M8 12h8" />
  </Icon>
);

export const PinIcon = (p) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const CheckIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.2 2.4 2.4 4.6-5" />
  </Icon>
);

export const SearchIcon = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Icon>
);

export const ArrowIcon = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

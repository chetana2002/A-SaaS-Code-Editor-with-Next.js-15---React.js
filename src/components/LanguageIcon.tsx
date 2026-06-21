import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";

const FALLBACK_ICON =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg";

type LanguageIconProps = {
  language: string;
  size?: number;
  className?: string;
};

function LanguageIcon({ language, size = 24, className = "" }: LanguageIconProps) {
  const src = LANGUAGE_CONFIG[language]?.logoPath ?? FALLBACK_ICON;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${language} logo`}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}

export default LanguageIcon;

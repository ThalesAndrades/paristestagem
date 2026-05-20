// Logo oficial Óticas Paris (SVG VTEX) — usado no header, footer e marca d'água
const LOGO_URL =
  'https://tfcqdl.vtexassets.com/assets/vtex.file-manager-graphql/images/c74bb4bc-19d8-4579-b6b2-2b4e98424878___a99d29287cf09311efc62d83c57853a2.svg';

export default function ParisLogo({ className = '', alt = 'Óticas Paris' }) {
  return (
    <img
      src={LOGO_URL}
      alt={alt}
      className={className}
      draggable={false}
      loading="eager"
    />
  );
}

export { LOGO_URL };

// const getColorShades = (hex) => {
//     const clean = hex.replace("#", "");

//     const r = parseInt(clean.substring(0, 2), 16);
//     const g = parseInt(clean.substring(2, 4), 16);
//     const b = parseInt(clean.substring(4, 6), 16);

//     const shade = (amount) => {
//         const adjust = (value) =>
//             Math.round(value + (255 - value) * amount);

//         return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
//     };

//     const darken = (value, amount) =>
//         Math.round(value * (1 - amount));

//     return {
//         accent: hex,
//         light: shade(0.35),
//         dark: `rgb(${darken(r, 0.35)}, ${darken(g, 0.35)}, ${darken(b, 0.35)})`
//     };
// };

// export const applyColorTheme = (color) => {
//     const shades = getColorShades(color);
//     const root = document.documentElement;

//     root.style.setProperty("--accent", shades.accent);
//     root.style.setProperty("--accent-light", shades.light);
//     root.style.setProperty("--accent-dark", shades.dark);

//     localStorage.setItem("snapcode-color", color);
// };

// export const initializeColorTheme = () => {
//     const savedColor =
//         localStorage.getItem("snapcode-color") || "#5691c8";

//     applyColorTheme(savedColor);
// };



export const applyColorTheme = (color) => {
    const root = document.documentElement;

    const hex = color.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const dark = (v) => Math.round(v * 0.45);

    const light = (v) =>
        Math.round(v + (255 - v) * 0.35);

    const accentDark = `rgb(${dark(r)}, ${dark(g)}, ${dark(b)})`;

    const accentLight = `rgb(${light(r)}, ${light(g)}, ${light(b)})`;

    root.style.setProperty("--accent", color);
    root.style.setProperty("--accent-dark", accentDark);
    root.style.setProperty("--accent-light", accentLight);

    root.style.setProperty(
        "--body-gradient",
        `linear-gradient(120deg, ${accentDark}, ${color}, ${accentLight})`
    );

    root.style.setProperty(
        "--root-gradient",
        `linear-gradient(120deg, ${color}, ${accentDark}, ${accentLight})`
    );

    root.style.setProperty(
        "--border-gradient",
        `linear-gradient(90deg, ${accentLight}, ${color}, ${accentDark}, ${accentLight})`
    );

    root.style.setProperty(
        "--accent-soft",
        `rgba(${r}, ${g}, ${b}, 0.18)`
    );

    localStorage.setItem("snapcode-color", color);
};

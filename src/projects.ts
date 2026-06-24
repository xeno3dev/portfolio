export interface Project {
  name: string;
  url: string;
  image?: string;
  iconBg?: string;
  modal?: "about";
}

export const projects: Project[] = [
  {
    name: "Keylo",
    url: "https://getkeylo.app",
    image: "/images/keylo.svg",
    iconBg: "#4a4a4a",
  },
  {
    name: "Tropix",
    url: "https://tropixrentalcar.com",
    image: "/images/tropix.png",
    iconBg: "#4a4a4a",
  },
  {
    name: "About",
    url: "",
    image: "/images/avatar.webp",
    iconBg: "#0d0d20",
    modal: "about",
  },
];

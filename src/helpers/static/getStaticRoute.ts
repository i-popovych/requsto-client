const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const getStaticAvatarRoute = (itemName: string) => {
  return `${BASE_URL}static/avatars/${itemName}`;
};

export const getStaticFileRoute = (itemName: string) => {
  return `${BASE_URL}static/${itemName}`;
};

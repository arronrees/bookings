export type Event = {
  id: number;
  attributes: {
    title: string;
    description: string;
    location: string;
    date: string;
    ticketAllocation: number;
    ticketsAvailable: number;
    cost: number;
    availability: 'Available' | 'Unavailable' | 'Sold Out';
    image: Image;
  };
};

type Image = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        large: ImageFormat;
        small: ImageFormat;
        medium: ImageFormat;
        thumbnail: ImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
    };
  };
};

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

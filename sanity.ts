import SanityClientConstructor from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanity = SanityClientConstructor({
  projectId: "3xqvbmtu",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(sanity);
export const urlFor = (source: any) => builder.image(source);

export default sanity;

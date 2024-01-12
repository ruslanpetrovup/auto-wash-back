import { CollectionConfig } from "payload/types";

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const CategoriesWash: CollectionConfig = {
  slug: "categories-wash",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
    },
  ],
};

export default CategoriesWash;

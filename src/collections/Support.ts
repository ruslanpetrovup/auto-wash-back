import { CollectionConfig } from "payload/types";

const Support: CollectionConfig = {
  slug: "support",
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "phones",
      type: "array",
      fields: [
        {
          name: "number",
          type: "text",
        },
      ],
    },
    {
      name: "social",
      type: "array",
      fields: [
        {
          name: "link",
          type: "text",
        },
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

export default Support;

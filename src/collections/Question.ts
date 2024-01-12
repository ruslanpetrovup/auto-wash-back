import { CollectionConfig } from "payload/types";

const Question: CollectionConfig = {
  slug: "question",
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
        localized: true,
    },
    {
      name: "description",
      type: "text",
        localized: true,
    },
    {
      name: "answer",
      type: "richText",
        localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};

export default Question;

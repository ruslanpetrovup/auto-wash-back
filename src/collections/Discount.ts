import { CollectionConfig } from "payload/types";

const Discount: CollectionConfig = {
  slug: "discount",
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
      name: "dateStart",
      type: "date",
    },
    {
      name: "dateEnd",
      type: "date",
    },
    {
      name: "description",
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

export default Discount;

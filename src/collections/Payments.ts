import { CollectionConfig } from "payload/types";

const Payments: CollectionConfig = {
  slug: "payments",
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "number",
      type: "text",
    },
    {
      name: "sum",
      type: "text",
    },
  ],
};

export default Payments;

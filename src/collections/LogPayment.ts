import { CollectionConfig } from "payload/types";

const LogPayment: CollectionConfig = {
  slug: "log-payment",
  auth: false,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "phone",
      type: "text",
    },
    {
      name: "amount",
      type: "text",
    },
    {
      name: "date",
      type: "date",
    },
  ],
};

export default LogPayment;

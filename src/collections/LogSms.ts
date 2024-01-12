import { CollectionConfig } from "payload/types";

const LogSms: CollectionConfig = {
  slug: "log-sms",
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
      name: "date",
      type: "date",
    },
  ],
};

export default LogSms;

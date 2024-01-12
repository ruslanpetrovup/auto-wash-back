import { CollectionConfig } from "payload/types";

const Wash: CollectionConfig = {
  slug: "wash",
  auth: false,
  access: {
    read: () => true,
  },

  fields: [
    {
      name: "id",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "categories",
      type: "array",
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "categories-wash",
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },

    {
      name: "city",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "address",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "schedule",
      label: "Графік роботи",
      type: "group",
      fields: [
        {
          name: "timeIn",
          type: "text",
          label: "Час відкриття",
          admin: {
            description: "Приклад: 12:00 , 09:05",
          },
          required: true,
        },
        {
          name: "timeOut",
          type: "text",
          label: "Час закриття",
          admin: {
            description: "Приклад: 12:00 , 09:05",
          },
          required: true,
        },
        {
          name: "weekend",
          type: "array",
          label: "Вихідні",
          admin: {
            description: "Приклад: ВТ СБ ПН",
          },
          fields: [{ name: "day", type: "text", label: "День" }],
        },
      ],
    },
    {
      name: "phoneWash",
      type: "text",
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "description",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "posts",
      type: "array",
      fields: [
        {
          name: "id",
          type: "text",
          required: true,
        },
        {
          name: "number",
          type: "text",
          required: true,
        },
        {
          name: "active",
          type: "select",
          options: [
            {
              label: "Active",
              value: "True",
            },
            {
              label: "Not Active",
              value: "False",
            },
          ],
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },
  ],
};

export default Wash;

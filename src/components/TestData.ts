export const data = [
  {
    general: [
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
    ],

    technology: [
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
    ],
    health: [
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
    ],
    others: [
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
      {
        id: 1234,
        title: "abcd",
        description: "abcd",
        url: "abcd",
      },
    ],
  },
];

const actualData = [
  {
    id: "fab07e69-84e7-49a1-870c-ce27e55d838a",
    title: "sd",
    category: "General",
    description: "sa",
    url: "as",
  },
  {
    id: "1e088391-e218-47f3-820c-f0c53fba8049",
    title: "sasa",
    category: "Technology",
    description: "aSSA",
    url: "AsS",
  },
];

const cData = actualData.filter((item)=>{
  return item.category === "General"
})









// const [cat, setCat] = useState([
//   {
//     General: [
//       {
//         title: "",
//         description: "",
//         url: "",
//       },
//     ],
//   },
//   {
//     Technology: [
//       {
//         title: "",
//         description: "",
//         url: "",
//       },
//     ],
//   },
//   {
//     Health: [
//       {
//         title: "",
//         description: "",
//         url: "",
//       },
//     ],
//   },
//   {
//     Others: [
//       {
//         title: "",
//         description: "",
//         url: "",
//       },
//     ],
//   },
// ]);


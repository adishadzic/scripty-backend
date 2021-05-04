let postSchema = {
  posts: [
    {
      postID: 10,
      title: "Nesto",
      description: "Nesto drugo",
      date: 2141452131421,
      file: "something.pdf",
      author: [
        {
          id: "1",
          name: "Pero",
          surname: "Petric",
          email: "peropetric@gmail.com",
          age: 20,
        },
      ],
    },
    {
      postID: 11,
      title: "Nesto1",
      description: "Nesto drugo",
      date: 2141452131421,
      file: "somethingelse.jpg",
      author: [
        {
          id: "2",
          name: "Marko",
          surname: "Markic",
          email: "markomarkic@gmail.com",
          age: 21,
        },
      ],
    },
    {
      postID: 12,
      title: "Nesto2",
      description: "Nesto drugo",
      date: 2141452131421,
      file: "somethingelsee.png",
      author: [
        {
          id: "3",
          name: "Ivan",
          surname: "Ivanic",
          email: "ivanivanic@gmail.com",
          age: 22,
        },
      ],
    },
  ],
};

export default postSchema;

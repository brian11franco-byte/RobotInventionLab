export type Story = {
  id: number;
  title: string;
  text: string;
  questions: { question: string; options: string[]; answer: string }[];
};

export const stories: Story[] = [
  {
    id: 1,
    title: "The Robot Helper",
    text: "A family has a robot helper. The robot cleans the house every morning. The children are happy.",
    questions: [
      {question:"What does the robot do?",options:["cleans the house","cooks dinner","plays games"],answer:"cleans the house"},
      {question:"When does the robot clean?",options:["every morning","every night","every week"],answer:"every morning"},
    ]
  },
  {
    id: 2,
    title: "The Robot Waiter",
    text: "A robot waiter works in a restaurant. It brings noodles and soup to customers. The customers are very happy.",
    questions: [
      {question:"Where does the robot work?",options:["restaurant","school","hospital"],answer:"restaurant"},
      {question:"What does the robot bring?",options:["noodles and soup","rice and fish","cake and juice"],answer:"noodles and soup"},
    ]
  },
  {
    id: 3,
    title: "Mia's Workshop",
    text: "Mia builds a robot in her workshop. The robot can carry books. Mia is very proud of her robot.",
    questions: [
      {question:"Who builds the robot?",options:["Mia","Tom","Anna"],answer:"Mia"},
      {question:"What can the robot carry?",options:["books","food","boxes"],answer:"books"},
    ]
  },
  {
    id: 4,
    title: "Tom's Delivery Robot",
    text: "Tom has a delivery robot. The robot brings packages to houses every day. The robot is very fast.",
    questions: [
      {question:"What does the robot deliver?",options:["packages","food","medicine"],answer:"packages"},
      {question:"How is the robot?",options:["fast","slow","big"],answer:"fast"},
    ]
  },
  {
    id: 5,
    title: "The Cooking Robot",
    text: "A cooking robot makes dinner. It cooks rice and vegetables. The family enjoys the meal.",
    questions: [
      {question:"What does the robot cook?",options:["rice and vegetables","soup and noodles","cake and bread"],answer:"rice and vegetables"},
      {question:"Who enjoys the meal?",options:["the family","the teacher","the doctor"],answer:"the family"},
    ]
  },
  {
    id: 6,
    title: "The Classroom Robot",
    text: "The robot helps in the classroom. It carries books for students. The teacher is pleased.",
    questions: [
      {question:"What does the robot carry?",options:["books","bags","tools"],answer:"books"},
      {question:"Who is pleased?",options:["the teacher","the student","the parent"],answer:"the teacher"},
    ]
  },
  {
    id: 7,
    title: "The Robot Farmer",
    text: "A robot farmer plants seeds in the field. It waters the plants every day. The farm looks beautiful.",
    questions: [
      {question:"What does the robot plant?",options:["seeds","trees","flowers"],answer:"seeds"},
      {question:"When does it water plants?",options:["every day","every week","every month"],answer:"every day"},
    ]
  },
  {
    id: 8,
    title: "The Hospital Robot",
    text: "A hospital robot brings medicine to patients. It moves quietly through the halls. The doctors trust the robot.",
    questions: [
      {question:"What does the robot bring?",options:["medicine","food","books"],answer:"medicine"},
      {question:"How does it move?",options:["quietly","loudly","slowly"],answer:"quietly"},
    ]
  },
  {
    id: 9,
    title: "The Robot Teacher",
    text: "A robot teacher helps children learn words. It speaks clearly and shows pictures. The children love learning.",
    questions: [
      {question:"What does the robot help with?",options:["learning words","cooking food","cleaning rooms"],answer:"learning words"},
      {question:"How does the robot speak?",options:["clearly","quietly","loudly"],answer:"clearly"},
    ]
  },
  {
    id: 10,
    title: "The Kitchen Robot",
    text: "A small robot cleans the kitchen. It washes dishes and mops the floor. The kitchen is spotless.",
    questions: [
      {question:"What does the robot clean?",options:["the kitchen","the bedroom","the garden"],answer:"the kitchen"},
      {question:"What does the robot wash?",options:["dishes","clothes","windows"],answer:"dishes"},
    ]
  },
];

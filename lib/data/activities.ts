export type Activity = {
  id: number;
  difficulty: number;
  type: string;
  prompt?: string;
  options?: string[];
  answer?: string;
  steps?: string[];
  robot?: string;
  student_expected?: string;
  line_options?: string[];
  question?: string;
};

export const activities: Activity[] = [
  {id:1,difficulty:1,type:"sentence",prompt:"A cleaning robot ____ the floor.",options:["clean","cleans","cleaning"],answer:"cleans"},
  {id:2,difficulty:1,type:"sentence",prompt:"A robot waiter ____ food.",options:["serve","serves","serving"],answer:"serves"},
  {id:3,difficulty:1,type:"sentence",prompt:"The robot ____ packages.",options:["carry","carries","carrying"],answer:"carries"},
  {id:4,difficulty:1,type:"sentence",prompt:"The robot ____ the room.",options:["clean","cleans","cleaning"],answer:"cleans"},
  {id:5,difficulty:1,type:"sentence",prompt:"The robot ____ drinks.",options:["bring","brings","bringing"],answer:"brings"},
  {id:6,difficulty:1,type:"vocab",prompt:"Which robot cleans the house?",options:["cleaning robot","delivery robot","factory robot"],answer:"cleaning robot"},
  {id:7,difficulty:1,type:"vocab",prompt:"Which robot serves food?",options:["robot waiter","flying robot","security robot"],answer:"robot waiter"},
  {id:8,difficulty:1,type:"sentence",prompt:"My robot ____ people.",options:["help","helps","helping"],answer:"helps"},
  {id:9,difficulty:1,type:"sentence",prompt:"The robot ____ quickly.",options:["move","moves","moving"],answer:"moves"},
  {id:10,difficulty:1,type:"vocab",prompt:"Which word describes size?",options:["big","run","cook"],answer:"big"},
  {id:11,difficulty:2,type:"noun",prompt:"Which is countable?",options:["apple","rice","water"],answer:"apple"},
  {id:12,difficulty:2,type:"noun",prompt:"Which is uncountable?",options:["milk","burger","robot"],answer:"milk"},
  {id:13,difficulty:2,type:"restaurant",prompt:"Choose the correct order.",options:["I would like noodles","Give noodles","Noodles want"],answer:"I would like noodles"},
  {id:14,difficulty:2,type:"restaurant",prompt:"Choose a polite order.",options:["Rice please","Give rice","Rice now"],answer:"Rice please"},
  {id:15,difficulty:2,type:"sentence",prompt:"My robot ____ food.",options:["carry","carries","carrying"],answer:"carries"},
  {id:16,difficulty:2,type:"sentence",prompt:"My robot ____ the house.",options:["clean","cleans","cleaning"],answer:"cleans"},
  {id:17,difficulty:2,type:"sentence",prompt:"My robot ____ fast.",options:["run","runs","running"],answer:"runs"},
  {id:18,difficulty:2,type:"sentence",prompt:"The robot ____ packages.",options:["deliver","delivers","delivering"],answer:"delivers"},
  {id:19,difficulty:2,type:"sentence",prompt:"The robot ____ drinks.",options:["bring","brings","bringing"],answer:"brings"},
  {id:20,difficulty:2,type:"comparison",prompt:"Which robot is bigger?",options:["factory robot","toy robot","mini robot"],answer:"factory robot"},
  {id:21,difficulty:3,type:"instruction",steps:["Turn on robot","Pick up food","Walk to table","Serve food"]},
  {id:22,difficulty:3,type:"instruction",steps:["Turn on robot","Scan room","Clean floor","Return home"]},
  {id:23,difficulty:3,type:"instruction",steps:["Receive package","Find address","Travel","Deliver package"]},
  {id:24,difficulty:3,type:"conversation",robot:"What would you like to eat?",student_expected:"I would like noodles."},
  {id:25,difficulty:3,type:"conversation",robot:"Is your robot big or small?",student_expected:"My robot is big."},
  {id:26,difficulty:3,type:"conversation",robot:"What can your robot do?",student_expected:"My robot can clean."},
  {id:27,difficulty:3,type:"conversation",robot:"Where does your robot work?",student_expected:"My robot works in a restaurant."},
  {id:28,difficulty:3,type:"conversation",robot:"Does your robot cook?",student_expected:"Yes it cooks."},
  {id:29,difficulty:3,type:"sentence",prompt:"My robot ____ books.",options:["carry","carries","carrying"],answer:"carries"},
  {id:30,difficulty:3,type:"sentence",prompt:"The robot ____ dinner.",options:["cook","cooks","cooking"],answer:"cooks"},
  {id:31,difficulty:4,type:"instruction_write",prompt:"Write steps for a robot waiter"},
  {id:32,difficulty:4,type:"instruction_write",prompt:"Write steps for a cleaning robot"},
  {id:33,difficulty:4,type:"instruction_write",prompt:"Write steps for a delivery robot"},
  {id:34,difficulty:4,type:"instruction_write",prompt:"Write steps for your robot"},
  {id:35,difficulty:4,type:"story",question:"Who cleans the house?",options:["robot","father","dog"],answer:"robot"},
  {id:36,difficulty:4,type:"story",question:"Who cooks dinner?",options:["robot","teacher","child"],answer:"robot"},
  {id:37,difficulty:4,type:"story",question:"Where does the robot work?",options:["restaurant","school","park"],answer:"restaurant"},
  {id:38,difficulty:4,type:"story",question:"What does the robot bring?",options:["packages","water","books"],answer:"packages"},
  {id:39,difficulty:4,type:"story",question:"Why use robots?",options:["help work","sleep","run"],answer:"help work"},
  {id:40,difficulty:4,type:"comparison",prompt:"Which robot is fastest?",options:["flying robot","cleaning robot","toy robot"],answer:"flying robot"},
  {id:41,difficulty:5,type:"creative",prompt:"Describe your robot in two sentences"},
  {id:42,difficulty:5,type:"creative",prompt:"Explain what your robot can do"},
  {id:43,difficulty:5,type:"creative",prompt:"Describe robot size and job"},
  {id:44,difficulty:5,type:"song",line_options:["My robot is strong","My robot is fast","My robot helps me"]},
  {id:45,difficulty:5,type:"song",line_options:["My robot works all day","My robot helps my family","My robot plays"]},
  {id:46,difficulty:5,type:"song",line_options:["Robots are fun","Robots help us","Robots are smart"]},
  {id:47,difficulty:5,type:"design",options:["camera","wheels","laser","spoon"]},
  {id:48,difficulty:5,type:"design",options:["clean","cook","deliver","teach"]},
  {id:49,difficulty:5,type:"design",options:["small","medium","large"]},
  {id:50,difficulty:5,type:"design",options:["slow","fast","very fast"]},
];

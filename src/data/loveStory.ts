export interface RealPhotoItem {
  id: string;
  image: string;
  caption: string;
  subtext?: string;
}

export interface AiPhotoItem {
  id: string;
  image: string;
  futureCaption: string;
  note?: string;
}

export interface LittleThing {
  id: string;
  title: string;
  emoji: string;
  message: string;
}

export interface StarMemory {
  id: string;
  title: string;
  dateOrTag: string;
  icon: string;
  type: 'photo' | 'quote' | 'chat';
  content: string;
  image?: string;
}

export interface OpenWhenLetter {
  id: string;
  title: string;
  preview: string;
  message: string;
  stamp: string;
}

export interface LoveStoryData {
  herName: string;
  nickname: string;
  specialName: string;
  myName: string;

  birthday: string;
  firstSawHer: string;
  firstMessageDate: string;
  firstMessageText: string;
  crushDate: string;
  loveConfessionDate: string;
  relationshipStartDate: string;
  hasMetInRealLife: boolean;

  // Audio configuration
  audio: {
    title: string;
    artist: string;
    url: string; // If left empty or missing, procedural ambient music synthesizer automatically plays!
  };

  // Specific Photos
  photos: {
    firstStoryPhoto: string;   // Friend's IG story photo where Roshan first saw Gomathi
    scratchPhoto: string;      // Photo/screenshot for the scratch-to-reveal moment
    funnyMathiPhoto: string;   // Inside joke funny photo for "Don't Tap This"
    finalBirthdayPhoto: string; // Best real photo for the final birthday reveal
  };

  // Swipeable photos of Gomathi through Roshan's eyes
  candidMathiPhotos: RealPhotoItem[];

  // AI couple concept photos (honestly presented as "Photos we haven't taken yet")
  aiCouplePhotos: AiPhotoItem[];

  // Floating little things
  littleThings: LittleThing[];

  // Stars in "Our Universe"
  universeStars: StarMemory[];

  // Open When Letters
  openWhenLetters: OpenWhenLetter[];

  // Future empty frames
  futureFrames: {
    title: string;
    sub: string;
    isKuttyMathi?: boolean;
  }[];

  // Love letter paragraphs
  loveLetter: string[];

  // Secret ending messages
  secretEnding: {
    found: string;
    reveal: string;
    closing: string;
    ps: string;
  };
}

export const loveStory: LoveStoryData = {
  herName: "Gomathi",
  nickname: "Mathi Chellam",
  specialName: "Mine Mathi",
  myName: "Roshan",

  birthday: "October 14",
  firstSawHer: "October 14, 2025",
  firstMessageDate: "October 17, 2025",
  firstMessageText: "hi\noru chinna doubt atha maatum soldreengala.\nluna na enna?",
  crushDate: "November 2, 2025",
  loveConfessionDate: "June 10, 2026",
  relationshipStartDate: "June 14, 2026",
  hasMetInRealLife: false,

  audio: {
    title: "Un Vizhigalil",
    artist: "Anirudh Ravichander & Shruti Haasan",
    url: "/assets/audio/our_song.mp3"
  },

  photos: {
    firstStoryPhoto: "/assets/mathi/first_story_photo.png",
    scratchPhoto: "/assets/mathi/scratch_photo.png",
    funnyMathiPhoto: "/assets/mathi/funny_mathi.png",
    finalBirthdayPhoto: "/assets/mathi/mathi_final_photo.jpg",
  },

  candidMathiPhotos: [
    {
      id: "p1",
      image: "/assets/mathi/mathi_smile.png",
      caption: "Indha smile. ❤️",
      subtext: "Un sirippu azhaga irukku nu mattum solla maaten…\nenna ariyama en manasu konjam neram ninnu paakura azhagu adhu. ❤️"
    },
    {
      id: "p2",
      image: "/assets/mathi/mathi_face.png",
      caption: "Indha face 😂",
      subtext: "Kovathula kooda ivlo azhaga irundha epdi chellam…\nunna samadhanam panna vandhutu, unna rasichitu iruppen pola. ❤️😂"
    },
    {
      id: "p3",
      image: "/assets/mathi/mathi_cute.png",
      caption: "Kovama irundhalum… seri… konjam cute thaan.",
      subtext: "Kovatha kooda ivlo azhaga kattura ore aalu nee thaan."
    },
    {
      id: "p5",
      image: "/assets/mathi/mathi_final_photo.jpg",
      caption: "Aana… ellame… en Mathi thaan. ❤️",
      subtext: "Mine Mathi, always."
    }
  ],

  aiCouplePhotos: [
    {
      id: "ai1",
      image: "/assets/ai-us/ai_us_01.png",
      futureCaption: "Ippadi un pakkathula nikkura oru moment… ❤️",
      note: "Ippo photo-la mattum thaan. Aana oru naal idha real-ah vaazhanum chellam… un pakkathula, un kooda. ❤️"
    }
  ],

  littleThings: [
    {
      id: "lt1",
      title: "Un Smile",
      emoji: "✨",
      message: "Idhukku explanation venuma?\nAdhaan already sonnenae…\n\nUn sirippu azhaga irukku nu mattum solla maaten…\nenna ariyama en manasu konjam neram ninnu paakura azhagu adhu. ❤️"
    },
    {
      id: "lt2",
      title: "Un Kovam",
      emoji: "😤",
      message: "Kovathula kooda ivlo azhaga irundha epdi chellam…\n\nSonne la, adikadi kovam laam aagatha chellam…\nun Roshan paavam. 🥺😂\n\nAana enna panrathu…\nun kovatha kooda eppavume rasipen. ❤️"
    },
    {
      id: "lt3",
      title: "Un Voice",
      emoji: "🎧",
      message: "Call pesumbodhu…\n\n“Roshan…”\n“Chellam…”\n\nnu nee koopdura andha tone… enakku romba pudikkum.\n\nEspecially nee solra oru word irukke…\n\n“Saththimalae…” 😂❤️\n\nAdhu enakku mostest favourite."
    },
    {
      id: "lt4",
      title: "Un Sirippu",
      emoji: "🥹",
      message: "Nee loud-ah sirikkanum…\neppavume ippadiye sirichite irukkanum.\n\nPhone-la ketkuradhu mattum illa…\n\nandha sirippa oru naal nerla pakkathula irundhu paakanum nu romba aasaya irukku. ❤️"
    },
    {
      id: "lt5",
      title: "Un Caring",
      emoji: "🫶",
      message: "“Saaptiya?”\n“Udamba paathuko…”\n“Tea neraya kudikatha…”\n“Seekiram thoongi palagu…”\n\nCare panriya illa thitriya nu sila neram enakke doubt varum. 😂\n\nAana andha thittukulla irukkura care…\n\nennala eppavume marakka mudiyadhu chellam. ❤️"
    },
    {
      id: "lt6",
      title: "Un Drama 😂",
      emoji: "🎭",
      message: "Chinna vishayathukku kooda Oscar level scene poduviye…\n\nNaan normal-ah,\n\n“Photo anupu chellam…”\n\nnu ketta podhum:\n\n“Naan nallave illa…”\n“Oil apply panniruken…”\n“Ippo thaan thoongi elundhen…”\n\nnu oru full list varum. 😭😂\n\nAana ivlo drama pannitu…\nkadaisila enakkaga photo anupuva paaru…\n\nEnakku adhuvum romba pudikkum. ❤️"
    },
    {
      id: "lt7",
      title: "Un Pechu",
      emoji: "🗣️",
      message: "Pesuna pesite irupa… but… nee pesama irundha… adhu thaan romba kashtam Mathi."
    }
  ],

  universeStars: [
    {
      id: "s1",
      title: "14.10.2025",
      dateOrTag: "Day 1",
      icon: "👀",
      type: "quote",
      content: "First time I saw you.\nOru friend-oda birthday story-la… and there you were."
    },
    {
      id: "s2",
      title: "17.10.2025",
      dateOrTag: "First Message",
      icon: "💬",
      type: "chat",
      content: "“hi\noru chinna doubt atha maatum soldreengala.\nluna na enna?”\n\nEnakum unakum theriyum ithu convo start panna thaan nu 😂 but ippa nenachalum nalla irukku ❤️"
    },
    {
      id: "s3",
      title: "02.11.2025",
      dateOrTag: "Crush Confession",
      icon: "🙈",
      type: "quote",
      content: "“Crush irukku nu unkitaye solliten… 😌”\nAana biggest shock: Unakkum en mela crush irukku nu nee sonnadhu thaan. ❤️\n“Risk over regret” nu mudivu panniyachu! 😂"
    },
    {
      id: "s4",
      title: "10.06.2026",
      dateOrTag: "Love Confession",
      icon: "❤️",
      type: "quote",
      content: "“Roshan → Mathi: Love nu solliten.”\nResponse-ku wait panna Roshan: 🙂 🙂 Inside: 💀"
    },
    {
      id: "s5",
      title: "14.06.2026",
      dateOrTag: "Official Date",
      icon: "💍",
      type: "quote",
      content: "“Nee enkitte love sonna.”\nIndha 14… vera level special. En Mathi aayita. ❤️"
    },
    {
      id: "s6",
      title: "Something I never told you",
      dateOrTag: "Secret",
      icon: "💌",
      type: "quote",
      content: "Evlo sanda vandhaalum… ‘po’ nu sonnaalum… unna vittutu pora thought oru second kooda en mind-la vandhadhe illa."
    }
  ],

  openWhenLetters: [
    {
      id: "owl-1",
      title: "OPEN WHEN YOU MISS ME",
      preview: "First enakku call pannu… 😂❤️",
      stamp: "💌",
      message: "First enakku call pannu… 😂❤️\n\nNaan edukala na… konjam neram indha message-a en voice-la padikara maari nenachiko.\n\n**“Mathi chellam… naan inga thaan iruken.”**\n\nEnna romba miss panna… kanna mooditu, namma pesuna neram, siricha moments, naan unna “chellam” nu koopduradhu… idhellam konjam nyabagam panniko. ❤️\n\nUn pakkathula vandhu ukkandhu, unna tight-ah hug panni…\n**“Naan enga poida poren? Un Roshan unakku thaan.”**\nnu sollanum pola irukkum.\n\nIppo adha panna mudiyama irukkalam…\n\nAana nee enna miss panra ovvoru time-um, **adha vida konjam adhigama naan unna miss pannitu iruppen chellam. ❤️**\n\nSeekiram indha “miss you” ellam…\n**“vaa pakkathula ukkaru”** nu maaranum. 🥹❤️"
    },
    {
      id: "owl-2",
      title: "OPEN WHEN YOU'RE ANGRY WITH ME",
      preview: "Yaar correct, yaar wrong apram paathukalam…",
      stamp: "😤",
      message: "First… thittiko. Full-ah mudichiko 😂\n\nApram konjam calm aagu.\n\nYaar correct… yaar wrong… apram paathukalam. Enna vittutu mattum poidatha Mathi. Namma rendu perum serndhu sanda poduvom, aana serndhu dhaan irupom. ❤️"
    },
    {
      id: "owl-3",
      title: "OPEN WHEN YOU'RE SAD",
      preview: "Enna aanalum seri… Enkitta sollu.",
      stamp: "🌧️",
      message: "Mathi Chellam,\n\nEnna aanalum seri, enna nadanthalum seri. Enkitta sollu.\n\nSolution enakku theriyuma nu therila… aana un kooda irundhu kekka naan eppovume irupen. unakaga naa nippen. En Mathi strong ponnu. ❤️"
    }
  ],

  futureFrames: [
    { title: "OUR FIRST REAL PHOTO ❤️", sub: "Coming soon… AI generate panna koodadhu" },
    { title: "FIRST MEET", sub: "The biggest moment waiting for us" },
    { title: "FIRST OUTING", sub: "Walking side by side" },
    { title: "NEXT BIRTHDAY", sub: "Celebrating together in person" },
    { title: "OUR FIRST TRIP", sub: "Window seat & our songs" },
    { title: "Kutty Mathi #1 👀", sub: "Junior Mathi", isKuttyMathi: true },
    { title: "Kutty Mathi #2 👀", sub: "Junior Mathi #2", isKuttyMathi: true },
    { title: "Kutty Mathi #3 👀", sub: "Junior Mathi #3", isKuttyMathi: true },
  ],

  loveLetter: [
    "Mathi Chellam,",

    "October 14, 2025-la oru Instagram story-la unna first time paathapo… namma story ippadi pogum nu sathiyama naan nenakala.",

    "October 17-la… ‘hi, oru chinna doubt… luna na enna?’ nu convo start panna message pannina Roshan-kum theriyathu 😂",

    "November 2-la crush irukku nu sonnapovum… ‘unakkum en mela crush irukku’ nu nee sonnapovum… idhu ivlo dhooram pogum nu theriyathu.",

    "Aana… pesinom. Sanda pottom. Thirumba pesinom. Thirumba sanda pottom.",

    "Sometimes romba happy-ah irundhom. Sometimes romba kovama irundhom.",

    "Aana… oru vishayam mattum nadakala.",

    "Namma… oruthara oruthar vittutu pogala.",

    "June 10-la… naan unkitte love sonnen.",

    "June 14-la… nee enkitte love sonna. And honestly… andha 14… enakku romba special.",

    "Till now… neraya sanda. Neraya love. Neraya pechu. Neraya memories. Still… finally… we're together. ❤️",

    "Funny enna theriyuma? Namma ivlo pesirukom… ivlo sanda potrukom… ivlo love pannirukom… Aana… innum meet pannave illa. 😂",

    "So… enakku next big memory enna venum theriyuma?",

    "Unna first time… real-ah paakanum. Un pakkathula nikkanum. And finally… namma rendu perum serndhu oru photo edukanum. ❤️",

    "Phone screen-la mattum illa… real life-la… en Mathi venum.",

    "Happy Birthday… Mine Mathi. ❤️",

    "— Un Roshan"
  ],

  secretEnding: {
    found: "Mathiiii 😭 Innum pogalaya?",
    reveal: "Seri… last-ah onnu: I LOVE YOU. Seekiram meet pannalam. Namma first REAL photo eduthukalam. ❤️",
    closing: "Okay. Now really the end.",
    ps: "P.S. 3 kutty Mathi matter… marakkala 👀😂"
  }
};

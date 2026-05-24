export const AYAHS = [
  {
    id: 1,
    arabic: "أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ",
    transliteration: "Alam ya'lam bi-anna Allaha yara",
    translation: "Does he not know that Allah sees?",
    ref: "Al-Alaq 96:14",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6287.mp3",
    theme: "watchful"
  },
  {
    id: 2,
    arabic: "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ",
    transliteration: "Qul lil-mu'mineena yaghuddoo min absaarihim wa yahfazoo furoojahum",
    translation: "Tell the believing men to lower their gaze and guard their chastity — that is purer for them.",
    ref: "An-Nur 24:30",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2988.mp3",
    theme: "guard"
  },
  {
    id: 3,
    arabic: "إِنَّ اللَّهَ يَعْلَمُ مَا تُسِرُّونَ وَمَا تُعْلِنُونَ",
    transliteration: "Inna Allaha ya'lamu ma tusirroona wa ma tu'linoon",
    translation: "Indeed, Allah knows what you conceal and what you declare.",
    ref: "An-Nahl 16:19",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2001.mp3",
    theme: "watchful"
  },
  {
    id: 4,
    arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
    transliteration: "Qul ya 'ibadi-alladhina asrafoo 'ala anfusihim la taqnatoo min rahmatil-lah",
    translation: "Say: O My servants who have wronged yourselves, do not despair of Allah's mercy — indeed Allah forgives all sins.",
    ref: "Az-Zumar 39:53",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4293.mp3",
    theme: "mercy"
  },
  {
    id: 5,
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    transliteration: "Wa man yattaqil-laha yaj'al lahu makhraja",
    translation: "Whoever fears Allah — He will make a way out for him.",
    ref: "At-Talaq 65:2",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5562.mp3",
    theme: "strength"
  },
  {
    id: 6,
    arabic: "يَعْلَمُ خَائِنَةَ الْأَعْيُنِ وَمَا تُخْفِي الصُّدُورُ",
    transliteration: "Ya'lamu khaa'inatal a'yuni wa ma tukhfis-sudoor",
    translation: "He knows the treachery of the eyes, and what the hearts conceal.",
    ref: "Ghafir 40:19",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4339.mp3",
    theme: "watchful"
  },
  {
    id: 7,
    arabic: "وَلَا تَقْرَبُوا الزِّنَىٰ ۖ إِنَّهُ كَانَ فَاحِشَةً وَسَاءَ سَبِيلًا",
    transliteration: "Wa la taqrabu az-zina innahu kana fahishatan wa saa'a sabeela",
    translation: "Do not approach unlawful intimacy. Indeed, it is an outrage and an evil path.",
    ref: "Al-Isra 17:32",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2138.mp3",
    theme: "guard"
  },
  {
    id: 8,
    arabic: "إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ",
    transliteration: "Innal-ladhina yakhshawna rabbahum bil-ghaybi lahum maghfiratun wa ajrun kabeer",
    translation: "Those who fear their Lord in secret — for them is forgiveness and a great reward.",
    ref: "Al-Mulk 67:12",
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5629.mp3",
    theme: "strength"
  }
];

export const SECRET_DEEDS = [
  { icon: "📖", text: "Recite Surah Al-Ikhlas 3 times slowly, thinking of His oneness.", reward: "Equals reciting 1/3 of the Quran" },
  { icon: "🤲", text: "Make du'a for a Muslim brother or sister you don't know, by name or without.", reward: "Angels say Ameen and the same for you" },
  { icon: "💧", text: "Make wudu right now. Stand at the sink and feel each drop as a purification.", reward: "Sins fall with every drop" },
  { icon: "🌙", text: "Recite Ayat Al-Kursi once with full presence. No rush.", reward: "Protected until next prayer" },
  { icon: "📿", text: "Say SubhanAllah 33 times, Alhamdulillah 33 times, Allahu Akbar 34 times.", reward: "Equivalent to a mountain of good deeds" },
  { icon: "✍️", text: "Write down one quality you love about Allah right now. Just one.", reward: "Deepens your connection" },
  { icon: "🫀", text: "Place your right hand on your chest and say: 'O Allah, You know what I'm facing. Help me.'", reward: "Du'a from the heart is never rejected" },
  { icon: "🌿", text: "Recite: 'La hawla wa la quwwata illa billah' 10 times. You cannot do this alone.", reward: "A treasure from Jannah" },
];

export function getRandomAyah(excluding = null) {
  const pool = excluding ? AYAHS.filter(a => a.id !== excluding) : AYAHS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomDeed() {
  return SECRET_DEEDS[Math.floor(Math.random() * SECRET_DEEDS.length)];
}
